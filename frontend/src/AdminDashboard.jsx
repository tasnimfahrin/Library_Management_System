import { Book, LogOut, Users, PlusCircle, LayoutDashboard, Shield, CheckCircle, X, Image as ImageIcon, Trash2, Star, Menu, Edit3, UserMinus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';

const AdminDashboard = () => {
const navigate = useNavigate();
const [activeTab, setActiveTab] = useState('dashboard');
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

const [books, setBooks] = useState([]);
const [users, setUsers] = useState([]);
const [stats, setStats] = useState({ total_books: 0, total_users: 0, active_issues: 0 });

const [newBook, setNewBook] = useState({ title: '', author: '', category_id: '1', quantity: '1', description: '', is_featured: '0' });
const [editingBook, setEditingBook] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);

const categories = { '1': 'CSE', '2': 'MATH', '3': 'SE', '4': 'ENGLISH', '5': 'LAW', '6': 'BBA' };

const adminData = useMemo(() => {
  try {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
      console.error("Localstorage parse error", error);
      return null;
  }
}, []);

const fetchData = useCallback(async () => {
  try {
    const [booksRes, statsRes, usersRes] = await Promise.all([
      fetch("http://localhost/library-management/backend/api/get_books.php"),
      fetch("http://localhost/library-management/backend/api/get_stats.php"),
      fetch("http://localhost/library-management/backend/api/get_users.php")
    ]);
    if (statsRes.ok) {
      const statsData = await statsRes.json();
      setStats({
        total_books: Number(statsData.total_books || 0),
        total_users: Number(statsData.total_users || 0),
        active_issues: Number(statsData.active_issues || 0)
      });
    }

    if (booksRes.ok) {
      const booksData = await booksRes.json();
      setBooks(Array.isArray(booksData) ? booksData : []);
    }

    if (usersRes.ok) {
      const usersData = await usersRes.json();
      setUsers(Array.isArray(usersData) ? usersData : []);
    }

  } catch (error) {
    console.error("Fetch Error:", error);
  }
}, []);
  
useEffect(() => {
  if (!adminData) {
    navigate('/login');
    return;
  }
  const loadData = async () => {
    await fetchData();
  };
  loadData();
}, [adminData, fetchData, navigate]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) formData.append('image', selectedFile);
    Object.keys(newBook).forEach(key => formData.append(key, newBook[key]));
    
    try {
      const res = await fetch("http://localhost/library-management/backend/api/add_book.php", { method: "POST",body: formData});
      const result = await res.json();
      if (result.success) {
        setNewBook({ title: '', author: '', category_id: '1', quantity: '1', description: '', is_featured: '0' }); 
        setSelectedFile(null);
        setIsAddModalOpen(false);
        fetchData();
      } else {
        alert(result.message || "Failed to add book");
      }
    } catch (err) {
        console.error("Error adding book:", err);
        alert("Server error!");
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (!editingBook) return;
    const formData = new FormData();
    if (selectedFile) formData.append('image', selectedFile);
    Object.keys(editingBook).forEach(key => formData.append(key, editingBook[key]));
    
    try {
      const res = await fetch("http://localhost/library-management/backend/api/update_book.php", { method: "POST", body: formData });
      const result = await res.json();
      if (result.success) { setIsEditModalOpen(false); fetchData(); setEditingBook(null); setSelectedFile(null);}
    } catch (err) {
        console.error(err);
        alert("Update failed!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
          const res = await fetch(`http://localhost/library-management/backend/api/delete_book.php?id=${id}`, { method: 'DELETE' });
          const result = await res.json();
          if (result.success) fetchData();
      } catch (error) { console.error(error); }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
          const res = await fetch(`http://localhost/library-management/backend/api/delete_user.php?id=${id}`, { method: 'DELETE' });
          const data = await res.json();
          if (data.success) fetchData();
          else alert("Error: " + data.message);
      } catch (error) { console.error(error); }
    }
  };

  if (!adminData) return null;

