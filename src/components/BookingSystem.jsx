import React, { useState } from 'react';

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [agreedPDPA, setAgreedPDPA] = useState(false);
  const [isFirstTimer, setIsFirstTimer] = useState(true); // Default to true for demo

  const nextStep = () => setStep(step + 1);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-[#4A5D4E]/10 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-[#4A5D4E] p-6 text-white flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest font-bold">Step {step} of 4</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${step >= i ? 'bg-[#C5A059]' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>

      <div className="p-10">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-serif mb-6 text-[#4A5D4E]">Select Treatment</h2>
            <div className="space-y-3">
              {[
                { name: 'Acupuncture', price: '$120', dur: '60 min' },
                { name: 'Herbal Medicine Consultation', price: '$50', dur: '30 min' },
                { name: 'General Consultation', price: '$50', dur: '30 min' }
              ].map((s) => (
                <button key={s.name} onClick={nextStep} className="w-full flex justify-between items-center p-6 border rounded-2xl hover:border-[#C5A059] hover:bg-[#F9F8F4] transition-all group">
                  <div className="text-left">
                    <div className="font-bold text-[#4A5D4E]">{s.name}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">{s.dur}</div>
                  </div>
                  <div className="text-[#C5A059] font-bold">{s.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-serif mb-6 text-[#4A5D4E]">Choose Date & Time</h2>
            <div className="grid grid-cols-4 gap-2 mb-8">
              {[...Array(8)].map((_, i) => (
                <button key={i} className="p-4 border rounded-xl hover:bg-[#4A5D4E] hover:text-white transition-all">
                  <div className="text-[10px] uppercase opacity-60">May</div>
                  <div className="text-lg font-bold">{10 + i}</div>
                </button>
              ))}
            </div>
            <button onClick={nextStep} className="w-full bg-[#4A5D4E] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">Continue to Details</button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-serif mb-6 text-[#4A5D4E]">Personal Details</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#C5A059]" />
              <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#C5A059]" />
              <input type="tel" placeholder="Mobile Number (WhatsApp)" className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#C5A059]" />
              
              <div className="p-4 bg-[#F9F8F4] rounded-xl border border-[#4A5D4E]/5">
                <label className="flex gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={agreedPDPA} 
                    onChange={(e) => setAgreedPDPA(e.target.checked)} 
                    className="mt-1 accent-[#4A5D4E]" 
                  />
                  <span className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tight">
                    I acknowledge and agree to the <b>Singapore Personal Data Protection Act (PDPA)</b>. I consent to Vita Harmony TCM collecting and using my data for medical and booking purposes.
                  </span>
                </label>
              </div>

              <button 
                disabled={!agreedPDPA}
                onClick={nextStep} 
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${agreedPDPA ? 'bg-[#C5A059] text-white shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h2 className="text-3xl font-serif mb-4 text-[#4A5D4E]">Booking Confirmed</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">We've sent a confirmation to your WhatsApp and Email.</p>
            
            {isFirstTimer && (
              <div className="bg-[#C5A059]/10 p-6 rounded-2xl border border-[#C5A059]/20">
                <p className="text-[#C5A059] text-sm font-bold mb-4">FIRST-TIME PATIENT REQUIRED:</p>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">To save time during your visit, please complete your health questionnaire now.</p>
                <a href="/questionnaire" className="inline-block w-full bg-[#C5A059] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">Start Questionnaire</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}