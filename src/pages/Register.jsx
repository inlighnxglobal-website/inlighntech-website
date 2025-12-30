import { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        collegeName: '',
        userType: '',
        graduationYear: '',
        state: '',
        acknowledgment: false,
        internshipType: '', // 'data_analyst' or 'data_science'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert("Application Submitted Successfully!");
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    collegeName: '',
                    userType: '',
                    graduationYear: '',
                    state: '',
                    acknowledgment: false,
                    internshipType: '',
                });
            } else {
                alert(`Submission Failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f4f8] py-10 px-5 flex justify-center items-start font-sans mt-20">
            <div className="bg-white rounded-lg shadow-sm w-full max-w-2xl overflow-hidden">
                <div className="bg-[#1a3c6e] p-6 text-center">
                    <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">Join Our Internship Program!</h1>
                </div>
                <div className="p-6 sm:p-10 pt-6">
                    <p className="text-center text-gray-500 text-base mb-8 border-b border-gray-100 pb-5">
                        Fill out the form below to apply for our internship program.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                            <label htmlFor="fullName" className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm outline-none bg-[#fcfcfc] focus:border-[#80bdff] focus:ring-[0.2rem] focus:ring-[rgba(0,123,255,0.25)]"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                            <label htmlFor="email" className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0">
                                Email Address:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm outline-none bg-[#fcfcfc] focus:border-[#80bdff] focus:ring-[0.2rem] focus:ring-[rgba(0,123,255,0.25)]"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                            <label htmlFor="phone" className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0">
                                Phone Number:
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm outline-none bg-[#fcfcfc] focus:border-[#80bdff] focus:ring-[0.2rem] focus:ring-[rgba(0,123,255,0.25)]"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                            <label htmlFor="state" className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0">
                                State: <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm outline-none bg-[#fcfcfc] focus:border-[#80bdff] focus:ring-[0.2rem] focus:ring-[rgba(0,123,255,0.25)]"
                            >
                                <option value="">Choose</option>
                                {[
                                    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
                                    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                                    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
                                    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
                                    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
                                ].map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-5 pt-2">
                            <label className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0 pt-0">
                                You are: <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col gap-2.5">
                                {['Student', 'Fresher', 'Working Professional'].map((type) => (
                                    <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value={type}
                                            checked={formData.userType === type}
                                            onChange={handleChange}
                                            className="w-5 h-5 cursor-pointer accent-[#1a3c6e]"
                                        />
                                        <span className="text-[15px] text-gray-800 font-medium">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {formData.userType === 'Student' && (
                            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-5 pt-2">
                                <label className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0 pt-0">
                                    Graduation Year:
                                </label>
                                <div className="flex flex-col gap-2.5">
                                    {['1', '2', '3', '4'].map((year) => (
                                        <label key={year} className="flex items-center gap-2.5 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="graduationYear"
                                                value={year}
                                                checked={formData.graduationYear === year}
                                                onChange={handleChange}
                                                className="w-5 h-5 cursor-pointer accent-[#1a3c6e]"
                                            />
                                            <span className="text-[15px] text-gray-800 font-medium">{year}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                            <label htmlFor="collegeName" className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0">
                                College/University Name:
                            </label>
                            <input
                                type="text"
                                id="collegeName"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleChange}
                                placeholder="Enter your college or university name"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm outline-none bg-[#fcfcfc] focus:border-[#80bdff] focus:ring-[0.2rem] focus:ring-[rgba(0,123,255,0.25)]"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-5 pt-2">
                            <label className="w-full sm:w-[120px] text-left sm:text-right font-semibold text-gray-800 text-sm shrink-0 pt-0">
                                Which position are you interested in?: <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col gap-2.5">
                                {[
                                    { id: 'cyber_security', label: 'Cyber Security Intern' },
                                    { id: 'ethical_hacking', label: 'Ethical Hacking Internship' },
                                    { id: 'ai_ml', label: 'AI & Machine Learning Intern' },
                                    { id: 'data_analyst', label: 'Data Analyst Intern' },
                                    { id: 'data_science', label: 'Data Science Intern' },
                                    { id: 'full_stack', label: 'Full Stack Developer Intern' },
                                    { id: 'web_dev', label: 'Web Developer Intern' },
                                    { id: 'frontend_dev', label: 'front-end developer Intern' },
                                    { id: 'business_analyst', label: 'Business Analyst Intern' }
                                ].map((option) => (
                                    <label key={option.id} className="flex items-center gap-2.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="internshipType"
                                            value={option.id}
                                            checked={formData.internshipType === option.id}
                                            onChange={handleChange}
                                            className="w-5 h-5 cursor-pointer accent-[#1a3c6e]"
                                        />
                                        <span className="text-[15px] text-gray-800 font-medium">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-200 my-5"></div>

                        <div className="text-center py-2">
                            <h3 className="text-[#2e7d32] text-xl font-bold mb-4 flex items-center justify-center gap-1.5">
                                Join Our WhatsApp Group
                            </h3>
                            <p className="text-gray-800 text-sm mb-5 leading-relaxed">
                                Stay connected with us! Please join our mandatory WhatsApp group for important updates.
                            </p>

                            <a
                                href="https://chat.whatsapp.com/FcNW7pSEimI2kF9vs4E7oq"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'white' }}
                                className="inline-flex items-center gap-2.5 bg-gradient-to-b from-[#4caf50] to-[#43a047] text-white py-3 px-8 rounded font-semibold text-base shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform mb-5"
                            >
                                <span className="text-xl">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </span> Join WhatsApp Group
                            </a>

                            <p className="text-[13px] text-gray-500 mb-1.5">Click the link below to join our WhatsApp Group:</p>
                            <div className="bg-[#f9f9f9] border border-gray-200 p-2.5 inline-block rounded w-full max-w-[500px]">
                                <a
                                    href="https://chat.whatsapp.com/FcNW7pSEimI2kF9vs4E7oq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1a3c6e] underline text-sm break-all"
                                >
                                    https://chat.whatsapp.com/FcNW7pSEimI2kF9vs4E7oq
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 pt-2">
                            <p className="text-[15px] text-gray-800 leading-relaxed">
                                I acknowledge and agree to receive communication from Inlighn Tech related to
                                my query via WhatsApp, phone calls, SMS, email, and RCS messaging. <span className="text-red-500">*</span>
                            </p>
                            <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="acknowledgment"
                                    checked={formData.acknowledgment === true}
                                    onChange={(e) => setFormData({ ...formData, acknowledgment: e.target.checked })}
                                    required
                                    className="w-5 h-5 cursor-pointer accent-[#1a3c6e]"
                                />
                                <span className="text-[15px] text-gray-800 font-medium">Acknowledge</span>
                            </label>
                        </div>

                        <div className="h-px bg-gray-200 my-5"></div>

                        <button
                            type="submit"
                            className="w-full max-w-[400px] mx-auto bg-[#2c5282] text-white p-3.5 rounded text-base font-bold uppercase cursor-pointer shadow-sm hover:bg-[#1a3c6e] transition-colors"
                        >
                            SUBMIT APPLICATION
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
