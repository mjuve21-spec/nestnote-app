'use client'
import { useState, useEffect } from 'react'
import { createClient } from "@/lib/supabase"

const supabase = createClient()

export default function Families() {
  const [families, setFamilies] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchFamilies() }, [])

  async function fetchFamilies() {
    const { data, error } = await supabase.from('families').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setFamilies(data)
    setLoading(false)
  }

  const filtered = families.filter(f => f.primary_name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={`/${p}`} style={{color: p==='families' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='families' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
          <div>
            <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Families</h1>
            <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>{families.length} active families</p>
          </div>
          <a href="/families/add" style={{background:'#2c4a3e',color:'white',padding:'0.5rem 1.25rem',borderRadius:'0.5rem',textDecoration:'none',fontSize:'0.875rem',fontWeight:'500'}}>+ Add Family</a>
        </div>
        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',overflow:'hidden'}}>
          <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid #e5e7eb'}}>
            <input placeholder="Search families..." value={search} onChange={e=>setSearch(e.target.value)} style={{padding:'0.5rem 0.75rem',border:'1px solid #e5e7eb',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',width:'260px'}}/>
          </div>
          {loading ? (
            <div style={{padding:'3rem',textAlign:'center',color:'#6b7280'}}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{padding:'3rem',textAlign:'center',color:'#6b7280'}}>No families yet. Add your first family!</div>
          ) : (
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f9fafb'}}>
                  {['Family','Phone','Birth Date','Status'].map(h => (
                    <th key={h} style={{textAlign:'left',padding:'0.75rem 1.25rem',fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((f,i) => (
                  <tr key={f.id} onClick={() => window.location.href=`/families/${f.id}`} style={{borderTop:'1px solid #e5e7eb',background: i%2===0 ? 'white' : '#fafafa',cursor:'pointer'}}>
                    <td style={{padding:'1rem 1.25rem'}}>
                      <p style={{fontWeight:'600',color:'#1a1a1a',margin:0}}>{f.primary_name}</p>
                      {f.secondary_name && <p style={{fontSize:'0.8rem',color:'#6b7280',margin:'0.1rem 0 0'}}>{f.secondary_name}</p>}
                    </td>
                    <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>{f.phone || '—'}</td>
                    <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>{f.birth_date || '—'}</td>
                    <td style={{padding:'1rem 1.25rem'}}>
                      <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: f.status==='flagged' ? '#fee2e2' : '#dcfce7', color: f.status==='flagged' ? '#dc2626' : '#16a34a'}}>
                        {f.status || 'active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}