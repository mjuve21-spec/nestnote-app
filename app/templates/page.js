'use client';
import { useState, useEffect } from 'react';
import { createClient } from "@/lib/supabase";

const supabase = createClient();

const CATEGORY_COLORS = {
  'Self Care':        { bg:'#dcfce7', text:'#16a34a' },
  'Lactation':        { bg:'#fef3c7', text:'#d97706' },
  'Wound Care':       { bg:'#fee2e2', text:'#dc2626' },
  'Newborn Milestone':{ bg:'#dbeafe', text:'#2563eb' },
  'Paperwork':        { bg:'#f3f4f6', text:'#4b5563' },
  'Appointment':      { bg:'#ede9fe', text:'#7c3aed' },
  'Medical':          { bg:'#fee2e2', text:'#dc2626' },
};

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    task_name: '', category: 'Self Care', week: 1, assigned_to: 'Family', birth_type: 'All'
  });

  useEffect(() => { fetchTemplates(); }, []);

  async function fetchTemplates() {
    const { data } = await supabase.from('templates').select('*').order('week', { ascending: true });
    setTemplates(data || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error } = await supabase.from('templates').insert([{ ...form, week: parseInt(form.week) }]);
    if (error) { setError(error.message); setSaving(false); return; }
    setForm({ task_name:'', category:'Self Care', week:1, assigned_to:'Family', birth_type:'All' });
    setShowForm(false);
    setSaving(false);
    fetchTemplates();
  }

  const th = {textAlign:'left',padding:'1rem',fontSize:'0.75rem',fontWeight:'600',color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.05em'};
  const td = {padding:'1rem',fontSize:'0.875rem',color:'#1a1a1a'};
  const input = {width:'100%',padding:'0.5rem',border:'1px solid #d1d5db',borderRadius:'0.5rem',fontSize:'0.875rem',outline:'none',boxSizing:'border-box'};
  const label = {display:'block',fontSize:'0.8rem',fontWeight:'500',color:'#374151',marginBottom:'0.25rem'};

  return (
    <div style={{minHeight:'100vh',background:'#faf6ef'}}>
      <nav style={{background:'#7a9582',padding:'0 1.5rem',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontWeight:'700',fontSize:'1.1rem',color:'white',letterSpacing:'-0.3px'}}>NestNote</span>
        <div style={{display:'flex',gap:'2rem'}}>
          {['dashboard','families','reports','templates','settings'].map(p => (
            <a key={p} href={'/' + p} style={{color: p==='templates' ? 'white' : '#dce5d8', textDecoration:'none', fontSize:'0.875rem', fontWeight: p==='templates' ? '600' : '400', textTransform:'capitalize'}}>{p}</a>
          ))}
        </div>
      </nav>

      <main style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'1.5rem'}}>
          <div>
            <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#1a1a1a',margin:0}}>Task Templates</h1>
            <p style={{color:'#6b7280',fontSize:'0.875rem',marginTop:'0.25rem'}}>12-week postpartum task library</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{background:'#7a9582',color:'white',padding:'0.625rem 1.25rem',borderRadius:'0.5rem',border:'none',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>
            {showForm ? 'Cancel' : '+ New Template'}
          </button>
        </div>

        {error && <div style={{padding:'0.75rem 1rem',background:'#fee2e2',color:'#dc2626',borderRadius:'0.5rem',marginBottom:'1rem',fontSize:'0.875rem'}}>{error}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',padding:'1.5rem',marginBottom:'1.5rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
            <div>
              <label style={label}>Task Name</label>
              <input required value={form.task_name} onChange={e=>setForm({...form,task_name:e.target.value})} placeholder="e.g. Mood Check" style={input}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem'}}>
              <div>
                <label style={label}>Category</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={input}>
                  {Object.keys(CATEGORY_COLORS).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={label}>Week</label>
                <input type="number" min="1" max="12" required value={form.week} onChange={e=>setForm({...form,week:e.target.value})} style={input}/>
              </div>
              <div>
                <label style={label}>Assigned To</label>
                <select value={form.assigned_to} onChange={e=>setForm({...form,assigned_to:e.target.value})} style={input}>
                  <option value="Family">Family</option>
                  <option value="Care Team">Care Team</option>
                </select>
              </div>
              <div>
                <label style={label}>Birth Type</label>
                <select value={form.birth_type} onChange={e=>setForm({...form,birth_type:e.target.value})} style={input}>
                  <option value="All">All</option>
                  <option value="Vaginal">Vaginal</option>
                  <option value="Cesarean">Cesarean</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={saving} style={{alignSelf:'flex-start',background:'#7a9582',color:'white',padding:'0.5rem 1.25rem',borderRadius:'0.5rem',border:'none',fontSize:'0.875rem',fontWeight:'500',cursor:'pointer'}}>
              {saving ? 'Saving...' : 'Save Template'}
            </button>
          </form>
        )}

        <div style={{background:'white',borderRadius:'0.75rem',border:'1px solid #e5e7eb',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f9fafb',borderBottom:'1px solid #e5e7eb'}}>
                {['Task','Category','Week','Assigned To','Birth Type'].map(h => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{padding:'2rem',textAlign:'center',color:'#6b7280'}}>Loading...</td></tr>
              ) : templates.length === 0 ? (
                <tr><td colSpan={5} style={{padding:'2rem',textAlign:'center',color:'#6b7280'}}>No templates yet.</td></tr>
              ) : templates.map(t => {
                const c = CATEGORY_COLORS[t.category] || { bg:'#f3f4f6', text:'#4b5563' };
                const cesarean = t.birth_type === 'Cesarean';
                return (
                  <tr key={t.id} style={{borderBottom:'1px solid #e5e7eb'}}>
                    <td style={{...td,fontWeight:'500'}}>{t.task_name}</td>
                    <td style={{padding:'1rem'}}>
                      <span style={{fontSize:'0.75rem',padding:'0.375rem 0.875rem',borderRadius:'9999px',background:c.bg,color:c.text,fontWeight:'500'}}>{t.category}</span>
                    </td>
                    <td style={{...td,color:'#6b7280'}}>Week {t.week}</td>
                    <td style={td}>{t.assigned_to}</td>
                    <td style={{padding:'1rem'}}>
                      <span style={{fontSize:'0.75rem',padding:'0.375rem 0.875rem',borderRadius:'9999px',background: cesarean ? '#fee2e2' : '#dcfce7',color: cesarean ? '#dc2626' : '#16a34a',fontWeight:'500'}}>{t.birth_type}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}