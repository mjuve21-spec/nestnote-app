'use client'
import { Plus, Search } from 'lucide-react'

export default function Families() {
  const families = [
    { name: 'Maria Santos', baby: 'Sofia', week: 3, status: 'flagged', site: 'Downtown Clinic', birth_type: 'cesarean', phone: '555-0101' },
    { name: 'Jessica Lee', baby: 'Noah', week: 7, status: 'active', site: 'Westside OB', birth_type: 'vaginal', phone: '555-0102' },
    { name: 'Amara Osei', baby: 'Kwame', week: 11, status: 'active', site: 'Downtown Clinic', birth_type: 'vaginal', phone: '555-0103' },
    { name: 'Taylor Brown', baby: 'Riley', week: 1, status: 'active', site: 'Midwifery Center', birth_type: 'vaginal', phone: '555-0104' },
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
          <a href="/families" className="text-white font-semibold">Families</a>
          <a href="/reports" className="hover:text-white">Reports</a>
          <a href="/templates" className="hover:text-white">Templates</a>
          <a href="/settings" className="hover:text-white">Settings</a>
        </div>
      </nav>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{color: '#2d2416'}}>Families</h1>
            <p className="mt-1" style={{color: '#9a7f60'}}>4 active families across 3 sites</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{background: '#c4845a'}}>
            <Plus size={16}/> Add Family
          </button>
        </div>
        <div className="rounded-xl border overflow-hidden" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <div className="p-4 border-b" style={{borderColor: '#e8d9c8'}}>
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 w-72" style={{background: '#fdf8f3'}}>
              <Search size={16} style={{color: '#9a7f60'}}/>
              <input placeholder="Search families..." className="bg-transparent text-sm outline-none w-full" style={{color: '#2d2416'}}/>
            </div>
          </div>
          <table className="w-full">
            <thead className="text-xs uppercase" style={{background: '#f5ede3', color: '#9a7f60'}}>
              <tr>
                <th className="text-left px-4 py-3">Family</th>
                <th className="text-left px-4 py-3">Baby</th>
                <th className="text-left px-4 py-3">Week</th>
                <th className="text-left px-4 py-3">Birth Type</th>
                <th className="text-left px-4 py-3">Site</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor: '#e8d9c8'}}>
              {families.map((f) => (
                <tr key={f.name} className="cursor-pointer hover:opacity-80" style={{background: '#ffffff'}}>
                  <td className="px-4 py-4">
                    <p className="font-medium" style={{color: '#2d2416'}}>{f.name}</p>
                    <p className="text-xs" style={{color: '#9a7f60'}}>{f.phone}</p>
                  </td>
                  <td className="px-4 py-4" style={{color: '#5c4a2a'}}>{f.baby}</td>
                  <td className="px-4 py-4" style={{color: '#5c4a2a'}}>Week {f.week}</td>
                  <td className="px-4 py-4 capitalize" style={{color: '#5c4a2a'}}>{f.birth_type}</td>
                  <td className="px-4 py-4" style={{color: '#5c4a2a'}}>{f.site}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={f.status === 'flagged' ? {background: '#fde8e8', color: '#c0392b'} : {background: '#e8f5e3', color: '#7c9e6e'}}>
                      {f.status}
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