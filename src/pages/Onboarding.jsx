import React, { useState } from 'react';
import { FaLock, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: '',
    state: '',
    role: '',
    verified: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('https://chat.whatsapp.com/FOQ0mur19NsKHjR5907WMb');

  React.useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/onboarding/whatsapp-link`);
        const data = await response.json();
        if (data.success) {
          setWhatsappLink(data.link);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp link:', error);
      }
    };
    fetchLink();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Filter phone to only allow digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    if (formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert('Failed to submit application: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans pt-24 pb-12">
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[800px] overflow-hidden flex flex-col transform transition-all">
        {/* Header - Navy Blue */}
        <div className="bg-[#1e3a8a] text-white px-8 py-6 flex justify-between items-start relative overflow-hidden">
          {/* Subtle background pattern in header */}
          <div className="absolute -right-4 -bottom-12 opacity-10">
            <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="bg-white/20 p-1.5 rounded-xl border border-white/30 backdrop-blur-sm">
              {/* Logo icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-white/50 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-[22px] font-bold tracking-tight">Internship Onboarding</h2>
              <p className="text-white/90 text-[13px] font-medium mt-0.5">UM Live Project Internship Selection • Career Portal</p>
            </div>
          </div>
          
          <div className="relative z-10 mt-2">
            <span className="border border-white/40 text-white text-[11px] px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider">
              Official Document
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#333]">Contact Information</h3>
                <p className="text-gray-500 text-[14px] mt-1.5">Please fill out the details as per your academic records.</p>
                <div className="h-1 w-16 bg-[#1e3a8a] mt-3 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="block text-[13px] font-bold text-[#333] uppercase tracking-wide">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-colors text-[15px] placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[13px] font-bold text-[#333] uppercase tracking-wide">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-colors text-[15px] placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-[13px] font-bold text-[#333] uppercase tracking-wide">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      pattern="\d*"
                      title="Please enter only numbers"
                      placeholder="Phone number" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-colors text-[15px] placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[13px] font-bold text-[#333] uppercase tracking-wide">
                      Internship Domain <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="domain"
                      required
                      placeholder="e.g. Web Development" 
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-colors text-[15px] placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[13px] font-bold text-[#333] uppercase tracking-wide">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="state"
                      required
                      placeholder="Your State" 
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-colors text-[15px] placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-[13px] font-bold text-[#333] uppercase tracking-wide">
                    You are <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2">
                    {['Student', 'Fresher', 'Working Professional'].map((roleOption) => (
                      <label key={roleOption} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="role"
                          value={roleOption}
                          required
                          checked={formData.role === roleOption}
                          onChange={handleChange}
                          className="w-[18px] h-[18px] text-[#1e3a8a] border-gray-300 focus:ring-[#1e3a8a] cursor-pointer"
                        />
                        <span className="text-gray-700 text-[14.5px] group-hover:text-[#1e3a8a] transition-colors">{roleOption}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-start pt-1">
                      <input 
                        type="checkbox" 
                        name="verified"
                        required
                        checked={formData.verified}
                        onChange={handleChange}
                        className="w-[18px] h-[18px] rounded-[4px] border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a] cursor-pointer mt-0.5"
                      />
                    </div>
                    <span className="text-gray-600 text-[14.5px] leading-[1.6]">
                      <span className="text-red-500 font-bold mr-1">*</span> 
                      I verify that the information provided is accurate and I agree to receive official communications from <span className="font-semibold italic text-[#333]">UM Base Project</span> regarding my application.
                    </span>
                  </label>
                </div>

                <div className="border-t border-gray-100 pt-8 mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <button 
                    type="submit" 
                    className="bg-[#1e3a8a] hover:bg-[#172554] text-white text-[15px] font-bold py-3.5 px-8 rounded-lg shadow-md shadow-[#1e3a8a]/20 transition-colors w-full md:w-auto text-center"
                  >
                    Submit Application
                  </button>
                  
                  <div className="flex items-center justify-center md:justify-end text-gray-400 text-[13px] gap-2 font-medium">
                    <FaLock className="text-gray-400 mb-0.5" />
                    <span>Secure SSL Encrypted Form</span>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="py-16 flex flex-col items-center text-center px-4">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <FaCheckCircle className="text-5xl text-green-500" />
              </div>
              <h3 className="text-[28px] font-bold text-[#1e3a8a] mb-4">Application Submitted!</h3>
              <p className="text-gray-600 text-lg mb-10 max-w-[500px] leading-relaxed">
                Thank you for applying. To receive further updates and connect with other participants, please join our official WhatsApp group.
              </p>
              
              <div className="w-full max-w-[400px] space-y-4">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] !text-white text-[17px] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-[#25D366]/20 group"
                >
                  <FaWhatsapp className="text-2xl group-hover:rotate-12 transition-transform" />
                  Join WhatsApp Community
                </a>
                
                <div className="mt-6 p-5 bg-amber-50/50 border border-amber-100 rounded-2xl text-left shadow-sm">
                  <p className="text-red-700 font-bold text-[15px] mb-2">
                    📢 Mandatory to Join WhatsApp Group 📲
                  </p>
                  <p className="text-gray-600 text-[13px] font-medium leading-relaxed">
                    🔔 Note: All important announcements and updates will be shared only on the group.
                  </p>
                </div>
              </div>
              
              <p className="mt-8 text-gray-400 text-sm italic">
                A confirmation email will also be sent to you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
