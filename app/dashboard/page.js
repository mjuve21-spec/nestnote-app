'use client'
import { Users, AlertTriangle, CheckSquare, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{background: '#fdf8f3'}}>
      <nav style={{background: '#7c9e6e'}} className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪺</span>
          <span className="font-bold text-xl text-white">NestNote</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-green-100">
          <a href="/dashboard" className="text-white font-semibold">Dashboard</a>
          <a href="/families" className="hover:text-white">Families</a>
          <a href="/reports" className="hover:text-white">Reports</a>
          <a href="/templates" className="hover:text-white">Templates</a>
          <a href="/settings" className="hover:text-white">Settings</a>
        </div>
      </nav>
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mt-2" style={{color: '#2d2416'}}>Good morning 👋</h1>
        <p className="mt-1 mb-6" style={{color: '#9a7f60'}}>Here's what needs your attention today.</p>
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl p-5 border" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <div className="flex items-center gap-3 mb-2">
              <Users style={{color: '#7c9e6e'}} size={20}/>
              <span className="text-sm" style={{color: '#9a7f60'}}>Active Families</span>
            </div>
            <p className="text-3xl font-bold" style={{color: '#2d2416'}}>4</p>
          </div>
          <div className="rounded-xl p-5 border" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle style={{color: '#c0392b'}} size={20}/>
              <span className="text-sm" style={{color: '#9a7f60'}}>Flagged</span>
            </div>
            <p className="text-3xl font-bold" style={{color: '#2d2416'}}>1</p>
          </div>
          <div className="rounded-xl p-5 border" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <div className="flex items-center gap-3 mb-2">
              <CheckSquare style={{color: '#7c9e6e'}} size={20}/>
              <span className="text-sm" style={{color: '#9a7f60'}}>Check-ins Today</span>
            </div>
            <p className="text-3xl font-bold" style={{color: '#2d2416'}}>3</p>
          </div>
          <div className="rounded-xl p-5 border" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp style={{color: '#c4845a'}} size={20}/>
              <span className="text-sm" style={{color: '#9a7f60'}}>Tasks Due</span>
            </div>
            <p className="text-3xl font-bold" style={{color: '#2d2416'}}>7</p>
          </div>
        </div>
        <div className="rounded-xl border p-5" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <h2 className="font-semibold mb-4" style={{color: '#2d2416'}}>Active Families</h2>
          <div className="space-y-3">
            {[
              { name: 'Maria Santos', week: 3, status: 'flagged', site: 'Downtown Clinic' },
              { name: 'Jessica Lee', week: 7, status: 'active', site: 'Westside OB' },
              { name: 'Amara Osei', week: 11, status: 'active', site: 'Downtown Clinic' },
              { name: 'Taylor Brown', week: 1, status: 'active', site: 'Midwifery Center' },
            ].map((f) => (
              <div key={f.name} className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:opacity-80" style={{background: '#fdf8f3'}}>
                <div>
                  <p className="font-medium" style={{color: '#2d2416'}}>{f.name}</p>
                  <p className="text-sm" style={{color: '#9a7f60'}}>{f.site} · Week {f.week}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={f.status === 'flagged' ? {background: '#fde8e8', color: '#c0392b'} : {background: '#e8f5e3', color: '#7c9e6e'}}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}