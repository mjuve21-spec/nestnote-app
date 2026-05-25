'use client'
import { TrendingUp, Users, AlertTriangle, CheckSquare } from 'lucide-react'

export default function Reports() {
  const weeklyData = [
    { week: 'Week 1', checkins: 4, flagged: 1, tasks: 8 },
    { week: 'Week 2', checkins: 6, flagged: 0, tasks: 12 },
    { week: 'Week 3', checkins: 5, flagged: 2, tasks: 10 },
    { week: 'Week 4', checkins: 7, flagged: 1, tasks: 15 },
    { week: 'Week 5', checkins: 6, flagged: 0, tasks: 11 },
    { week: 'Week 6', checkins: 8, flagged: 1, tasks: 14 },
  ]

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={`/${p}`} style={{color: p==='reports' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='reports' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{marginBottom:'1.5rem'}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Reports</h1>
          <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>Overview of care activity across all families</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'2rem'}}>
          {[
            {label:'Total Check-ins', value:'36', icon: CheckSquare, color:'#2c4a3e'},
            {label:'Families Served', value:'4', icon: Users, color:'#2c4a3e'},
            {label:'Flags Raised', value:'5', icon: AlertTriangle, color:'#dc2626'},
            {label:'Tasks Completed', value:'24', icon: TrendingUp, color:'#d97706'},
          ].map(({label,value,icon:Icon,color}) => (
            <div key={label} style={{background:'white',borderRadius:'0.75rem',padding:'1.25rem',border:'1px solid #e5e7eb'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
                <Icon size={18} color={color}/>
                <span style={{fontSize:'0.8rem',color:'#6b7280',fontWeight:'500'}}>{label}</span>
              </div>
              <p style={{fontSize:'2rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',overflow:'hidden',marginBottom:'1.5rem'}}>
          <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid #e5e7eb'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:0,fontSize:'0.95rem'}}>Weekly Activity</h2>
          </div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f9fafb'}}>
                {['Week','Check-ins','Flagged','Tasks','Status'].map(h => (
                  <th key={h} style={{textAlign:'left',padding:'0.75rem 1.25rem',fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((row,i) => (
                <tr key={row.week} style={{borderTop:'1px solid #e5e7eb',background: i%2===0 ? 'white' : '#fafafa'}}>
                  <td style={{padding:'1rem 1.25rem',fontWeight:'600',color:'#1a1a1a',fontSize:'0.875rem'}}>{row.week}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>{row.checkins}</td>
                  <td style={{padding:'1rem 1.25rem',color: row.flagged > 0 ? '#dc2626' : '#16a34a',fontSize:'0.875rem',fontWeight:'500'}}>{row.flagged}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>{row.tasks}</td>
                  <td style={{padding:'1rem 1.25rem'}}>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: row.flagged > 0 ? '#fee2e2' : '#dcfce7', color: row.flagged > 0 ? '#dc2626' : '#16a34a'}}>
                      {row.flagged > 0 ? 'needs attention' : 'on track'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'}}>
          <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:'0 0 1rem',fontSize:'0.95rem'}}>Family Summary</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
            {[
              {name:'Maria Santos', week:3, checkins:3, tasks:5, status:'flagged'},
              {name:'Jessica Lee', week:7, checkins:7, tasks:12, status:'active'},
              {name:'Amara Osei', week:11, checkins:11, tasks:18, status:'active'},
              {name:'Taylor Brown', week:1, checkins:1, tasks:3, status:'active'},
            ].map(f => (
              <div key={f.name} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.875rem 1rem',borderRadius:'0.5rem',background:'#f9fafb',border:'1px solid #e5e7eb'}}>
                <div>
                  <p style={{fontWeight:'600',color:'#1a1a1a',margin:0,fontSize:'0.875rem'}}>{f.name}</p>
                  <p style={{fontSize:'0.8rem',color:'#6b7280',margin:'0.2rem 0 0'}}>Week {f.week} · {f.checkins} check-ins · {f.tasks} tasks</p>
                </div>
                <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: f.status==='flagged' ? '#fee2e2' : '#dcfce7', color: f.status==='flagged' ? '#dc2626' : '#16a34a'}}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}