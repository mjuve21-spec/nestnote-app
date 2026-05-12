'use client'

export default function Settings() {
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
          <a href="/settings" className="text-white font-semibold">Settings</a>
        </div>
      </nav>
      <main className="p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{color: '#2d2416'}}>Settings</h1>
          <p className="mt-1" style={{color: '#9a7f60'}}>Manage your clinic and account preferences</p>
        </div>

        {/* Clinic Info */}
        <div className="rounded-xl border p-5 mb-4" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <h2 className="font-semibold mb-4" style={{color: '#2d2416'}}>Clinic Information</h2>
          <div className="space-y-3">
            {[
              { label: 'Clinic Name', value: 'Downtown Clinic' },
              { label: 'Contact Email', value: 'admin@downtownclinic.com' },
              { label: 'Phone', value: '555-0100' },
            ].map(field => (
              <div key={field.label}>
                <label className="text-sm font-medium block mb-1" style={{color: '#5c4a2a'}}>{field.label}</label>
                <input defaultValue={field.value} className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{border: '1px solid #e8d9c8', background: '#fdf8f3', color: '#2d2416'}}/>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Settings */}
        <div className="rounded-xl border p-5 mb-4" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <h2 className="font-semibold mb-1" style={{color: '#2d2416'}}>SMS Check-in Settings</h2>
          <p className="text-sm mb-4" style={{color: '#9a7f60'}}>Configure automated SMS check-ins for families</p>
          <div className="space-y-3">
            {[
              { label: 'Check-in Frequency', value: 'Daily' },
              { label: 'Send Time', value: '9:00 AM' },
              { label: 'Twilio Phone Number', value: '+1 555 000 0000' },
            ].map(field => (
              <div key={field.label}>
                <label className="text-sm font-medium block mb-1" style={{color: '#5c4a2a'}}>{field.label}</label>
                <input defaultValue={field.value} className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{border: '1px solid #e8d9c8', background: '#fdf8f3', color: '#2d2416'}}/>
              </div>
            ))}
          </div>
        </div>

        {/* Escalation */}
        <div className="rounded-xl border p-5 mb-6" style={{background: '#ffffff', borderColor: '#e8d9c8'}}>
          <h2 className="font-semibold mb-1" style={{color: '#2d2416'}}>Escalation Thresholds</h2>
          <p className="text-sm mb-4" style={{color: '#9a7f60'}}>Auto-flag check-ins that exceed these thresholds</p>
          <div className="space-y-3">
            {[
              { label: 'Mood Score (flag if below)', value: '2' },
              { label: 'Pain Level (flag if above)', value: '7' },
              { label: 'Bleeding (flag if)', value: 'Heavy' },
            ].map(field => (
              <div key={field.label}>
                <label className="text-sm font-medium block mb-1" style={{color: '#5c4a2a'}}>{field.label}</label>
                <input defaultValue={field.value} className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{border: '1px solid #e8d9c8', background: '#fdf8f3', color: '#2d2416'}}/>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-3 rounded-xl font-medium text-white" style={{background: '#7c9e6e'}}>
          Save Settings
        </button>
      </main>
    </div>
  )
}