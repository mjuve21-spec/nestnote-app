'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function FamilyCheckin() {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    mood: null,
    pain: 0,
    bleeding: null,
    notes: '',
  });

  async function handleSubmit() {
    setSubmitting(true);
    await fetch('/api/checkins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, family_id: id }),
    });
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) return (
    <div style={{minHeight:'100vh',background:'#2c4a3e',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🌿</div>
      <h1 style={{color:'white',fontSize:'1.5rem',fontWeight:'700',margin:'0 0 0.5rem',textAlign:'center'}}>Thank you!</h1>
      <p style={{color:'#a8c5b5',textAlign:'center',fontSize:'1rem'}}>Your check-in has been recorded. Your care team will review it shortly.</p>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2',display:'flex',flexDirection:'column'}}>
      <div style={{background:'#2c4a3e',padding:'1rem 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1rem',color:'white'}}>NestNote</span>
        <span style={{color:'#a8c5b5',fontSize:'0.8rem'}}>Daily Check-in</span>
      </div>
      <div style={{background:'white',padding:'1rem 1.5rem',borderBottom:'1px solid #e5e7eb'}}>
        <div style={{display:'flex',gap:'0.5rem'}}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{flex:1,height:'4px',borderRadius:'9999px',background: s <= step ? '#2c4a3e' : '#e5e7eb',transition:'background 0.3s'}}/>
          ))}
        </div>
        <p style={{fontSize:'0.75rem',color:'#6b7280',margin:'0.5rem 0 0'}}>Step {step} of 4</p>
      </div>
      <div style={{flex:1,padding:'1.5rem',maxWidth:'500px',margin:'0 auto',width:'100%'}}>
        {step === 1 && (
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:'700',color:'#1a1a1a',margin:'0 0 0.5rem'}}>How are you feeling today?</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 2rem'}}>Pick the option that best describes your mood.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              {[
                {value:1, label:'Very Low', desc:'Struggling today', color:'#fee2e2', border:'#fecaca', text:'#dc2626'},
                {value:2, label:'Low', desc:'Not feeling great', color:'#fef3c7', border:'#fde68a', text:'#d97706'},
                {value:3, label:'Okay', desc:'Managing alright', color:'#f3f4f6', border:'#e5e7eb', text:'#6b7280'},
                {value:4, label:'Good', desc:'Feeling pretty good', color:'#dcfce7', border:'#bbf7d0', text:'#16a34a'},
                {value:5, label:'Great', desc:'Feeling wonderful', color:'#dcfce7', border:'#86efac', text:'#15803d'},
              ].map(m => (
                <button key={m.value} onClick={() => { setForm({...form, mood: m.value}); setStep(2); }}
                  style={{padding:'1rem',borderRadius:'0.75rem',border:`2px solid ${form.mood === m.value ? m.border : '#e5e7eb'}`,background: form.mood === m.value ? m.color : 'white',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',transition:'all 0.2s'}}>
                  <div style={{textAlign:'left'}}>
                    <p style={{fontWeight:'600',color: form.mood === m.value ? m.text : '#1a1a1a',margin:0,fontSize:'0.95rem'}}>{m.label}</p>
                    <p style={{color:'#6b7280',margin:0,fontSize:'0.8rem'}}>{m.desc}</p>
                  </div>
                  <div style={{width:'24px',height:'24px',borderRadius:'9999px',border:`2px solid ${form.mood === m.value ? m.text : '#d1d5db'}`,background: form.mood === m.value ? m.text : 'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {form.mood === m.value && <div style={{width:'8px',height:'8px',borderRadius:'9999px',background:'white'}}/>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:'700',color:'#1a1a1a',margin:'0 0 0.5rem'}}>Pain level today?</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 2rem'}}>0 is no pain, 10 is the worst pain imaginable.</p>
            <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem',marginBottom:'1.5rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
                <span style={{color:'#6b7280',fontSize:'0.875rem'}}>No pain</span>
                <span style={{fontSize:'2rem',fontWeight:'700',color: form.pain >= 7 ? '#dc2626' : form.pain >= 4 ? '#d97706' : '#16a34a'}}>{form.pain}</span>
                <span style={{color:'#6b7280',fontSize:'0.875rem'}}>Severe</span>
              </div>
              <input type="range" min="0" max="10" value={form.pain}
                onChange={e => setForm({...form, pain: parseInt(e.target.value)})}
                style={{width:'100%',accentColor:'#2c4a3e'}}/>
            </div>
            <div style={{display:'flex',gap:'0.75rem'}}>
              <button onClick={() => setStep(1)} style={{flex:1,padding:'0.75rem',border:'1px solid #e5e7eb',borderRadius:'0.5rem',background:'white',color:'#374151',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>Back</button>
              <button onClick={() => setStep(3)} style={{flex:2,padding:'0.75rem',background:'#2c4a3e',color:'white',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>Continue</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:'700',color:'#1a1a1a',margin:'0 0 0.5rem'}}>How is your bleeding today?</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 2rem'}}>Select the option that best describes it.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',marginBottom:'1.5rem'}}>
              {[
                {value:'none', label:'None', desc:'No bleeding today'},
                {value:'light', label:'Light', desc:'Spotting or light flow'},
                {value:'moderate', label:'Moderate', desc:'Similar to a normal period'},
                {value:'heavy', label:'Heavy', desc:'Soaking a pad in under an hour'},
              ].map(b => (
                <button key={b.value} onClick={() => { setForm({...form, bleeding: b.value}); setStep(4); }}
                  style={{padding:'1rem',borderRadius:'0.75rem',border:`2px solid ${form.bleeding === b.value ? '#2c4a3e' : '#e5e7eb'}`,background: form.bleeding === b.value ? '#f0f7f4' : 'white',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}>
                  <div style={{textAlign:'left'}}>
                    <p style={{fontWeight:'600',color:'#1a1a1a',margin:0,fontSize:'0.95rem'}}>{b.label}</p>
                    <p style={{color:'#6b7280',margin:0,fontSize:'0.8rem'}}>{b.desc}</p>
                  </div>
                  <div style={{width:'24px',height:'24px',borderRadius:'9999px',border:`2px solid ${form.bleeding === b.value ? '#2c4a3e' : '#d1d5db'}`,background: form.bleeding === b.value ? '#2c4a3e' : 'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {form.bleeding === b.value && <div style={{width:'8px',height:'8px',borderRadius:'9999px',background:'white'}}/>}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} style={{width:'100%',padding:'0.75rem',border:'1px solid #e5e7eb',borderRadius:'0.5rem',background:'white',color:'#374151',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>Back</button>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 style={{fontSize:'1.25rem',fontWeight:'700',color:'#1a1a1a',margin:'0 0 0.5rem'}}>Anything else to share?</h2>
            <p style={{color:'#6b7280',fontSize:'0.875rem',margin:'0 0 2rem'}}>Optional — any concerns or notes for your care team.</p>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
              placeholder="e.g. Having trouble sleeping, feeling anxious..."
              rows={5}
              style={{width:'100%',padding:'0.875rem',border:'1px solid #e5e7eb',borderRadius:'0.75rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box',resize:'none',marginBottom:'1.5rem',color:'#1a1a1a'}}/>
            <div style={{display:'flex',gap:'0.75rem'}}>
              <button onClick={() => setStep(3)} style={{flex:1,padding:'0.75rem',border:'1px solid #e5e7eb',borderRadius:'0.5rem',background:'white',color:'#374151',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>Back</button>
              <button onClick={handleSubmit} disabled={submitting} style={{flex:2,padding:'0.75rem',background:'#2c4a3e',color:'white',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'600',cursor:'pointer'}}>
                {submitting ? 'Submitting...' : 'Submit Check-in'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}