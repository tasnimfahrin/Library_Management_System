import { useState } from 'react';
import { Book, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const selectedRole = location.state?.selectedRole || "Student";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost/library-management/backend/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          role: selectedRole
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role === "Admin" || data.user.role === "Librarian") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        alert(data.message || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Connection failed! Make sure XAMPP is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#121212] border border-white/5 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 bg-[#c5a059]/10 rounded-2xl mb-5">
            {selectedRole === "Librarian" || selectedRole === "Admin" ? (
              <ShieldCheck className="text-[#c5a059]" size={42} />
            ) : (
              <Book className="text-[#c5a059]" size={42} />
            )}
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            {selectedRole} <span className="text-[#c5a059]">Login</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#c5a059] transition-colors" size={18} />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#c5a059]/50 transition-all" placeholder="Enter Email" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#c5a059] transition-colors" size={18} />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#c5a059]/50 transition-all" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#c5a059] hover:bg-[#e2c286] text-black font-black py-4 rounded-2xl uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2">
            {loading ? "Authenticating..." : "Sign In Now"} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center relative z-10">
  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
    New Member? 
    <button 
      onClick={() => navigate('/register', { state: { selectedRole: selectedRole } })} 
      className="text-[#c5a059] ml-2 hover:text-white transition-colors"
    >
      CREATE ACCOUNT
    </button>
  </p>
</div>
      </div>
    </div>
  );
};

export default Login;