'use client'
import { Users, AlertTriangle, CheckSquare, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={`/${p}`} style={{color: p==='dashboard' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='dashboard' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Good morning</h1>
          <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>Here's what needs your attention today.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'2rem'}}>
          {[
            {icon: Users, label:'Active Families', value:'4', color:'#2c4a3e'},
            {icon: AlertTriangle, label:'Flagged', value:'1', color:'#dc2626'},
            {icon: CheckSquare, label:'Check-ins Today', value:'3', color:'#2c4a3e'},
            {icon: TrendingUp, label:'Tasks Due', value:'7', color:'#d97706'},
          ].map(({icon: Icon, label, value, color}) => (
            <div key={label} style={{background:'white',borderRadius:'0.75rem',padding:'1.25rem',border:'1px solid #e5e7eb'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
                <Icon size={18} color={color}/>
                <span style={{fontSize:'0.8rem',color:'#6b7280',fontWeight:'500'}}>{label}</span>
              </div>
              <p style={{fontSize:'2rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',overflow:'hidden'}}>
          <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid #e5e7eb'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:0,fontSize:'0.95rem'}}>Active Families</h2>
          </div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f9fafb'}}>
                {['Name','Site','Week','Status'].map(h => (
                  <th key={h} style={{textAlign:'left',padding:'0.75rem 1.25rem',fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {name:'Maria Santos', week:3, status:'flagged', site:'Downtown Clinic'},
                {name:'Jessica Lee', week:7, status:'active', site:'Westside OB'},
                {name:'Amara Osei', week:11, status:'active', site:'Downtown Clinic'},
                {name:'Taylor Brown', week:1, status:'active', site:'Midwifery Center'},
              ].map((f,i) => (
                <tr key={f.name} style={{borderTop:'1px solid #e5e7eb',background: i%2===0 ? 'white' : '#fafafa',cursor:'pointer'}}>
                  <td style={{padding:'1rem 1.25rem',fontWeight:'600',color:'#1a1a1a',fontSize:'0.875rem'}}>{f.name}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>{f.site}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>Week {f.week}</td>
                  <td style={{padding:'1rem 1.25rem'}}>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: f.status==='flagged' ? '#fee2e2' : '#dcfce7', color: f.status==='flagged' ? '#dc2626' : '#16a34a'}}>
                      {f.status}
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