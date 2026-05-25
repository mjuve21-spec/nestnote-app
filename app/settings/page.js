'use client'

export default function Settings() {
  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={`/${p}`} style={{color: p==='settings' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='settings' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'720px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{marginBottom:'1.5rem'}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Settings</h1>
          <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>Manage your clinic and account preferences</p>
        </div>

        {[
          {title:'Clinic Information', fields:[
            {label:'Clinic Name', value:'Downtown Clinic'},
            {label:'Contact Email', value:'admin@downtownclinic.com'},
            {label:'Phone', value:'555-0100'},
          ]},
          {title:'SMS Check-in Settings', subtitle:'Configure automated SMS check-ins for families', fields:[
            {label:'Check-in Frequency', value:'Daily'},
            {label:'Send Time', value:'9:00 AM'},
            {label:'Twilio Phone Number', value:'+1 555 000 0000'},
          ]},
          {title:'Escalation Thresholds', subtitle:'Auto-flag check-ins that exceed these thresholds', fields:[
            {label:'Mood Score (flag if below)', value:'2'},
            {label:'Pain Level (flag if above)', value:'7'},
            {label:'Bleeding (flag if)', value:'Heavy'},
          ]},
        ].map(section => (
          <div key={section.title} style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem',marginBottom:'1rem'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:'0 0 0.25rem',fontSize:'0.95rem'}}>{section.title}</h2>
            {section.subtitle && <p style={{color:'#6b7280',fontSize:'0.8rem',margin:'0 0 1rem'}}>{section.subtitle}</p>}
            <div style={{display:'flex',flexDirection:'column',gap:'0.875rem',marginTop: section.subtitle ? 0 : '1rem'}}>
              {section.fields.map(field => (
                <div key={field.label}>
                  <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>{field.label}</label>
                  <input defaultValue={field.value} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box',color:'#1a1a1a',background:'#f9fafb'}}/>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button style={{width:'100%',padding:'0.75rem',background:'#2c4a3e',color:'white',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'600',cursor:'pointer',marginTop:'0.5rem'}}>
          Save Settings
        </button>
      </main>
    </div>
  )
}