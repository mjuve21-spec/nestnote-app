'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export default function Settings() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    clinic_name: '', contact_email: '', phone: '',
    checkin_frequency: 'Daily', send_time: '9:00 AM', twilio_phone: '',
    mood_threshold: 2, pain_threshold: 7, bleeding_threshold: 'Heavy'
  });
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) return;
      // maybeSingle avoids an error when this user has no settings row yet.
      const { data } = await supabase.from('settings').select('*').eq('user_id', user.id).maybeSingle();
      if (data) { setSettings(data); setId(data.id); }
    }
    fetchSettings();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setError(null);
    if (!user) { setError('You must be logged in to save settings.'); return; }

    if (id) {
      const { error } = await supabase.from('settings').update(settings).eq('id', id);
      if (error) { setError(error.message); return; }
    } else {
      const { data, error } = await supabase
        .from('settings')
        .insert([{ ...settings, user_id: user.id }])
        .select()
        .single();
      if (error) { setError(error.message); return; }
      if (data) setId(data.id);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function signOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push('/login');
  }

  const input = {width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',boxSizing:'border-box'};
  const label = {display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'};
  const card = {background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'};
  const h2 = {fontWeight:'600',color:'#1a1a1a',margin:'0 0 1rem',fontSize:'0.95rem'};

  return (
    <div style={{minHeight:'100vh',background:'#faf6ef'}}>
      <nav style={{background:'#7a9582',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='settings' ? 'white' : '#dce5d8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='settings' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'640px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{marginBottom:'1.5rem'}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Settings</h1>
          <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>Manage your clinic and account preferences</p>
        </div>

        {error && <div style={{marginBottom:'1rem',padding:'0.75rem 1rem',background:'#fee2e2',color:'#dc2626',borderRadius:'0.5rem',fontSize:'0.875rem'}}>{error}</div>}

        <form onSubmit={handleSave} style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
          <div style={card}>
            <h2 style={h2}>Clinic Information</h2>
            {[['Clinic Name','clinic_name','text'],['Contact Email','contact_email','email'],['Phone','phone','tel']].map(([lbl,key,type]) => (
              <div key={key} style={{marginBottom:'1rem'}}>
                <label style={label}>{lbl}</label>
                <input type={type} value={settings[key] || ''} onChange={e=>setSettings({...settings,[key]:e.target.value})} style={input}/>
              </div>
            ))}
          </div>

          <div style={card}>
            <h2 style={{...h2, margin:'0 0 0.25rem'}}>SMS Check-in Settings</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 1rem'}}>Configure automated SMS check-ins for families</p>
            <div style={{padding:'0.625rem 0.875rem',background:'#fef9c3',border:'1px solid #fde047',borderRadius:'0.5rem',fontSize:'0.8rem',color:'#854d0e',marginBottom:'1rem'}}>
              SMS sending isn't connected yet — these settings are saved but not yet in use.
            </div>
            {[['Check-in Frequency','checkin_frequency','text'],['Send Time','send_time','text'],['Twilio Phone Number','twilio_phone','text']].map(([lbl,key,type]) => (
              <div key={key} style={{marginBottom:'1rem'}}>
                <label style={label}>{lbl}</label>
                <input type={type} value={settings[key] || ''} onChange={e=>setSettings({...settings,[key]:e.target.value})} style={input}/>
              </div>
            ))}
          </div>

          <div style={card}>
            <h2 style={{...h2, margin:'0 0 0.25rem'}}>Escalation Thresholds</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 1rem'}}>Auto-flag check-ins that exceed these thresholds</p>
            <div style={{padding:'0.625rem 0.875rem',background:'#fef9c3',border:'1px solid #fde047',borderRadius:'0.5rem',fontSize:'0.8rem',color:'#854d0e',marginBottom:'1rem'}}>
              Flagging currently uses fixed values: mood 2 or below, pain 7 or above, or heavy bleeding. Custom thresholds are saved but not yet applied.
            </div>
            <div style={{marginBottom:'1rem'}}>
              <label style={label}>Mood Score (flag if at or below)</label>
              <input type="number" value={settings.mood_threshold ?? 2} onChange={e=>setSettings({...settings,mood_threshold:parseInt(e.target.value)})} style={input}/>
            </div>
            <div style={{marginBottom:'1rem'}}>
              <label style={label}>Pain Level (flag if at or above)</label>
              <input type="number" value={settings.pain_threshold ?? 7} onChange={e=>setSettings({...settings,pain_threshold:parseInt(e.target.value)})} style={input}/>
            </div>
            <div>
              <label style={label}>Bleeding (flag if)</label>
              <select value={settings.bleeding_threshold || 'Heavy'} onChange={e=>setSettings({...settings,bleeding_threshold:e.target.value})} style={input}>
                <option>Light</option>
                <option>Moderate</option>
                <option>Heavy</option>
              </select>
            </div>
          </div>

          <button type="submit" style={{padding:'0.75rem',background:'#7a9582',color:'white',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'600',cursor:'pointer'}}>
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </form>

        <div style={{...card, marginTop:'1.25rem'}}>
          <h2 style={h2}>Account</h2>
          <p style={{fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 0.25rem'}}>Signed in as</p>
          <p style={{fontSize:'0.875rem',color:'#1a1a1a',margin:'0 0 1.25rem'}}>{user?.email || '—'}</p>
          <button type="button" onClick={signOut} disabled={signingOut} style={{background:'#fee2e2',color:'#dc2626',padding:'0.625rem 1.25rem',borderRadius:'0.5rem',border:'1px solid #fca5a5',fontSize:'0.875rem',fontWeight:'600',cursor:'pointer'}}>
            {signingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </main>
    </div>
  );
}