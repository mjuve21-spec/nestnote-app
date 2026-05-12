'use client'
import { TrendingUp, Users, AlertTriangle, CheckSquare } from 'lucide-react'

export default function Reports() {
  const weeklyData = [
    { week: 'Week 1', checkins: 4, flagged: 1, tasks: 8 },
    { week: 'Week 2', checkins: 6, flagged: 0, tasks: 12 },
    { week: 'Week 3', checkins: 5, flagged: 2, tasks: 10 },
    { week: 'Week 4', checkins: 7, flagged: 1, tasks: 15 },
    { week: 'Week 5', checkins: 6, flagged: 0, tasks: 11 },
    { week: 'Week 6', checkins: 8, flagged: 1, tasks: 14 },
  ]

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
          <a href="/reports" className="text-white font-semibold">Reports</a>
          <a href="/templates" className="hover:text-white">Templates</a>
          <a href="/settings" className="hover:text-white">Settings</a>
        </div>
      </nav>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{color: '#2d2416'}}>Reports</h1>
          <p className="mt-1" style={{color: '#9a7f60'}}>Overview of care activity across all families</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Check-ins', value: '36', icon: <CheckSquare size={20}/>, color: '#7c9e6e' },
            { label: 'Families Served', value: '4', icon: <Users size={20}/>, color: '#7c9e6e' },
            { label: 'Flags Raised', value: '5', icon: <AlertTriangle size={20}/>, color: '#c0392b' },
            { label: 'Tasks Completed', value: '24', icon: <TrendingUp size={20}/>, color: '#c4845a' },
          ].map(card => (
            <div key={card.label} className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
              <div className="flex items-center gap-3 mb-2" style={{color: card.color}}>
                {card.icon}
                <span className="text-sm" style={{color: '#9a7f60'}}>{card.label}</span>
              </div>
              <p className="text-3xl font-bold" style={{color: '#2d2416'}}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Weekly Table */}
        <div className="rounded-xl border overflow-hidden mb-8" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <div className="p-5 border-b" style={{borderColor: '#e8d9c8'}}>
            <h2 className="font-semibold" style={{color: '#2d2416'}}>Weekly Activity</h2>
          </div>
          <table className="w-full">
            <thead className="text-xs uppercase" style={{background: '#f5ede3', color: '#9a7f60'}}>
              <tr>
                <th className="text-left px-4 py-3">Week</th>
                <th className="text-left px-4 py-3">Check-ins</th>
                <th className="text-left px-4 py-3">Flagged</th>
                <th className="text-left px-4 py-3">Tasks</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor: '#e8d9c8'}}>
              {weeklyData.map(row => (
                <tr key={row.week} style={{background: '#ffffff'}}>
                  <td className="px-4 py-4 font-medium" style={{color: '#2d2416'}}>{row.week}</td>
                  <td className="px-4 py-4" style={{color: '#5c4a2a'}}>{row.checkins}</td>
                  <td className="px-4 py-4">
                    <span style={row.flagged > 0 ? {color: '#c0392b'} : {color: '#7c9e6e'}}>
                      {row.flagged}
                    </span>
                  </td>
                  <td className="px-4 py-4" style={{color: '#5c4a2a'}}>{row.tasks}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-full font-medium"
                      style={row.flagged > 0 ? {background: '#fde8e8', color: '#c0392b'} : {background: '#e8f5e3', color: '#7c9e6e'}}>
                      {row.flagged > 0 ? 'needs attention' : 'on track'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Family Summary */}
        <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <h2 className="font-semibold mb-4" style={{color: '#2d2416'}}>Family Summary</h2>
          <div className="space-y-4">
            {[
              { name: 'Maria Santos', week: 3, checkins: 3, tasks: 5, mood: 2, status: 'flagged' },
              { name: 'Jessica Lee', week: 7, checkins: 7, tasks: 12, mood: 4, status: 'active' },
              { name: 'Amara Osei', week: 11, checkins: 11, tasks: 18, mood: 5, status: 'active' },
              { name: 'Taylor Brown', week: 1, checkins: 1, tasks: 3, mood: 3, status: 'active' },
            ].map(f => (
              <div key={f.name} className="flex items-center justify-between p-4 rounded-lg" style={{background: '#fdf8f3'}}>
                <div>
                  <p className="font-medium" style={{color: '#2d2416'}}>{f.name}</p>
                  <p className="text-sm" style={{color: '#9a7f60'}}>Week {f.week} · {f.checkins} check-ins · {f.tasks} tasks</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs" style={{color: '#9a7f60'}}>Avg Mood</p>
                    <p className="text-lg">{['😢','😕','😐','🙂','😊'][f.mood-1]}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={f.status === 'flagged' ? {background: '#fde8e8', color: '#c0392b'} : {background: '#e8f5e3', color: '#7c9e6e'}}>
                    {f.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}