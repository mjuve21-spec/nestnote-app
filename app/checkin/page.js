'use client'
import { useState } from 'react'

export default function CheckIn() {
  const [form, setForm] = useState({
    mood: 3,
    pain_level: 0,
    bleeding: 'none',
    sleep_hours: 6,
    wound_concern: false,
    feeding_concerns: false,
    medication_taken: true,
    notes: ''
  })

  return (
    <div className="min-h-screen" style={{background: '#fdf8f3'}}>
      <nav style={{background: '#7c9e6e'}} className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪺</span>
          <span className="font-bold text-xl text-white">NestNote</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-green-100">
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="/families" className="hover:text-white">Families</a>
          <a href="/reports" className="hover:text-white">Reports</a>
          <a href="/templates" className="hover:text-white">Templates</a>
          <a href="/settings" className="hover:text-white">Settings</a>
        </div>
      </nav>
      <main className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{color: '#2d2416'}}>Daily Check-in</h1>
          <p className="mt-1" style={{color: '#9a7f60'}}>Maria Santos · Week 3</p>
        </div>
        <div className="space-y-4">

          {/* Mood */}
          <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <h3 className="font-medium mb-3" style={{color: '#2d2416'}}>How are you feeling today?</h3>
            <div className="flex gap-3">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setForm({...form, mood: n})}
                  className="w-12 h-12 rounded-full text-xl border-2 transition-all"
                  style={{borderColor: form.mood === n ? '#7c9e6e' : '#e8d9c8', background: form.mood === n ? '#e8f5e3' : '#ffffff'}}>
                  {['😢','😕','😐','🙂','😊'][n-1]}
                </button>
              ))}
            </div>
          </div>

          {/* Pain */}
          <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <h3 className="font-medium mb-3" style={{color: '#2d2416'}}>Pain level (0–10): <span style={{color: '#c4845a'}}>{form.pain_level}</span></h3>
            <input type="range" min="0" max="10" value={form.pain_level}
              onChange={e => setForm({...form, pain_level: parseInt(e.target.value)})}
              className="w-full accent-orange-400"/>
            <div className="flex justify-between text-xs mt-1" style={{color: '#9a7f60'}}>
              <span>No pain</span><span>Severe</span>
            </div>
          </div>

          {/* Bleeding */}
          <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <h3 className="font-medium mb-3" style={{color: '#2d2416'}}>Bleeding</h3>
            <div className="flex gap-2">
              {['none','light','moderate','heavy'].map(b => (
                <button key={b} onClick={() => setForm({...form, bleeding: b})}
                  className="px-4 py-2 rounded-lg text-sm font-medium border capitalize transition-all"
                  style={form.bleeding === b ? {background: '#7c9e6e', color: '#ffffff', borderColor: '#7c9e6e'} : {background: '#ffffff', color: '#5c4a2a', borderColor: '#e8d9c8'}}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Sleep */}
          <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <h3 className="font-medium mb-3" style={{color: '#2d2416'}}>Sleep hours: <span style={{color: '#c4845a'}}>{form.sleep_hours}h</span></h3>
            <input type="range" min="0" max="12" value={form.sleep_hours}
              onChange={e => setForm({...form, sleep_hours: parseInt(e.target.value)})}
              className="w-full accent-orange-400"/>
          </div>

          {/* Concerns */}
          <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <h3 className="font-medium mb-3" style={{color: '#2d2416'}}>Any concerns?</h3>
            <div className="space-y-3">
              {[
                { key: 'wound_concern', label: 'Wound or incision concern' },
                { key: 'feeding_concerns', label: 'Feeding concerns' },
                { key: 'medication_taken', label: 'Medication taken today' },
              ].map(item => (
                <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form[item.key]}
                    onChange={e => setForm({...form, [item.key]: e.target.checked})}
                    className="w-4 h-4"/>
                  <span style={{color: '#5c4a2a'}}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <h3 className="font-medium mb-3" style={{color: '#2d2416'}}>Additional notes</h3>
            <textarea rows={3} placeholder="Anything else to share..."
              value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
              className="w-full rounded-lg p-3 text-sm outline-none resize-none"
              style={{border: '1px solid #e8d9c8', color: '#2d2416', background: '#fdf8f3'}}/>
          </div>

          <button className="w-full py-3 rounded-xl font-medium text-white transition-colors"
            style={{background: '#7c9e6e'}}>
            Submit Check-in
          </button>
        </div>
      </main>
    </div>
  )
}