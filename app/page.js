'use client';
import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{minHeight:'100vh',background:'#fafaf8'}}>
      <nav style={{padding:'1.25rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #e5e7eb',background:'white'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'#2c4a3e'}}>NestNote</span>
        <a href="/login" style={{background:'#2c4a3e',color:'white',padding:'0.5rem 1.25rem',borderRadius:'0.5rem',textDecoration:'none',fontSize:'0.875rem',fontWeight:'500'}}>Sign In</a>
      </nav>
      <section style={{maxWidth:'720px',margin:'0 auto',padding:'5rem 2rem 4rem',textAlign:'center'}}>
        <div style={{display:'inline-block',background:'#f0f7f4',color:'#2c4a3e',padding:'0.375rem 1rem',borderRadius:'9999px',fontSize:'0.8rem',fontWeight:'600',letterSpacing:'0.05em',marginBottom:'2rem'}}>FOR POSTPARTUM CARE COORDINATORS</div>
        <h1 style={{fontSize:'3.5rem',fontWeight:'700',color:'#1a1a1a',lineHeight:'1.15',margin:'0 0 1.5rem',fontFamily:'Georgia,serif'}}>Tender care,<br/><span style={{color:'#2c4a3e',fontStyle:'italic'}}>beautifully organized.</span></h1>
        <p style={{fontSize:'1.125rem',color:'#6b7280',lineHeight:'1.7',margin:'0 0 3rem'}}>NestNote is the quiet workspace for midwives, doulas and postpartum coordinators — track families, log check-ins, and get automatic alerts when someone needs attention.</p>
        {submitted ? (
          <div style={{background:'#f0f7f4',border:'1px solid #bbf7d0',borderRadius:'0.75rem',padding:'1.5rem'}}>
            <p style={{color:'#16a34a',fontWeight:'600',margin:0}}>You are on the list! We will be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{display:'flex',gap:'0.75rem',maxWidth:'440px',margin:'0 auto'}}>
            <input type="email" required placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} style={{flex:1,padding:'0.75rem 1rem',border:'1px solid #e5e7eb',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none'}}/>
            <button type="submit" style={{background:'#2c4a3e',color:'white',padding:'0.75rem 1.5rem',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'600',cursor:'pointer',whiteSpace:'nowrap'}}>Join Waitlist</button>
          </form>
        )}
        <p style={{color:'#9ca3af',fontSize:'0.8rem',marginTop:'1rem'}}>No spam. One email when we launch.</p>
      </section>
      <section style={{background:'white',borderTop:'1px solid #e5e7eb',borderBottom:'1px solid #e5e7eb',padding:'4rem 2rem'}}>
        <div style={{maxWidth:'960px',margin:'0 auto'}}>
          <p style={{textAlign:'center',color:'#6b7280',fontSize:'0.8rem',fontWeight:'600',letterSpacing:'0.1em',marginBottom:'3rem'}}>BUILT FOR THE WAY YOU WORK</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2.5rem'}}>
            {[
              {title:'Family Profiles',desc:'Add families, track birth type, assign a care site and keep all their details in one clean place.'},
              {title:'Daily Check-ins',desc:'Families fill in a simple 4-step form from their phone. No app download needed — just a link.'},
              {title:'Auto-Flagging',desc:'When mood is low, pain is high or bleeding is heavy, the family is automatically flagged for follow-up.'},
              {title:'Trend Charts',desc:'See mood and pain trends over time for each family so you can spot patterns before they become problems.'},
              {title:'Clear Flag',desc:'Once you have followed up, clear the flag with one click. Clean, simple triage workflow.'},
              {title:'Task Templates',desc:'A 12-week postpartum task library — assign care plans to families and track completion.'},
            ].map(f=>(
              <div key={f.title}>
                <h3 style={{fontSize:'1rem',fontWeight:'700',color:'#1a1a1a',margin:'0 0 0.5rem',fontFamily:'Georgia,serif'}}>{f.title}</h3>
                <p style={{fontSize:'0.875rem',color:'#6b7280',lineHeight:'1.6',margin:0}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer style={{borderTop:'1px solid #e5e7eb',padding:'2rem',textAlign:'center'}}>
        <p style={{color:'#9ca3af',fontSize:'0.8rem',margin:0}}>2026 NestNote — care, gently coordinated.</p>
      </footer>
    </div>
  );
}