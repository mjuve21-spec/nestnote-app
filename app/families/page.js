'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export default function Families() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFamilies() {
      const { data } = await supabase.from('families').select('*').order('created_at', { ascending: false });
      setFamilies(data || []);
      setLoading(false);
    }
    fetchFamilies();
  }, []);

  if (loading) return <div style={{padding:'2rem'}}>Loading...</div>;

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='families' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='families' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Families</h1>
          <a href='/families/add' style={{background:'#2c4a3e',color:'white',padding:'0.5rem 1rem',borderRadius:'0.5rem',textDecoration:'none',fontSize:'0.875rem',fontWeight:'500'}}>+ Add Family</a>
        </div>
        {families.length === 0 ? (
          <p style={{color:'#6b7280'}}>No families yet.</p>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
            {families.map(f => (
              <a key={f.id} href={'/families/' + f.id} style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.25rem',textDecoration:'none',color:'#1a1a1a',display:'block'}}>
                <div style={{fontWeight:'600',fontSize:'1rem'}}>{f.primary_name}</div>
                {f.partner_name && <div style={{color:'#6b7280',fontSize:'0.875rem'}}>{f.partner_name}</div>}
                {f.email && <div style={{color:'#6b7280',fontSize:'0.875rem'}}>{f.email}</div>}
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
