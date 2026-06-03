'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, AlertTriangle, CheckSquare } from 'lucide-react';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export default function Reports() {
  const [families, setFamilies] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [{ data: fam }, { data: chk }] = await Promise.all([
        supabase.from('families').select('*'),
        supabase.from('checkins').select('*').order('created_at', { ascending: false }),
      ]);
      setFamilies(fam || []);
      setCheckins(chk || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const flagged = families.filter(f => f.status === 'flagged').length;
  const today = new Date().toDateString();
  const checkinsToday = checkins.filter(c => new Date(c.created_at).toDateString() === today).length;

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='reports' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='reports' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
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
            {label:'Total Check-ins', value: checkins.length, icon: CheckSquare, color:'#2c4a3e'},
            {label:'Families Served', value: families.length, icon: Users, color:'#2c4a3e'},
            {label:'Flags Raised', value: flagged, icon: AlertTriangle, color:'#dc2626'},
            {label:'Check-ins Today', value: checkinsToday, icon: TrendingUp, color:'#d97706'},
          ].map(({label,value,icon:Icon,color}) => (
            <div key={label} style={{background:'white',borderRadius:'0.75rem',padding:'1.25rem',border:'1px solid #e5e7eb'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
                <Icon size={18} color={color}/>
                <span style={{fontSize:'0.8rem',color:'#6b7280',fontWeight:'500'}}>{label}</span>
              </div>
              <p style={{fontSize:'2rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>{loading ? '--' : value}</p>
            </div>
          ))}
        </div>
        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'}}>
          <h2 style={{fontWeight:'600',color:'#1a1a1a',margin:'0 0 1rem',fontSize:'0.95rem'}}>Family Summary</h2>
          {loading ? (
            <p style={{color:'#6b7280',textAlign:'center',padding:'1rem'}}>Loading...</p>
          ) : families.length === 0 ? (
            <p style={{color:'#6b7280',textAlign:'center',padding:'1rem'}}>No families yet.</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              {families.map(f => {
                const familyCheckins = checkins.filter(c => c.family_id === f.id);
                return (
                  <div key={f.id} onClick={() => window.location.href='/families/'+f.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.875rem 1rem',borderRadius:'0.5rem',background:'#f9fafb',border:'1px solid #e5e7eb',cursor:'pointer'}}>
                    <div>
                      <p style={{fontWeight:'600',color:'#1a1a1a',margin:0,fontSize:'0.875rem'}}>{f.primary_name}</p>
                      <p style={{fontSize:'0.8rem',color:'#6b7280',margin:'0.2rem 0 0'}}>{familyCheckins.length} check-ins · {f.email || 'no email'}</p>
                    </div>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: f.status==='flagged' ? '#fee2e2' : '#dcfce7', color: f.status==='flagged' ? '#dc2626' : '#16a34a'}}>
                      {f.status || 'active'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
