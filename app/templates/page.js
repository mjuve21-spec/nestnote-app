'use client';
import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'self_care', week: 1, assigned_to: 'family', birth_types: 'all' });

  const categoryColors = {
    self_care: {background:'#dcfce7',color:'#16a34a'},
    lactation: {background:'#fef3c7',color:'#d97706'},
    wound_care: {background:'#fee2e2',color:'#dc2626'},
    newborn_milestone: {background:'#dbeafe',color:'#2563eb'},
    paperwork: {background:'#f3f4f6',color:'#6b7280'},
    appointment: {background:'#ede9fe',color:'#7c3aed'},
    medical: {background:'#fee2e2',color:'#dc2626'},
  };

  useEffect(() => { fetchTemplates(); }, []);

  async function fetchTemplates() {
    const { data } = await supabase.from('templates').select('*').order('week');
    setTemplates(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from('templates').insert([form]);
    if (!error) {
      setShowForm(false);
      setForm({ title: '', category: 'self_care', week: 1, assigned_to: 'family', birth_types: 'all' });
      fetchTemplates();
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#f5f4f2'}}>
      <nav style={{background:'#2c4a3e',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='templates' ? 'white' : '#94b5a8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='templates' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
          <div>
            <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Task Templates</h1>
            <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>12-week postpartum task library</p>
          </div>
          <button onClick={() => setShowForm(true)} style={{display:'flex',alignItems:'center',gap:'0.5rem',background:'#2c4a3e',color:'white',padding:'0.5rem 1.25rem',borderRadius:'0.5rem',border:'none',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>
            <Plus size={15}/> New Template
          </button>
        </div>

        {showForm && (
          <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem',marginBottom:'1.5rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
              <h2 style={{margin:0,fontSize:'1rem',fontWeight:'600'}}>New Template</h2>
              <button onClick={() => setShowForm(false)} style={{background:'none',border:'none',cursor:'pointer'}}><X size={18}/></button>
            </div>
            <form onSubmit={handleSubmit} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div style={{gridColumn:'1/-1'}}>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Title</label>
                <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Mood Check" style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Category</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem'}}>
                  {['self_care','lactation','wound_care','newborn_milestone','paperwork','appointment','medical'].map(c => (
                    <option key={c} value={c}>{c.replace(/_/g,' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Week</label>
                <input type="number" min="1" max="12" required value={form.week} onChange={e=>setForm({...form,week:parseInt(e.target.value)})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Assigned To</label>
                <select value={form.assigned_to} onChange={e=>setForm({...form,assigned_to:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem'}}>
                  <option value="family">Family</option>
                  <option value="care_team">Care Team</option>
                </select>
              </div>
              <div>
                <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',color:'#374151',marginBottom:'0.375rem'}}>Birth Type</label>
                <select value={form.birth_types} onChange={e=>setForm({...form,birth_types:e.target.value})} style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem'}}>
                  <option value="all">All</option>
                  <option value="cesarean">Cesarean</option>
                  <option value="vaginal">Vaginal</option>
                </select>
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <button type="submit" style={{background:'#2c4a3e',color:'white',padding:'0.5rem 1.5rem',borderRadius:'0.5rem',border:'none',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>Save Template</button>
              </div>
            </form>
          </div>
        )}

        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f9fafb'}}>
                {['Task','Category','Week','Assigned To','Birth Type'].map(h => (
                  <th key={h} style={{textAlign:'left',padding:'0.75rem 1.25rem',fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {templates.length === 0 ? (
                <tr><td colSpan={5} style={{padding:'2rem',textAlign:'center',color:'#6b7280'}}>No templates yet. Click New Template to add one.</td></tr>
              ) : templates.map((t,i) => (
                <tr key={t.id} style={{borderTop:'1px solid #e5e7eb',background: i%2===0 ? 'white' : '#fafafa'}}>
                  <td style={{padding:'1rem 1.25rem',fontWeight:'500',color:'#1a1a1a',fontSize:'0.875rem'}}>{t.title}</td>
                  <td style={{padding:'1rem 1.25rem'}}>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',textTransform:'capitalize', ...(categoryColors[t.category] || {background:'#f3f4f6',color:'#6b7280'})}}>
                      {t.category.replace(/_/g,' ')}
                    </span>
                  </td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem'}}>Week {t.week}</td>
                  <td style={{padding:'1rem 1.25rem',color:'#4b5563',fontSize:'0.875rem',textTransform:'capitalize'}}>{t.assigned_to.replace('_',' ')}</td>
                  <td style={{padding:'1rem 1.25rem'}}>
                    <span style={{fontSize:'0.75rem',padding:'0.25rem 0.75rem',borderRadius:'9999px',fontWeight:'500',background: t.birth_types==='cesarean' ? '#fee2e2' : '#dcfce7', color: t.birth_types==='cesarean' ? '#dc2626' : '#16a34a',textTransform:'capitalize'}}>
                      {t.birth_types}
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
