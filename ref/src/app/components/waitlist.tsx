import React, { useState } from 'react';

export default function Waitlist() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Please fill the correct details';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    
    const requestBody = {
      name: form.name,
      email: form.email,
    };
    console.log('Submitting waitlist request:', requestBody);
    
    try {
      const apiUrl = '/api/waitlist';
      console.log('Sending request to:', apiUrl);
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      });
      
      console.log('Response status:', res.status);
      
      const rawText = await res.text();
      console.log('Raw response:', rawText);
      
      let data;
      try {
        data = rawText ? JSON.parse(rawText) : {};
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        data = {};
      }
      
      if (res.ok) {
        setSuccess('Thanks for joining waitlist');
        setForm({ name: '', email: '' });
        setTimeout(() => setModalOpen(false), 1500);
      } else {
        const errorMessage = data?.error || 'Submission failed. Please try again.';
        console.error('API error:', errorMessage);
        setSuccess(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccess(`Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-[307px] py-12 bg-black">
      {/* Blended Ellipse Background */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          width: '100%',
          height: '420px',
          background: 'radial-gradient(ellipse at center, rgba(39,0,225,0.22) 0%, rgba(39,0,225,0.10) 55%, rgba(0,0,0,0.0) 100%)',
          borderRadius: '50% / 50%',
        }}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
          We'd be excited to share more about<br />our product
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold text-base sm:text-lg px-6 sm:px-10 py-2 sm:py-3 rounded-full transition"
            onClick={() => setModalOpen(true)}
          >
            Join The Waitlist
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-base sm:text-lg px-6 sm:px-10 py-2 sm:py-3 rounded-full transition"
          onClick={() => {
            window.open('https://youtu.be/RPKQoFtLVS4?si=ehF4wgrFnjrDxrMz', '_blank');
          }}>
            Product Walkthrough
          </button>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadein">
          <div className="relative bg-[#181A2A] rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[90vw] sm:max-w-md md:max-w-lg mx-2 sm:mx-4 animate-popin overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <h3 className="text-white text-xl font-bold mb-4 text-center">Join the Waitlist</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-3 rounded border border-gray-600 bg-[#23244a] text-white placeholder-gray-400 focus:outline-none focus:ring"
                  disabled={loading}
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </div>
              <div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 rounded border border-gray-600 bg-[#23244a] text-white placeholder-gray-400 focus:outline-none focus:ring"
                  disabled={loading}
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold text-lg hover:bg-blue-800 transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Joining...' : 'Join'}
              </button>
              {success && <div className="text-center text-green-400 text-sm mt-2">{success}</div>}
            </form>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes popin {
          0% { transform: scale(0.8) translateY(40px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-popin {
          animation: popin 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes fadein {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadein {
          animation: fadein 0.25s ease;
        }
      `}</style>
    </div>
  );
}