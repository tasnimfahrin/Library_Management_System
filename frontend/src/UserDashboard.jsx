import { Book, LogOut, Clock, CheckCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [stats, setStats] = useState({ borrowed: 0, returned: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  const user = useMemo(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
}, []);

  const fetchBorrowedBooks = useCallback(async () => {
    if (!user?.user_id) return;
    try {
      const response = await fetch(`http://localhost/library-management/backend/api/get_user_borrowed_books.php?user_id=${user.user_id}`);
      const data = await response.json();
      if (data.success) {
        setBorrowedBooks(data.books || []);
        const returnedCount = (data.books || []).filter(book => book.status === 'Returned').length;
        setStats({
          borrowed: (data.books || []).length,
          returned: returnedCount 
        });
      }
    } catch (error) {
      console.error('Data loading error:', error); 
    } finally {
      setLoading(false);
    }
  }, [user?.user_id]);

  useEffect(() => {
    if (!user || !["Student", "Teacher"].includes(user.role)) {
      navigate('/login');
    } else { 
      fetchBorrowedBooks();
    }
  }, [user, navigate, fetchBorrowedBooks]);

  if (loading) {
    return <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center text-[#D4A373]">Loading...</div>;
  }

return (
<div className="min-h-screen bg-[#0A0D14] text-[#E5E7EB] flex flex-col md:flex-row font-sans">
  <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0D14] border-r border-gray-800 p-8 transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-3">
        <Book className="text-[#D4A373]" size={28} />
          <h2 className="text-2xl font-bold tracking-tighter text-white">LMS <span className="text-[#D4A373]">PRO</span></h2>
      </div>
  <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500"><X/></button>
  </div>
  <nav className="space-y-4">
<div className="p-4 bg-[#D4A373] text-black rounded-2xl font-bold flex items-center gap-3 shadow-lg">
  <Book size={20} /> <span className="text-xs uppercase tracking-widest">My Library</span>
</div>
  <button onClick={() => navigate('/catalog')} className="w-full p-4 text-gray-500 font-bold flex items-center gap-3 hover:text-[#D4A373] transition-all group">
    <ArrowUpRight size={20} /> <span className="text-xs uppercase tracking-widest">Browse Catalog</span>
  </button>
  <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); }} className="w-full p-4 text-red-500 font-bold flex items-center gap-3 hover:bg-red-500/5 rounded-2xl mt-20 transition-all">
    <LogOut size={20} /> <span className="text-xs uppercase tracking-widest">Sign Out</span>
    </button>
</nav>
</aside>
<main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen bg-[#0A0D14]">
  <header className="flex justify-between items-center mb-12">
    <div className="flex items-center gap-4">
      <img src={`/Profiles/${user?.profile_pic || 'default_user.png'}`} 
          className="w-16 h-16 rounded-2xl border-2 border-[#D4A373]/50 object-cover" 
              alt="User" />
      <div>
        <h2 className="text-3xl font-bold text-white">Welcome, <span className="text-[#D4A373]">{user?.name}</span></h2>
      <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">{user?.role} • {user?.email}</p>
</div>
</div>
<button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-[#D4A373]"><Menu size={28}/></button>
</header>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
  <div className="bg-[#121620] border border-gray-800 p-8 rounded-[2.5rem] group hover:border-[#D4A373]/30 transition-all">
    <Clock className="text-[#D4A373] mb-4 group-hover:scale-110 transition-transform" size={36} />
      <h4 className="text-5xl font-bold text-white">{stats.borrowed}</h4>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Total Borrowed</p>
</div>
<div className="bg-[#121620] border border-gray-800 p-8 rounded-[2.5rem] group hover:border-[#D4A373]/30 transition-all">
  <CheckCircle className="text-[#D4A373] mb-4 group-hover:scale-110 transition-transform" size={36} />
    <h4 className="text-5xl font-bold text-white">{stats.returned}</h4>
      <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Successfully Returned</p>
</div>
</div>

<section className="bg-[#121620] border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
  <div className="p-8 border-b border-gray-800 bg-white/[0.02]">
      <h3 className="text-lg font-bold tracking-widest text-[#D4A373] uppercase italic">Borrowing History</h3>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="text-gray-600 uppercase text-[10px] tracking-[0.3em] font-bold border-b border-gray-800/50">
          <th className="p-6">Book Title</th>
          <th className="p-6">Due Date</th>
          <th className="p-6 text-right">Status</th>
        </tr>
    </thead>
<tbody className="divide-y divide-gray-800/30">{borrowedBooks.length > 0 ? (borrowedBooks.map((book, index) => (<tr key={index} className="hover:bg-white/[0.01] transition-colors group">
  <td className="p-6 font-bold text-white group-hover:text-[#D4A373] transition-colors">{book.title}</td>
  <td className="p-6 text-gray-500 italic text-sm">{book.due_date}</td>
  <td className="p-6 text-right">
<span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${book.status === 'Returned' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-[#D4A373]/10 text-[#D4A373] border-[#D4A373]/20'}`}>
            {book.status}
</span>
</td>
</tr>
))
) : (
<tr>
  <td colSpan="3" className="p-10 text-center text-gray-600 italic">No borrowing records found.</td>
  </tr>
)}
</tbody>
</table>
</div>
</section>
</main>
</div>
);
};

export default UserDashboard;