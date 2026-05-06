import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. THIS CONNECTS THE COMPONENT TO YOUR SUPABASE KEYS
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [agreedPDPA, setAgreedPDPA] = useState(false);
  const [loading, setLoading] = useState(false);

  // 2. THIS STORES THE ACTUAL DATA TYPED BY THE PATIENT
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    treatment: 'General Consultation',
    appointment_date: 'May 10'
  });

  // 3. THE "BRAIN" FUNCTION THAT SAVES TO SUPABASE
  const handleBooking = async () => {
    setLoading(true);
    console.log("Attempting to save:", formData);

    const { data, error } = await supabase
      .from('appointments')
      .insert([
        { 
          full_name: formData.full_name, 
          email: formData.email, 
          phone: formData.phone,
          treatment: formData.treatment,
          appointment_date: formData.appointment_date,
          pdpa_consent: agreedPDPA
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      alert("Error: " + error.message);
    } else {
      console.log("Success!");
      setStep(4); // Move to Success Screen ONLY if database save worked
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-[#4A5D4E]/10 max-w-2xl mx-auto">
      <div className="bg-[#4A5D4E] p-6 text-white flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest font-bold">Step {step} of 4</span>
      </div>

      <div className="p-10">
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="text-2xl font-serif mb-6 text-[#4A5D4E]">Select Treatment</h2>
            {['Acupuncture', 'Herbal Consultation', 'General Wellness'].map((t) => (
              <button 
                key={t} 
                onClick={() => { setFormData({...formData, treatment: t}); setStep(2); }} 
                className="w-full text-left p-6 border rounded-2xl hover:border-[#C5A059] transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif mb-6 text-[#4A5D4E]">Select Date</h2>
            <div className="grid grid-cols-4 gap-2">
               {[10, 11, 12, 13].map(d => (
                 <button key={d} onClick={() => { setFormData({...formData, appointment_date: `May ${d}`}); setStep(3); }} className="p-4 border rounded-xl hover:bg-gray-50">May {d}</button>
               ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif mb-6 text-[#4A5D4E]">Personal Details</h2>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="tel" 
              placeholder="WhatsApp Number" 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            
            <label className="flex gap-3 cursor-pointer p-4 bg-[#F9F8F4] rounded-xl border">
              <input type="checkbox" checked={agreedPDPA} onChange={(e) => setAgreedPDPA(e.target.checked)} className="accent-[#4A5D4E]" />
              <span className="text-[10px] text-gray-500 uppercase">I agree to the Singapore PDPA and Liability Waiver.</span>
            </label>

            <button 
              disabled={!agreedPDPA || loading}
              onClick={handleBooking} 
              className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest ${agreedPDPA ? 'bg-[#C5A059] text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}
            >
              {loading ? "Saving to Database..." : "Confirm Appointment"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-2xl">✓</div>
            <h2 className="text-3xl font-serif mb-4 text-[#4A5D4E]">Booking Confirmed</h2>
            <p className="text-gray-500 mb-8">Your details are now saved in our clinical records.</p>
            <a href="/questionnaire" className="inline-block bg-[#C5A059] text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest">Start Health Form</a>
          </div>
        )}
      </div>
    </div>
  );
}