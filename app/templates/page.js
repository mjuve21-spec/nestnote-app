'use client'
import { Plus } from 'lucide-react'

export default function Templates() {
  const templates = [
    { title: 'Mood Check', category: 'self_care', week: 1, assigned_to: 'family', birth_types: 'all' },
    { title: 'Schedule Lactation Consultation', category: 'lactation', week: 1, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Wound Check Photo', category: 'wound_care', week: 1, assigned_to: 'family', birth_types: 'cesarean' },
    { title: 'Newborn Weight Check', category: 'newborn_milestone', week: 2, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Submit Birth Certificate Paperwork', category: 'paperwork', week: 2, assigned_to: 'family', birth_types: 'all' },
    { title: '3-Week Postpartum Visit', category: 'appointment', week: 3, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Edinburgh Depression Screening', category: 'medical', week: 4, assigned_to: 'care_team', birth_types: 'all' },
    { title: 'Review Contraception Options', category: 'medical', week: 6, assigned_to: 'care_team', birth_types: 'all' },
    { title: '12-Week Final Visit', category: 'appointment', week: 12, assigned_to: 'care_team', birth_types: 'all' },
  ]

  const categoryColors = {
    self_care: { bg: '#e8f5e3', color: '#7c9e6e' },
    lactation: { bg: '#fef3e2', color: '#c4845a' },
    wound_care: { bg: '#fde8e8', color: '#c0392b' },
    newborn_milestone: { bg: '#e8f0fe', color: '#4a6fa5' },
    paperwork: { bg: '#f5ede3', color: '#9a7f60' },
    appointment: { bg: '#f3e8fe', color: '#7c5cbf' },
    medical: { bg: '#fde8e8', color: '#c0392b' },
  }

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
          <a href="/templates" className="text-white font-semibold">Templates</a>
          <a href="/settings" className="hover:text-white">Settings</a>
        </div>
      </nav>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{color: '#2d2416'}}>Task Templates</h1>
            <p className="mt-1" style={{color: '#9a7f60'}}>12-week postpartum task library</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{background: '#c4845a'}}>
            <Plus size={16}/> New Template
          </button>
        </div>
        <div className="rounded-xl border overflow-hidden" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <table className="w-full">
            <thead className="text-xs uppercase" style={{background: '#f5ede3', color: '#9a7f60'}}>
              <tr>
                <th className="text-left px-4 py-3">Task</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Week</th>
                <th className="text-left px-4 py-3">Assigned To</th>
                <th className="text-left px-4 py-3">Birth Type</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor: '#e8d9c8'}}>
              {templates.map((t, i) => (
                <tr key={i} className="cursor-pointer hover:opacity-80" style={{background: '#ffffff'}}>
                  <td className="px-4 py-4 font-medium" style={{color: '#2d2416'}}>{t.title}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                      style={categoryColors[t.category] || {bg: '#f5ede3', color: '#9a7f60'}}>
                      {t.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4" style={{color: '#5c4a2a'}}>Week {t.week}</td>
                  <td className="px-4 py-4 capitalize" style={{color: '#5c4a2a'}}>{t.assigned_to.replace('_', ' ')}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                      style={t.birth_types === 'cesarean' ? {background: '#fde8e8', color: '#c0392b'} : {background: '#e8f5e3', color: '#7c9e6e'}}>
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
  )
}