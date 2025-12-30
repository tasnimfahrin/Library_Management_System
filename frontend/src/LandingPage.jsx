import { BookOpen, Users, ShieldCheck, GraduationCap, Search, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import seImg from '/LandingImage/se.jpg';
import algoImg from '/LandingImage/algo.jpg';
import mathImg from '/LandingImage/math.jpg';

const LandingPage = () => {
const navigate = useNavigate();

const roles = [
  { title: "Admin", desc: "Full control & analytics", icon: <ShieldCheck className="w-8 h-8 text-[#D4A373]" /> },
  { title: "Librarian", desc: "Inventory & book logs", icon: <BookOpen className="w-8 h-8 text-[#A67C52]" /> },
  { title: "Teacher", desc: "Resource management", icon: <Users className="w-8 h-8 text-[#8B5E3C]" /> },
  { title: "Student", desc: "Borrow & search library", icon: <GraduationCap className="w-8 h-8 text-[#6F4E37]" /> }
];

const featuredBooks = [
  { t: "Software Engineering", a: "Roger S. Pressman", img: seImg },
  { t: "Introduction to Algorithms", a: "Thomas H. Cormen", img: algoImg },
  { t: "Discrete Mathematics", a: "Kenneth H. Rosen", img: mathImg }
];

return (
<div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] font-sans selection:bg-[#3D2616]">
<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md px-6 md:px-12 py-5 flex justify-between items-center">
  <h1 className="text-2xl font-black tracking-tighter text-white">LMS <span className="text-[#A67C52]">PRO</span></h1>
  <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-bold text-gray-500">
    <button type="button" onClick={() => navigate('/catalog')} className="hover:text-[#A67C52] transition-colors cursor-pointer">
      Catalog
  </button>
  <button type="button" className="hover:text-[#A67C52] transition-colors cursor-pointer">Members</button>
  <button type="button" className="hover:text-[#A67C52] transition-colors cursor-pointer">Archive</button>
</div>
<div className="flex items-center gap-6">
  <button type="button" onClick={() => navigate('/login')} className="text-sm font-bold hover:text-[#A67C52] transition-all cursor-pointer">SIGN IN</button>
    <button type="button" onClick={() => navigate('/register')} className="px-5 py-2.5 rounded-full bg-[#2D1B10] border border-[#4A2C2A] text-[#D4A373] text-sm font-bold hover:bg-[#3D2616] transition-all cursor-pointer">
      GET STARTED
  </button>
</div>
</nav>

<header className="relative pt-48 pb-32 px-6 text-center">
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-[#2D1B10]/30 blur-[120px] rounded-full" />
    <h2 className="relative text-5xl md:text-8xl font-serif italic mb-8 leading-tight text-white">
      Curating the <br />
    <span className="text-[#A67C52]">Future of Learning</span>
    </h2>
        
  <div className="relative max-w-2xl mx-auto flex items-center bg-[#111] border border-white/10 p-1.5 rounded-2xl shadow-2xl mt-10">
    <Search className="ml-4 text-gray-600 w-5 h-5" />
      <input type="text" placeholder="Search by title, author or ISBN..." className="w-full bg-transparent p-4 outline-none text-sm text-gray-300" />
      <button type="button" className="bg-[#A67C52] text-black px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#D4A373] transition-all cursor-pointer">Search</button>
  </div>
</header>
<section className="max-w-7xl mx-auto px-6 py-20">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{roles.map((role, i) => (<div key={i} onClick={() => navigate('/login', { state: { selectedRole: role.title } })}
className="p-10 bg-[#0F0F0F] border border-white/5 rounded-[2.5rem] hover:bg-[#1A110B] hover:border-[#2D1B10] transition-all duration-500 group cursor-pointer shadow-lg">
  <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-[#2D1B10]/20 transition-all">{role.icon}</div>
    <h3 className="text-xl font-bold mb-3 text-white">{role.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{role.desc}</p>
  </div>
))}
</div>
</section>

<section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
  <div className="flex justify-between items-center mb-16">
    <h3 className="text-3xl font-serif italic text-white">Current Exhibits</h3>
      <div className="h-px grow mx-10 bg-white/10 hidden md:block" />
      <button type="button" onClick={() => navigate('/catalog')}className="text-[#A67C52] font-bold text-sm tracking-widest uppercase hover:underline flex items-center gap-2 cursor-pointer">
        View All <ArrowUpRight className="w-4 h-4" />
      </button>
  </div>
        
<div className="grid grid-cols-1 md:grid-cols-3 gap-16">
  {featuredBooks.map((book, i) => (
    <div key={i} className="group text-left">
      <div className="aspect-3/4 overflow-hidden rounded-2xl mb-8 bg-[#111] relative shadow-2xl">
        <img src={book.img} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={book.t} />
                <div className="absolute inset-0 bg-[#2D1B10]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-2xl font-bold mb-1 group-hover:text-[#A67C52] transition-colors">{book.t}</h4>
              <p className="text-gray-500 text-sm italic">{book.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;