return (
<div className="min-h-screen bg-[#0A0D14] text-white flex font-sans overflow-hidden">
  <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0D14] border-r border-gray-900/50 p-8 flex flex-col transition-transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="flex items-center gap-3 mb-12">
      <Shield className="text-[#D4A373]" size={32} />
        <h1 className="text-2xl font-bold tracking-tighter uppercase">LMS <span className="text-[#D4A373]">PRO</span></h1>
    </div>
    <nav className="flex-1 space-y-6">
      <button onClick={() => {setActiveTab('dashboard'); setIsSidebarOpen(false);}} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[10px] tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-[#D4A373] text-black shadow-lg shadow-[#D4A373]/10' : 'text-gray-500 hover:text-[#D4A373]'}`}>
        <LayoutDashboard size={20} /> DASHBOARD
      </button>
      <button onClick={() => {setActiveTab('members'); setIsSidebarOpen(false);}} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[10px] tracking-widest transition-all ${activeTab === 'members' ? 'bg-[#D4A373] text-black shadow-lg shadow-[#D4A373]/10' : 'text-gray-500 hover:text-[#D4A373]'}`}>
        <Users size={20} /> MEMBERS
      </button>
      <button onClick={() => setIsAddModalOpen(true)} className="w-full flex items-center gap-4 px-6 py-2 text-gray-500 hover:text-[#D4A373] font-bold text-[10px] tracking-widest group">
        <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" /> ADD NEW BOOK
        </button>
    </nav>
    <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); }} className="flex items-center gap-4 px-6 py-4 text-red-500 font-bold text-[10px] tracking-widest hover:bg-red-500/5 rounded-2xl transition-all">
      <LogOut size={20} /> SIGN OUT
    </button>
</aside>

<main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
  <header className="flex items-center justify-between mb-16">
      <div className="flex items-center gap-6">
        <img src={`http://localhost/library-management/frontend/public/profiles/${adminData?.profile_pic || 'tas_admin.jpg'}`}
          className="w-20 h-20 rounded-3xl border-2 border-[#D4A373]/30 object-cover shadow-2xl"
            alt="Profile" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${adminData?.name || 'Admin'}&background=D4A373&color=fff` }}/>
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Hi, <span className="text-[#D4A373] italic font-serif uppercase">{adminData?.name}</span></h2>
          <div className="flex items-center gap-3">
            <span className="bg-[#D4A373]/10 text-[#D4A373] text-[9px] px-3 py-1 rounded-md font-black uppercase tracking-widest border border-[#D4A373]/20">{adminData?.role}</span>
            <span className="text-gray-600 text-xs font-medium">{adminData?.email}</span>
          </div>
        </div>
      </div>
  <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-[#D4A373]"><Menu size={32}/></button>
</header>

  {activeTab === 'dashboard' ? (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { label: 'Total Assets', value: stats.total_books, icon: Book },
          { label: 'Members', value: stats.total_users, icon: Users },
          { label: 'Active Issues', value: stats.active_issues, icon: CheckCircle },
          ].map((item, i) => (
        <div key={i} className="bg-[#121620]/40 border border-gray-800/50 p-10 rounded-3xl relative group hover:border-[#D4A373]/30 transition-all shadow-xl">
          <item.icon className="text-gray-800 absolute right-8 top-8 group-hover:text-[#D4A373] transition-colors" size={48} />
            <h4 className="text-6xl font-black mb-3 tracking-tighter">{item.value || 0}</h4>
              <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">{item.label}</p>
        </div>
      ))}
</div>
<section className="bg-[#121620]/40 border border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl">
  <div className="p-10 border-b border-gray-800/50 bg-white/5">
    <h3 className="text-xl font-bold text-[#D4A373] tracking-[0.2em] uppercase italic">Recent Inventory</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
      <thead>
        <tr className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-black border-b border-gray-800/30">
        <th className="p-8">Cover</th>
          <th className="p-8">Details</th>
          <th className="p-8 text-center">Category</th>
          <th className="p-8 text-center">Stock</th>
          <th className="p-8 text-center">Featured</th>
          <th className="p-8 text-right">Action</th>
          </tr>
      </thead>
<tbody className="divide-y divide-gray-800/20">
  {books.map((book) => (
    <tr key={book.book_id} className="hover:bg-white/5 transition-all group">
      <td className="p-8">
        <img src={`http://localhost/library-management/backend/api/uploads/${book.image_url}`} className="w-12 h-16 object-cover rounded-xl border border-gray-800 shadow-xl" alt="book" 
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Cover';}}/>
      </td>
  <td className="p-8">
    <div className="font-bold text-lg text-white group-hover:text-[#D4A373] transition-colors">{book.title}</div>
      <div className="text-xs text-gray-500 italic uppercase tracking-widest">by {book.author}</div>
        </td>
          <td className="p-8 text-center">
            <span className="bg-[#0A0D14] text-[#D4A373] text-[9px] px-3 py-1.5 rounded-full font-black border border-gray-800 uppercase">
                {categories[book.category_id] || 'N/A'}
            </span>
        </td>
    <td className="p-8 text-center font-mono text-base font-bold text-gray-300">{book.available_qty} / {book.quantity}</td>
      <td className="p-8 text-center">
        {String(book.is_featured) === '1' ? (
            <Star className="text-yellow-500 fill-yellow-500 mx-auto drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" size={18} />) : (<Star className="text-gray-800 mx-auto opacity-20" size={18} />)}
        </td>
      <td className="p-8 text-right flex justify-end gap-3">
    <button onClick={() => { setEditingBook({...book}); setIsEditModalOpen(true); }} className="p-3 text-gray-700 hover:text-[#D4A373] transition-all"><Edit3 size={20} /></button>
    <button onClick={() => handleDelete(book.book_id)} className="p-3 text-gray-700 hover:text-red-500 transition-all"><Trash2 size={20} /></button>
    </td>
</tr>
))}
</tbody>
</table>
</div>
</section>
  </>
    ) : (
    <section className="bg-[#121620]/40 border border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl">
    <div className="p-10 border-b border-gray-800/50 bg-white/5">
          <h3 className="text-xl font-bold text-[#D4A373] tracking-[0.2em] uppercase italic">Member Directory</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-black border-b border-gray-800/30">
                    <th className="p-8">Profile</th>
                    <th className="p-8">Email</th>
                    <th className="p-8 text-center">Role</th>
                    <th className="p-8 text-right">Action</th>
                  </tr>
                </thead>
            <tbody className="divide-y divide-gray-800/20">
              {users.map((user, index) => (
                <tr key={user.user_id || index} className="hover:bg-white/5 transition-all group">
                <td className="p-8 flex items-center gap-4">
                    <img src={`http://localhost/library-management/frontend/public/profiles/${user.profile_pic || 'default_user.png'}`} className="w-10 h-10 rounded-xl object-cover border border-gray-800" 
                      alt="member" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=D4A373&color=fff` }}/>
                  <span className="font-bold">{user.name}</span>
                </td>
                <td className="p-8 text-gray-400 text-xs">{user.email}</td>
                <td className="p-8 text-center italic text-[#D4A373] text-[10px] uppercase font-bold">{user.role}</td>
                <td className="p-8 text-right">
                <button onClick={() => handleDeleteUser(user.user_id)} className="text-gray-700 hover:text-red-500 p-2 transition-all">
                  <UserMinus size={20}/>
            </button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
)}

{(isAddModalOpen || isEditModalOpen) && (
  <Modal title={isAddModalOpen ? "Add New Book" : "Edit Book"} close={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setEditingBook(null); setSelectedFile(null); }}>
    <form onSubmit={isAddModalOpen ? handleAddBook : handleUpdateBook} className="space-y-5">
      <input type="text" placeholder="Title" required className="modal-input" value={isAddModalOpen ? newBook.title : editingBook?.title || ''} onChange={(e) => isAddModalOpen ? setNewBook({...newBook, title: e.target.value}) : setEditingBook({...editingBook, title: e.target.value})} />
      <input type="text" placeholder="Author" required className="modal-input" value={isAddModalOpen ? newBook.author : editingBook?.author || ''} onChange={(e) => isAddModalOpen ? setNewBook({...newBook, author: e.target.value}) : setEditingBook({...editingBook, author: e.target.value})} />
  <textarea placeholder="Write book description here..." required className="modal-input min-h-25 resize-none" value={isAddModalOpen ? newBook.description : editingBook?.description || ''} onChange={(e) => isAddModalOpen ? setNewBook({...newBook, description: e.target.value}) : setEditingBook({...editingBook, description: e.target.value})} />
  <div className="grid grid-cols-2 gap-4">
    <select className="modal-input text-[10px] font-bold" value={isAddModalOpen ? newBook.category_id : editingBook?.category_id || '1'} onChange={(e) => isAddModalOpen ? setNewBook({...newBook, category_id: e.target.value}) : setEditingBook({...editingBook, category_id: e.target.value})}>
        {Object.entries(categories).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
      </select>
    <select className="modal-input text-[10px] font-bold" value={isAddModalOpen ? newBook.is_featured : editingBook?.is_featured || '0'} onChange={(e) => isAddModalOpen ? setNewBook({...newBook, is_featured: e.target.value}) : setEditingBook({...editingBook, is_featured: e.target.value})}>
      <option value="0">Normal</option>
        <option value="1">Featured</option>
    </select>
</div>
<div className="flex items-center gap-4">
  <input type="number" placeholder="Qty" className="w-1/3 modal-input" value={isAddModalOpen ? newBook.quantity : editingBook?.quantity || '1'} 
    onChange={(e) => isAddModalOpen ? setNewBook({...newBook, quantity: e.target.value}) : setEditingBook({...editingBook, quantity: e.target.value})} />
    <label className="flex-1 modal-file-label">
      <ImageIcon size={20} className="text-[#D4A373]" />
      <span className="truncate">{selectedFile ? selectedFile.name : "Upload Cover"}</span>
        <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
      </label>
</div>
      <button type="submit" className="modal-submit-btn">{isAddModalOpen ? "Save Book" : "Update Details"}</button>
</form>
</Modal>
)}
</main>
      
<style dangerouslySetInnerHTML={{ __html: `
  .modal-input { width: 100%; background: #0A0D14; border: 1px solid #1f2937; padding: 1.25rem; border-radius: 1rem; color: white; outline: none; transition: all 0.3s; }
  .modal-input:focus { border-color: #D4A373; }
  .modal-file-label { display: flex; align-items: center; justify-content: center; gap: 0.75rem; background: rgba(255,255,255,0.05); border: 2px dashed #1f2937; padding: 1.25rem; border-radius: 1rem; cursor: pointer; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #6b7280; }
  .modal-submit-btn { width: 100%; background: #D4A373; color: black; font-weight: 900; padding: 1.5rem; border-radius: 1rem; text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.75rem; transition: all 0.3s; }
  .modal-submit-btn:hover { background: #b88b5d; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(212, 163, 115, 0.4); }
`}} />
</div>
  );
};

const Modal = ({ title, close, children }) => (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
    <div className="bg-[#121620] border border-gray-800 p-10 rounded-[2.5rem] w-full max-w-xl shadow-2xl relative">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-3xl font-black italic tracking-tighter uppercase">
          {title.split(' ')[0]} <span className="text-[#D4A373]">{title.split(' ').slice(1).join(' ')}</span>
        </h3>
        <button onClick={close} className="text-gray-500 hover:text-white transition-colors"><X size={32}/></button>
      </div>
      {children}
    </div>
  </div>
);

export default AdminDashboard;
