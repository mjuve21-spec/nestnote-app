'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/lib/supabase";

const supabase = createClient();

export default function AddFamily() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    primary_name: '',
    partner_name: '',
    email: '',
    phone: '',
    birth_date: '',
    birth_type: 'Vaginal',
    baby_name: '',
    site: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to add a family.');

      const { data: family, error: familyError } = await supabase
        .from('families')
        .insert([{ ...formData, user_id: user.id }])
        .select()
        .single();
      if (familyError) throw familyError;

      // Build this family's task list from the template library.
      // Keep templates marked "All" plus any matching their birth type.
      const { data: templates } = await supabase
        .from('templates')
        .select('id, birth_type');

      const relevant = (templates || []).filter(
        t => t.birth_type === 'All' || t.birth_type === formData.birth_type
      );

      if (relevant.length > 0) {
        const { error: taskError } = await supabase.from('tasks').insert(
          relevant.map(t => ({ family_id: family.id, template_id: t.id, completed: false }))
        );
        // A task failure shouldn't lose the family record — warn, don't throw.
        if (taskError) console.error('Task creation failed:', taskError);
      }

      router.push('/families/' + family.id);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const input = {padding:'0.625rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box',width:'100%'};
  const label = {display:'block',fontSize:'0.8rem',fontWeight:'500',color:'#374151',marginBottom:'0.25rem'};

  return (
    <div style={{minHeight:'100vh',background:'#faf6ef'}}>
      <nav style={{background:'#7a9582',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='families' ? 'white' : '#dce5d8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='families' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>

      <main style={{maxWidth:'640px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <a href="/families" style={{color:'#7a9582',textDecoration:'none',fontSize:'0.875rem',fontWeight:'500'}}>← Back to Families</a>
        <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:'1rem 0 1.5rem'}}>Add New Family</h1>

        {error && <div style={{padding:'0.75rem 1rem',background:'#fee2e2',color:'#dc2626',borderRadius:'0.5rem',marginBottom:'1rem',fontSize:'0.875rem'}}>{error}</div>}

        <form onSubmit={handleSubmit} style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div>
            <label style={label}>Primary Name *</label>
            <input name="primary_name" required value={formData.primary_name} onChange={handleChange} style={input}/>
          </div>
          <div>
            <label style={label}>Partner Name</label>
            <input name="partner_name" value={formData.partner_name} onChange={handleChange} style={input}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div>
              <label style={label}>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} style={input}/>
            </div>
            <div>
              <label style={label}>Phone</label>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} style={input}/>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div>
              <label style={label}>Birth Date *</label>
              <input name="birth_date" type="date" required value={formData.birth_date} onChange={handleChange} style={input}/>
            </div>
            <div>
              <label style={label}>Birth Type *</label>
              <select name="birth_type" value={formData.birth_type} onChange={handleChange} style={input}>
                <option value="Vaginal">Vaginal</option>
                <option value="Cesarean">Cesarean</option>
              </select>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div>
              <label style={label}>Baby Name</label>
              <input name="baby_name" value={formData.baby_name} onChange={handleChange} style={input}/>
            </div>
            <div>
              <label style={label}>Site</label>
              <input name="site" placeholder="e.g. Downtown Clinic" value={formData.site} onChange={handleChange} style={input}/>
            </div>
          </div>
          <div>
            <label style={label}>Notes</label>
            <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} style={{...input,resize:'vertical'}}/>
          </div>
          <button type="submit" disabled={loading} style={{background:'#7a9582',color:'white',padding:'0.75rem',border:'none',borderRadius:'0.5rem',fontSize:'0.875rem',fontWeight:'600',cursor:'pointer'}}>
            {loading ? 'Adding...' : 'Add Family'}
          </button>
        </form>
      </main>
    </div>
  );
}