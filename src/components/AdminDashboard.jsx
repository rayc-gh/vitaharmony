import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('crm');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4A5D4E] text-white p-8 hidden md:flex flex-col">
        <div className="mb-10">
          <div className="text-xl font-serif font-bold">元和堂 Admin</div>
          <p className="text-[10px] uppercase opacity-50 tracking-widest">Clinic Operations</p>
        </div>
        
        <nav className="space-y-2 flex-1">
          {['crm', 'appointments', 'emr', 'staff'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white/10 text-[#C5A059]' : 'text-white/60 hover:text-white'}`}
            >
              {tab === 'crm' ? 'Patient Database' : tab}
            </button>
          ))}
        </nav>
        <a href="/" className="text-[10px] uppercase opacity-30 hover:opacity-100">Exit to Website</a>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif text-[#4A5D4E] capitalize">{activeTab} Management</h1>
          <div className="flex gap-4">
             <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-[10px] font-bold uppercase">Staff: Dr. Zhang</div>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              <tr>
                <th className="p-6">Patient Name</th>
                <th className="p-6">Contact</th>
                <th className="p-6">Last Visit</th>
                <th className="p-6">Status</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Tan Wei Ling', phone: '+65 9123 4567', last: '2 days ago', status: 'Follow-up' },
                { name: 'Siti Aminah', phone: '+65 8234 5678', last: 'Today', status: 'Arrived' },
              ].map((patient, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="p-6 font-bold">{patient.name}</td>
                  <td className="p-6 text-gray-500">{patient.phone}</td>
                  <td className="p-6 text-gray-500">{patient.last}</td>
                  <td className="p-6">
                    <span className="bg-[#C5A059]/10 text-[#C5A059] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-6"><button className="text-[#4A5D4E] font-bold text-xs underline">Open EMR</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}