import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';

const Catalog = () => {
const [books] = useState([]);

return (
<div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-serif">
    <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/5 pb-8 gap-6">
        <div>
            <h1 className="text-4xl font-bold text-[#c5a059]">Library Catalog</h1>
            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Explore our collection of resources</p>
        </div>
        <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3 text-gray-600" size={20} />
            <input type="text"placeholder="Search by title, author, or ISBN..."className="w-full bg-[#121212] border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#c5a059] text-white transition-colors"/>
        </div>
        </div>
        {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/5 rounded-2xl bg-[#121212]/30">
            <BookOpen size={60} className="text-gray-700 mb-4" />
            <p className="text-gray-500 text-lg">Your library is currently empty.</p>
            <p className="text-gray-600 text-sm mt-1">Please add books from the Admin Panel to see them here.</p>
        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        </div>
        )}
    </div>
    </div>
);
};

export default Catalog;