'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
const supabase = createClient();
export default function Families() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchFamilies() {
      const { data } = await supabase.from('families').select('*').order('created_at', { ascending: false });
      setFamilies(data || []);
      setLoading(false);
    }
    fetchFamilies();
  }, []);

  if (loading) return <div style={{padding:'2rem'}}>Loading...</div>;

  const filtered = families.filter(f => {
    const matchesSearch = !search || (f.primary_name || '').toLowerCase().includes(search.toLowerCase()) || (f.partner_name || '').toLowerCase().includes(search.toLowerCase()) || (f.email || '').toLowerCase().includes(search.toLowerCase());
    const matchesArchive = showArchived ? f.archived : !f.archived;
    return matchesSearch && matchesArchive;
  });

  return (
    <div style={{minHeight:'100vh',background:'#faf6ef'}}>
      <nav style={{background:'#7a9582',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='families' ? 'white' : '#dce5d8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='families' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>{showArchived ? 'Archived Families' : 'Families'}</h1>
          <a href='/families/add' style={{background:'#7a9582',color:'white',padding:'0.5rem 1rem',borderRadius:'0.5rem',textDecoration:'none',fontSize:'0.875rem',fontWeight:'500'}}>+ Add Family</a>
        </div>

        <div style={{display:'flex',gap:'0.5rem',marginBottom:'1rem'}}>
          <input
            type='text'
            placeholder='Search by name or email...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{flex:1,padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none'}}
          />
          <button
            onClick={() => setShowArchived(!showArchived)}
            style={{padding:'0.5rem 1rem',background: showArchived ? '#7a9582' : '#f3f4f6',color: showArchived ? 'white' : '#374151',border:'1px solid #e5e7eb',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer',whiteSpace:'nowrap'}}
          >
            {showArchived ? 'Show Active' : 'Show Archived'}
          </button>
        </div>

        {filtered.length === 0 ? (
          <p style={{color:'#6b7280'}}>{showArchived ? 'No archived families.' : 'No families yet.'}</p>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
            {filtered.map(f => (
              <a key={f.id} href={'/families/' + f.id} style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.25rem',textDecoration:'none',color:'#1a1a1a',display:'block'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:'600',fontSize:'1rem'}}>{f.primary_name}</div>
                    {f.partner_name && <div style={{color:'#6b7280',fontSize:'0.875rem'}}>{f.partner_name}</div>}
                    {f.email && <div style={{color:'#6b7280',fontSize:'0.875rem'}}>{f.email}</div>}
                  </div>
                  {f.archived && <span style={{fontSize:'0.7rem',padding:'0.25rem 0.6rem',borderRadius:'9999px',background:'#fef9c3',color:'#854d0e',fontWeight:'600'}}>archived</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}