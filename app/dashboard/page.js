'use client';
import { useState, useEffect } from 'react';
import { Users, AlertTriangle, CheckSquare, TrendingUp } from 'lucide-react';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export default function Dashboard() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFamilies() {
      const { data } = await supabase.from('families').select('*').eq('archived', false).order('created_at', { ascending: false });
      setFamilies(data || []);
      setLoading(false);
    }
    fetchFamilies();
  }, []);

  const flagged = families.filter(f => f.status === 'flagged').length;

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='dashboard' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='dashboard' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
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
            {icon: Users, label:'Active Families', value: families.length, color:'#2c4a3e'},
            {icon: AlertTriangle, label:'Flagged', value: flagged, color:'#dc2626'},
            {icon: CheckSquare, label:'Check-ins Today', value:'--', color:'#2c4a3e'},
            {icon: TrendingUp, label:'Tasks Due', value:'--', color:'#d97706'},
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
          <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid #e5e7eb',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:0,fontSize:'0.95rem'}}>Active Families</h2>
            <a href="/families/add" style={{background:'#2c4a3e',color:'white',padding:'0.375rem 1rem',borderRadius:'0.5rem',textDecoration:'none',fontSize:'0.8rem',fontWeight:'500'}}>+ Add Family</a>
          </div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f9fafb'}}>
                {['Name','Email','Phone','Status'].map(h => (
                  <th key={h} style={{textAlign:'left',padding:'0.75rem 1.25rem',fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{padding:'2rem',textAlign:'center',color:'#6b7280'}}>Loading...</td></tr>
              ) : families.length === 0 ? (
                <tr><td colSpan={4} style={{padding:'2rem',textAlign:'center',color:'#6b7280'}}>No families yet.</td></tr>
              ) : families.map((f,i) => (
                <tr key={f.id} onClick={() => window.location.href='/families/'+f.id} style={{borderTop:'1px solid #e5e7eb',background: i%2===0 ? 'white' : '#fafafa',cursor:'pointer'}}>
                  <td style={{padding:'1rem 1.25rem',fontWeight:'600',color:'#1a1a1a',fontSize:'0.875rem'}}>{f.primary_name}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>{f.email || '--'}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>{f.phone || '--'}</td>
                  <td style={{padding:'1rem 1.25rem'}}>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: f.status==='flagged' ? '#fee2e2' : '#dcfce7', color: f.status==='flagged' ? '#dc2626' : '#16a34a'}}>
                      {f.status || 'active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}