import { useState } from 'react';
import { Book, User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
const navigate = useNavigate();
const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
});

const handleSubmit = async (e) => {
  e.preventDefault();
    
  try {
    const response = await fetch("http://localhost/library-management/backend/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
  });

const text = await response.text();
      
try {
  const data = JSON.parse(text);
  if (data.success) {
    alert(data.message);
      navigate('/login');
  } else {
  alert(data.message || "Registration failed");
}
} catch (err) {
    console.error("Parsing error:", err);
    alert("Server error, please try again.");
}

} catch (error) {
  console.error("Network Error:", error);
      alert("Cannot connect to server. Is XAMPP running?");
    }
};

return (
<div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 font-sans">
  <div className="w-full max-w-md bg-[#121212] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#c5a059]/5 blur-[80px] rounded-full"></div>

    <div className="flex flex-col items-center mb-8 relative z-10">
      <div className="p-4 bg-[#c5a059]/10 rounded-2xl mb-4 border border-[#c5a059]/20">
        <Book className="text-[#c5a059]" size={40} />
      </div>
    <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
      Create <span className="text-[#c5a059]">Account</span>
    </h2>
    <p className="text-gray-500 mt-2 text-xs font-bold uppercase tracking-widest">Join LMS PRO System</p>
</div>

<form onSubmit={handleSubmit} className="space-y-5 relative z-10">
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
      <div className="relative group">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#c5a059] transition-colors" size={18} />
          <input type="text" required value={formData.name}onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Enter Full Name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#c5a059]/50 outline-none transition-all placeholder:text-gray-700"/>
      </div>
  </div>

<div className="space-y-2">
  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Select Role</label>
    <div className="relative group">
      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#c5a059] transition-colors" size={18} />
        <select 
            value={formData.role}onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#c5a059]/50 outline-none transition-all appearance-none cursor-pointer">
                <option value="Student" className="bg-[#121212]">Student</option>
                <option value="Librarian" className="bg-[#121212]">Librarian</option>
                <option value="Teacher" className="bg-[#121212]">Teacher</option>
        </select>
</div>
    </div>

<div className="space-y-2">
<label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
  <div className="relative group">
    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#c5a059] transition-colors" size={18} />
      <input type="email" required value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="email@example.com"className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#c5a059]/50 outline-none transition-all placeholder:text-gray-700"/>
  </div>
</div>

<div className="space-y-2">
<label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Secure Password</label>
  <div className="relative group">
    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#c5a059] transition-colors" size={18} />
      <input type="password" required 
        value={formData.password}onChange={(e) => setFormData({...formData, password: e.target.value})}placeholder="••••••••"className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#c5a059]/50 outline-none transition-all placeholder:text-gray-700"/>
  </div>
</div>

  <button type="submit" className="w-full bg-[#c5a059] hover:bg-[#e2c286] text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 uppercase tracking-widest mt-4">
    Create Account <ArrowRight size={20} />
  </button>
</form>

<div className="mt-8 text-center relative z-10"><p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
    Already have an account? 
  <button onClick={() => navigate('/login', { state: { selectedRole: formData.role } })} className="text-[#c5a059] ml-2 hover:text-white transition-colors underline underline-offset-4">
      Login here
  </button>
  </p>
</div>
      </div>
    </div>
  );
};

export default Register;