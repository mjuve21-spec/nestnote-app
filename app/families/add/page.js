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
      console.log('Current user:', user);
      const { data, error } = await supabase.from('families').insert([formData]);
      console.log('Insert result:', { data, error });
      if (error) throw error;
      router.push('/families');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
      </nav>
      <main style={{maxWidth:'640px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a'}}>Add New Family</h1>
        {error && <div style={{padding:'0.75rem',background:'#fee2e2',color:'#dc2626',borderRadius:'0.5rem'}}>{error}</div>}
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <input name="primary_name" required placeholder="Primary Name" value={formData.primary_name} onChange={handleChange} style={{padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem'}}/>
          <input name="partner_name" placeholder="Partner Name" value={formData.partner_name} onChange={handleChange} style={{padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem'}}/>
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem'}}/>
          <input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} style={{padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem'}}/>
          <input name="birth_date" type="date" required value={formData.birth_date} onChange={handleChange} style={{padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem'}}/>
          <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} style={{padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem'}}/>
          <button type="submit" disabled={loading} style={{padding:'0.625rem',background:'#2c4a3e',color:'white',border:'none',borderRadius:'0.5rem',cursor:'pointer'}}>
            {loading ? 'Adding...' : 'Add Family'}
          </button>
        </form>
      </main>
    </div>
  );
}
