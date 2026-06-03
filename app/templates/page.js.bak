'use client'
import { Plus } from 'lucide-react'

export default function Templates() {
  const templates = [
    { title: 'Mood Check', category: 'self_care', week: 1, assigned_to: 'family', birth_types: 'all' },
    { title: 'Schedule Lactation Consultation', category: 'lactation', week: 1, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Wound Check Photo', category: 'wound_care', week: 1, assigned_to: 'family', birth_types: 'cesarean' },
    { title: 'Newborn Weight Check', category: 'newborn_milestone', week: 2, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Submit Birth Certificate Paperwork', category: 'paperwork', week: 2, assigned_to: 'family', birth_types: 'all' },
    { title: '3-Week Postpartum Visit', category: 'appointment', week: 3, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Edinburgh Depression Screening', category: 'medical', week: 4, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Review Contraception Options', category: 'medical', week: 6, assigned_to: 'care_team', birth_types: 'all' },
    { title: '12-Week Final Visit', category: 'appointment', week: 12, assigned_to: 'care_team', birth_types: 'all' },
  ]

  const categoryColors = {
    self_care: {background:'#dcfce7',color:'#16a34a'},
    lactation: {background:'#fef3c7',color:'#d97706'},
    wound_care: {background:'#fee2e2',color:'#dc2626'},
    newborn_milestone: {background:'#dbeafe',color:'#2563eb'},
    paperwork: {background:'#f3f4f6',color:'#6b7280'},
    appointment: {background:'#ede9fe',color:'#7c3aed'},
    medical: {background:'#fee2e2',color:'#dc2626'},
  }

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={`/${p}`} style={{color: p==='templates' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='templates' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
          <div>
            <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Task Templates</h1>
            <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>12-week postpartum task library</p>
          </div>
          <button style={{display:'flex',alignItems:'center',gap:'0.5rem',background:'#2c4a3e',color:'white',padding:'0.5rem 1.25rem',borderRadius:'0.5rem',border:'none',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>
            <Plus size={15}/> New Template
          </button>
        </div>
        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f9fafb'}}>
                {['Task','Category','Week','Assigned To','Birth Type'].map(h => (
                  <th key={h} style={{textAlign:'left',padding:'0.75rem 1.25rem',fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {templates.map((t,i) => (
                <tr key={i} style={{borderTop:'1px solid #e5e7eb',background: i%2===0 ? 'white' : '#fafafa',cursor:'pointer'}}>
                  <td style={{padding:'1rem 1.25rem',fontWeight:'500',color:'#1a1a1a',fontSize:'0.875rem'}}>{t.title}</td>
                  <td style={{padding:'1rem 1.25rem'}}>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',textTransform:'capitalize', ...(categoryColors[t.category] || {background:'#f3f4f6',color:'#6b7280'})}}>
                      {t.category.replace('_',' ')}
                    </span>
                  </td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>Week {t.week}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem',textTransform:'capitalize'}}>{t.assigned_to.replace('_',' ')}</td>
                  <td style={{padding:'1rem 1.25rem'}}>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: t.birth_types==='cesarean' ? '#fee2e2' : '#dcfce7', color: t.birth_types==='cesarean' ? '#dc2626' : '#16a34a',textTransform:'capitalize'}}>
                      {t.birth_types}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}