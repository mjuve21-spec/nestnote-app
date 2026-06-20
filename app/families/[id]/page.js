'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from "@/lib/supabase";

const supabase = createClient()

export default function FamilyDetail() {
  const { id } = useParams();
  const [family, setFamily] = useState(null);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [form, setForm] = useState({ mood: '3', pain: '0', bleeding: 'none', notes: '' });

  useEffect(() => { fetchFamily(); fetchCheckins(); }, [id]);

  async function fetchFamily() {
    const { data } = await supabase.from('families').select('*').eq('id', id).single();
    setFamily(data);
    setLoading(false);
  }

  async function fetchCheckins() {
    const { data } = await supabase.from('checkins').select('*').eq('family_id', id).order('created_at', { ascending: false });
    setCheckins(data || []);
  }

  async function submitCheckin(e) {
    e.preventDefault();
    setSubmitting(true);
    await fetch('/api/checkins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, family_id: id, mood: parseInt(form.mood), pain: parseInt(form.pain) }),
    });
    setForm({ mood: '3', pain: '0', bleeding: 'none', notes: '' });
    setShowForm(false);
    setSubmitting(false);
    fetchFamily();
    fetchCheckins();
  }

  async function clearFlag() {
    await supabase.from('families').update({ status: 'active' }).eq('id', id);
    fetchFamily();
  }

  async function archiveFamily() {
    if (!confirm('Archive this family? They will be hidden from the main list but can be found by searching.')) return;
    setArchiving(true);
    await supabase.from('families').update({ archived: true }).eq('id', id);
    window.location.href = '/families';
  }

  async function unarchiveFamily() {
    await supabase.from('families').update({ archived: false }).eq('id', id);
    fetchFamily();
  }

  function copyCheckinLink() {
    navigator.clipboard.writeText(`${window.location.origin}/checkin/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#f5f4f2',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'#6b7280'}}>Loading...</p></div>;
  if (!family) return <div style={{minHeight:'100vh',background:'#f5f4f2',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'#6b7280'}}>Family not found.</p></div>;

  const moodLabel = ['','Very Low','Low','Okay','Good','Great'];
  const bleedingColors = { none: '#dcfce7', light: '#fef9c3', moderate: '#fed7aa', heavy: '#fee2e2' };
  const bleedingText = { none: '#16a34a', light: '#ca8a04', moderate: '#ea580c', heavy: '#dc2626' };

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={`/${p}`} style={{color: p==='families' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='families' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1.5rem'}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
          <a href="/families" style={{color:'#2c4a3e',textDecoration:'none',fontSize:'0.875rem',fontWeight:'500'}}>← Back to Families</a>
          <div style={{display:'flex',gap:'0.5rem'}}>
            <button onClick={copyCheckinLink} style={{background: copied ? '#dcfce7' : '#f3f4f6',color: copied ? '#16a34a' : '#374151',padding:'0.375rem 1rem',borderRadius:'0.5rem',fontSize:'0.8rem',fontWeight:'500',border:'1px solid #e5e7eb',cursor:'pointer'}}>
              {copied ? 'Copied!' : 'Copy Check-in Link'}
            </button>
            <a href={`/families/${id}/edit`} style={{background:'#f3f4f6',color:'#374151',padding:'0.375rem 1rem',borderRadius:'0.5rem',fontSize:'0.8rem',fontWeight:'500',textDecoration:'none',border:'1px solid #e5e7eb'}}>Edit</a>
            {family.archived ? (
              <button onClick={unarchiveFamily} style={{background:'#f3f4f6',color:'#374151',padding:'0.375rem 1rem',borderRadius:'0.5rem',fontSize:'0.8rem',fontWeight:'500',border:'1px solid #e5e7eb',cursor:'pointer'}}>Unarchive</button>
            ) : (
              <button onClick={archiveFamily} disabled={archiving} style={{background:'#fee2e2',color:'#dc2626',padding:'0.375rem 1rem',borderRadius:'0.5rem',fontSize:'0.8rem',fontWeight:'500',border:'1px solid #fca5a5',cursor:'pointer'}}>
                {archiving ? 'Archiving...' : 'Archive'}
              </button>
            )}
          </div>
        </div>

        {family.archived && (
          <div style={{marginBottom:'1rem',padding:'0.75rem 1rem',background:'#fef9c3',border:'1px solid #fde047',borderRadius:'0.5rem',fontSize:'0.875rem',color:'#854d0e'}}>
            This family is archived and hidden from the main list.
          </div>
        )}

        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem',marginBottom:'1rem'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>{family.primary_name}</h1>
              {family.partner_name && <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>{family.partner_name}</p>}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
              <span style={{fontSize:'0.75rem',padding:'0.375rem 0.875rem',borderRadius:'9999px',fontWeight:'600',background: family.status==='flagged' ? '#fee2e2' : '#dcfce7', color: family.status==='flagged' ? '#dc2626' : '#16a34a'}}>
                {family.status || 'active'}
              </span>
              {family.status === 'flagged' && (
                <button onClick={clearFlag} style={{fontSize:'0.75rem',padding:'0.375rem 0.875rem',borderRadius:'9999px',fontWeight:'600',background:'#f3f4f6',color:'#374151',border:'1px solid #e5e7eb',cursor:'pointer'}}>
                  Clear Flag
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem',marginBottom:'1rem'}}>
          <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:'0 0 1rem',fontSize:'0.95rem'}}>Family Details</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[
              ['Email', family.email],
              ['Phone', family.phone],
              ['Birth Date', family.birth_date],
              ['Birth Type', family.birth_type],
              ['Baby Name', family.baby_name],
              ['Site', family.site],
            ].map(([label, value]) => value ? (
              <div key={label}>
                <p style={{fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 0.25rem'}}>{label}</p>
                <p style={{fontSize:'0.875rem',color:'#1a1a1a',margin:0,textTransform:'capitalize'}}>{value}</p>
              </div>
            ) : null)}
          </div>
        </div>

        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:0,fontSize:'0.95rem'}}>Check-ins ({checkins.length})</h2>
            <button onClick={() => setShowForm(!showForm)} style={{background:'#2c4a3e',color:'white',padding:'0.375rem 1rem',borderRadius:'0.5rem',border:'none',fontSize:'0.8rem',fontWeight:'500',cursor:'pointer'}}>
              {showForm ? 'Cancel' : '+ New Check-in'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={submitCheckin} style={{background:'#f9fafb',borderRadius:'0.5rem',padding:'1rem',marginBottom:'1rem',display:'flex',flexDirection:'column',gap:'0.875rem'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.875rem'}}>
                <div>
                  <label style={{display:'block',fontSize:'0.8rem',fontWeight:'500',color:'#374151',marginBottom:'0.25rem'}}>Mood (1-5)</label>
                  <select value={form.mood} onChange={e=>setForm({...form,mood:e.target.value})} style={{width:'100%',padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none'}}>
                    <option value="1">1 - Very Low</option>
                    <option value="2">2 - Low</option>
                    <option value="3">3 - Okay</option>
                    <option value="4">4 - Good</option>
                    <option value="5">5 - Great</option>
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'0.8rem',fontWeight:'500',color:'#374151',marginBottom:'0.25rem'}}>Pain (0-10)</label>
                  <input type="number" min="0" max="10" value={form.pain} onChange={e=>setForm({...form,pain:e.target.value})} style={{width:'100%',padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box'}}/>
                </div>
              </div>
              <div>
                <label style={{display:'block',fontSize:'0.8rem',fontWeight:'500',color:'#374151',marginBottom:'0.25rem'}}>Bleeding</label>
                <select value={form.bleeding} onChange={e=>setForm({...form,bleeding:e.target.value})} style={{width:'100%',padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none'}}>
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label style={{display:'block',fontSize:'0.8rem',fontWeight:'500',color:'#374151',marginBottom:'0.25rem'}}>Notes</label>
                <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} style={{width:'100%',padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box',resize:'vertical'}}/>
              </div>
              <button type="submit" disabled={submitting} style={{background:'#2c4a3e',color:'white',padding:'0.5rem 1rem',borderRadius:'0.5rem',border:'none',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>
                {submitting ? 'Saving...' : 'Save Check-in'}
              </button>
            </form>
          )}

          {checkins.length === 0 ? (
            <p style={{color:'#6b7280',fontSize:'0.875rem',textAlign:'center',padding:'1.5rem 0'}}>No check-ins yet.</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              {checkins.map(c => (
                <div key={c.id} style={{padding:'1rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb',background:'#fafafa'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.5rem'}}>
                    <span style={{fontSize:'0.75rem',color:'#6b7280'}}>{new Date(c.created_at).toLocaleDateString('en-CA', {year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
                    <span style={{fontSize:'0.75rem',padding:'0.2rem 0.6rem',borderRadius:'9999px',fontWeight:'500',background: bleedingColors[c.bleeding] || '#f3f4f6', color: bleedingText[c.bleeding] || '#6b7280'}}>
                      {c.bleeding} bleeding
                    </span>
                  </div>
                  <div style={{display:'flex',gap:'1.5rem'}}>
                    <div>
                      <span style={{fontSize:'0.75rem',color:'#6b7280'}}>Mood </span>
                      <span style={{fontSize:'0.875rem',fontWeight:'600',color:'#1a1a1a'}}>{c.mood}/5 — {moodLabel[c.mood]}</span>
                    </div>
                    <div>
                      <span style={{fontSize:'0.75rem',color:'#6b7280'}}>Pain </span>
                      <span style={{fontSize:'0.875rem',fontWeight:'600',color: c.pain >= 7 ? '#dc2626' : '#1a1a1a'}}>{c.pain}/10</span>
                    </div>
                  </div>
                  {c.notes && <p style={{fontSize:'0.875rem',color:'#4b5563',margin:'0.5rem 0 0'}}>{c.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}