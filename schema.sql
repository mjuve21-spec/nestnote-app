-- NestNote database schema
-- Rebuild reference. Run in order against a fresh Supabase project.
-- Last updated: 2026-08-08

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  primary_name TEXT NOT NULL,
  partner_name TEXT,
  email TEXT,
  phone TEXT,
  birth_date DATE,
  birth_type TEXT,
  baby_name TEXT,
  site TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  mood INTEGER,
  pain INTEGER,
  bleeding TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_name TEXT NOT NULL,
  category TEXT NOT NULL,
  week INTEGER NOT NULL,
  assigned_to TEXT NOT NULL,
  birth_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  clinic_name TEXT,
  contact_email TEXT,
  phone TEXT,
  checkin_frequency TEXT DEFAULT 'Daily',
  send_time TEXT DEFAULT '9:00 AM',
  twilio_phone TEXT,
  mood_threshold INTEGER DEFAULT 2,
  pain_threshold INTEGER DEFAULT 7,
  bleeding_threshold TEXT DEFAULT 'Heavy',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- SEED DATA — 12-week postpartum task library
-- ============================================================

INSERT INTO templates (task_name, category, week, assigned_to, birth_type) VALUES
('Mood Check', 'Self Care', 1, 'Family', 'All'),
('Schedule Lactation Consultation', 'Lactation', 1, 'Care Team', 'All'),
('Wound Check Photo', 'Wound Care', 1, 'Family', 'Cesarean'),
('Newborn Weight Check', 'Newborn Milestone', 2, 'Care Team', 'All'),
('Submit Birth Certificate Paperwork', 'Paperwork', 2, 'Family', 'All'),
('3-Week Postpartum Visit', 'Appointment', 3, 'Care Team', 'All'),
('Edinburgh Depression Screening', 'Medical', 4, 'Care Team', 'All'),
('Review Contraception Options', 'Medical', 6, 'Care Team', 'All'),
('12-Week Final Visit', 'Appointment', 12, 'Care Team', 'All');

-- ============================================================
-- ROW LEVEL SECURITY
-- Each user sees only their own families and related records.
-- Templates are a shared library readable by all authenticated users.
-- ============================================================

ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own families" ON families
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own checkins" ON checkins
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM families f WHERE f.id = checkins.family_id AND f.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM families f WHERE f.id = checkins.family_id AND f.user_id = auth.uid()));

-- Public check-in links: anyone with the URL can submit, nobody can read.
CREATE POLICY "public checkin submit" ON checkins
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "read templates" ON templates
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "write templates" ON templates
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "own tasks" ON tasks
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM families f WHERE f.id = tasks.family_id AND f.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM families f WHERE f.id = tasks.family_id AND f.user_id = auth.uid()));

CREATE POLICY "own settings" ON settings
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- AFTER RUNNING THIS
-- 1. Supabase → Authentication → URL Configuration:
--    set Site URL to the deployed app URL, not localhost.
-- 2. Supabase → Authentication → Sign In / Providers → Email:
--    "Confirm email" is currently OFF for testing.
-- 3. Copy the publishable API key into Vercel as
--    NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.
-- ============================================================