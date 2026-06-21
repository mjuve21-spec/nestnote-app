'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export default function Settings() {
  const [settings, setSettings] = useState({
    clinic_name: '', contact_email: '', phone: '',
    checkin_frequency: 'Daily', send_time: '9:00 AM', twilio_phone: '',
    mood_threshold: 2, pain_threshold: 7, bleeding_threshold: 'Heavy'
  });
  const [saved, setSaved] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').limit(1).single();
      if (data) { setSettings(data); setId(data.id); }
    }
    fetchSettings();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (id) {
      await supabase.from('settings').update(settings).eq('id', id);
    } else {
      const { data } = await supabase.from('settings').insert([settings]).select().single();
      if (data) setId(data.id);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

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
        <form onSubmit={handleSave} style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
          <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:'0 0 1rem',fontSize:'0.95rem'}}>Clinic Information</h2>
            {[['Clinic Name','clinic_name','text'],['Contact Email','contact_email','email'],['Phone','phone','tel']].map(([label,key,type]) => (
              <div key={key} style={{marginBottom:'1rem'}}>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>{label}</label>
                <input type={type} value={settings[key]} onChange={e=>setSettings({...settings,[key]:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',boxSizing:'border-box'}}/>
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:'0 0 0.25rem',fontSize:'0.95rem'}}>SMS Check-in Settings</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 1rem'}}>Configure automated SMS check-ins for families</p>
            {[['Check-in Frequency','checkin_frequency','text'],['Send Time','send_time','text'],['Twilio Phone Number','twilio_phone','text']].map(([label,key,type]) => (
              <div key={key} style={{marginBottom:'1rem'}}>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>{label}</label>
                <input type={type} value={settings[key]} onChange={e=>setSettings({...settings,[key]:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',boxSizing:'border-box'}}/>
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:'0 0 0.25rem',fontSize:'0.95rem'}}>Escalation Thresholds</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 1rem'}}>Auto-flag check-ins that exceed these thresholds</p>
            <div style={{marginBottom:'1rem'}}>
              <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Mood Score (flag if below)</label>
              <input type="number" value={settings.mood_threshold} onChange={e=>setSettings({...settings,mood_threshold:parseInt(e.target.value)})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',boxSizing:'border-box'}}/>
            </div>
            <div style={{marginBottom:'1rem'}}>
              <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Pain Level (flag if above)</label>
              <input type="number" value={settings.pain_threshold} onChange={e=>setSettings({...settings,pain_threshold:parseInt(e.target.value)})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',boxSizing:'border-box'}}/>
            </div>
            <div>
              <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Bleeding (flag if)</label>
              <select value={settings.bleeding_threshold} onChange={e=>setSettings({...settings,bleeding_threshold:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem'}}>
                <option>Light</option>
                <option>Moderate</option>
                <option>Heavy</option>
              </select>
            </div>
          </div>
          <button type="submit" style={{padding:'0.75rem',background:'#7a9582',color:'white',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </form>
      </main>
    </div>
  );
}