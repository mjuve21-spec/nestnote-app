'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function EditFamily() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    primary_name: '',
    partner_name: '',
    email: '',
    phone: '',
    birth_date: '',
    baby_name: '',
    birth_type: 'vaginal',
    site: '',
    notes: '',
  });

  useEffect(() => { fetchFamily() }, [id]);

  async function fetchFamily() {
    const { data } = await supabase.from('families').select('*').eq('id', id).single();
    if (data) setForm({
      primary_name: data.primary_name || '',
      partner_name: data.partner_name || '',
      email: data.email || '',
      phone: data.phone || '',
      birth_date: data.birth_date || '',
      baby_name: data.baby_name || '',
      birth_type: data.birth_type || 'vaginal',
      site: data.site || '',
      notes: data.notes || '',
    });
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error } = await supabase.from('families').update(form).eq('id', id);
    if (error) { setError(error.message); setSaving(false); return; }
    router.push(`/families/${id}`);
  }

  if (loading) return <div style={{minHeight:'100vh',background:'#f5f4f2',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'#6b7280'}}>Loading...</p></div>;

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
      <main style={{maxWidth:'640px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{marginBottom:'1.5rem'}}>
          <a href={`/families/${id}`} style={{color:'#2c4a3e',textDecoration:'none',fontSize:'0.875rem',fontWeight:'500'}}>← Back to Family</a>
          <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',marginTop:'0.5rem',marginBottom:0}}>Edit Family</h1>
        </div>
        {error && <div style={{marginBottom:'1rem',padding:'0.75rem',background:'#fee2e2',color:'#dc2626',borderRadius:'0.5rem',fontSize:'0.875rem'}}>{error}</div>}
        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem'}}>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
            {[
              ['primary_name','Primary Name','text',true],
              ['partner_name','Partner Name','text',false],
              ['email','Email','email',false],
              ['phone','Phone','tel',false],
              ['baby_name','Baby Name','text',false],
              ['site','Site / Clinic','text',false],
            ].map(([name,label,type,req]) => (
              <div key={name}>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>{label}{req && ' *'}</label>
                <input type={type} name={name} required={req} value={form[name]} onChange={e=>setForm({...form,[name]:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box',color:'#1a1a1a'}}/>
              </div>
            ))}
            <div>
              <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Birth Date</label>
              <input type="date" value={form.birth_date} onChange={e=>setForm({...form,birth_date:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box',color:'#1a1a1a'}}/>
            </div>
            <div>
              <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Birth Type</label>
              <select value={form.birth_type} onChange={e=>setForm({...form,birth_type:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none'}}>
                <option value="vaginal">Vaginal</option>
                <option value="cesarean">Cesarean</option>
              </select>
            </div>
            <div>
              <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Notes</label>
              <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={3} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box',resize:'vertical',color:'#1a1a1a'}}/>
            </div>
            <div style={{display:'flex',gap:'0.75rem',paddingTop:'0.5rem'}}>
              <button type="submit" disabled={saving} style={{flex:1,padding:'0.625rem 1rem',background:'#2c4a3e',color:'white',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <a href={`/families/${id}`} style={{flex:1,textAlign:'center',padding:'0.625rem 1rem',background:'#f3f4f6',color:'#374151',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'500',textDecoration:'none'}}>
                Cancel
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
