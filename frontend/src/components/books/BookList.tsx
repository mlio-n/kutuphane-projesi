import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HiTrash, HiPlus, HiBookOpen, HiOutlineBookOpen, HiCheck, HiX, HiReply, HiBan, HiSearch, HiStar, HiOutlineStar } from "react-icons/hi";
import { api } from "../../helper/api";
import { useLoggedInUsersContext } from "../auth/LoggedInUserContext";

type Book = {
  id: number;
  title: string;
  author: string;
  category: { id: number; name: string } | null;
  loans: { returnDate: string | null; user: { name: string; username: string } }[]; 
};

type Category = {
  id: number;
  name: string;
};

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const { loggedInUser } = useLoggedInUsersContext();
  const isAdmin = loggedInUser?.role === 'admin';

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    
    if (loggedInUser) {
      fetchFavorites();
    }
  }, [loggedInUser]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("books");
      setBooks(res.data);
    } catch (error) {
      toast.error("Kitaplar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      setCategories(res.data);
    } catch (error) {}
  };

  const fetchFavorites = async () => {
    try {
      const res = await api.get(`auth/favorites/${loggedInUser?.id}`);
      setFavorites(res.data.map((b: any) => b.id));
    } catch (error) {}
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.warning("Lütfen bir kategori seçin.");
      return;
    }

    try {
      await api.post("books", {
        title,
        author,
        category: { id: categoryId }
      });
      toast.success("Kitap eklendi!");
      setTitle("");
      setAuthor("");
      setCategoryId("");
      fetchBooks();
    } catch (error) {
      toast.error("Hata oluştu.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    try {
      await api.delete(`books/${id}`);
      toast.success("Kitap silindi.");
      setBooks(books.filter((b) => b.id !== id));
    } catch (error) {
      toast.error("Silinemedi.");
    }
  };

  const handleBorrow = async (bookId: number) => {
    if (!confirm("Bu kitabı ödünç almak istiyor musun?")) return;
    try {
      await api.post(`loans/borrow/${bookId}`, { user: loggedInUser });
      toast.success("Kitap ödünç alındı.");
      fetchBooks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "İşlem başarısız.");
    }
  };

  const handleReturn = async (bookId: number) => {
    if (!confirm("Kitabı iade ediyor musun?")) return;
    try {
      await api.put(`loans/return/${bookId}`);
      toast.success("Kitap iade edildi.");
      fetchBooks();
    } catch (error: any) {
      toast.error("İade işlemi başarısız.");
    }
  };

  const handleAddFavorite = async (bookId: number) => {
    try {
      await api.post(`auth/favorites/${bookId}`, { userId: loggedInUser?.id });
      setFavorites([...favorites, bookId]);
      toast.success("Favorilere eklendi! ⭐");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Hata oluştu");
    }
  };

  const handleRemoveFavorite = async (bookId: number) => {
    try {
      await api.delete(`auth/favorites/${bookId}`, { 
        data: { userId: loggedInUser?.id } 
      });
      setFavorites(favorites.filter(id => id !== bookId));
      toast.success("Favorilerden çıkarıldı");
    } catch (error) {
      toast.error("Hata oluştu");
    }
  };

  const myActiveLoan = books.find(b => 
    b.loans?.some(loan => loan.returnDate === null && loan.user.username === loggedInUser?.username)
  );
  const hasLimitReached = !!myActiveLoan;

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) || 
      book.author.toLowerCase().includes(searchLower) ||
      (book.category?.name?.toLowerCase().includes(searchLower) ?? false)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-8 pt-6 pb-12 animate-fade-in">
      
      <div className="flex items-center justify-between mb-10">
        <div>
           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Kütüphane Arşivi</h1>
           <p className="text-gray-500 mt-2">Kitapları incele, ödünç al veya iade et.</p>
        </div>
        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
           <HiBookOpen className="w-8 h-8" />
        </div>
      </div>

      {isAdmin && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HiPlus className="text-indigo-600" /> Yeni Eser Ekle
          </h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><HiOutlineBookOpen /></div>
                <input type="text" placeholder="Kitap Adı" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" required />
              </div>
              
              <input type="text" placeholder="Yazar" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" required />
              
              <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-600">
                <option value="">Kategori Seçiniz</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <button type="submit" className="bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2">
                <HiPlus className="w-5 h-5" /> Kaydet
              </button>
          </form>
        </div>
      )}

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="text-gray-400 w-5 h-5" />
        </div>
        <input 
          type="text" 
          placeholder="Kitap, yazar veya kategori ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-400 font-bold tracking-wider">
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4">Kitap Bilgisi</th>
              <th className="px-6 py-4">Yazar</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-500">Yükleniyor...</td></tr>
            ) : filteredBooks.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-500">
                {searchTerm ? "Aradığınız kriterde kitap bulunamadı." : "Kütüphanede henüz kitap yok."}
              </td></tr>
            ) : (
              filteredBooks.map((book) => {
                const activeLoan = book.loans?.find(loan => loan.returnDate === null);
                const isAvailable = !activeLoan;
                const isMyBook = activeLoan?.user?.username === loggedInUser?.username;
                const isFavorite = favorites.includes(book.id);

                return (
                  <tr key={book.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                          <HiCheck /> Müsait
                        </span>
                      ) : (
                        <div className="flex flex-col">
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 w-fit">
                             <HiX /> Dolu
                           </span>
                           <span className="text-xs text-red-400 mt-1 pl-1 font-medium">
                             {activeLoan?.user?.name} okuyor
                           </span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-bold text-gray-800">{book.title}</td>
                    <td className="px-6 py-4 text-gray-600">{book.author}</td>
                    <td className="px-6 py-4">
                        {book.category ? (
                          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-xs font-medium border border-indigo-100">
                            {book.category.name}
                          </span>
                        ) : <span className="text-gray-400 text-xs">-</span>}
                    </td>

                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      
                      {isFavorite ? (
                        <button 
                          onClick={() => handleRemoveFavorite(book.id)}
                          className="px-3 py-2 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg hover:bg-yellow-200 transition-colors flex items-center gap-1"
                          title="Favorilerden Çıkar"
                        >
                          <HiStar className="w-4 h-4" /> Favorilerimde
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleAddFavorite(book.id)}
                          className="px-3 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
                          title="Favorilere Ekle"
                        >
                          <HiOutlineStar className="w-4 h-4" /> Favorile
                        </button>
                      )}

                      {isAvailable && (
                        hasLimitReached ? (
                            <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 text-xs font-bold rounded-lg cursor-not-allowed flex items-center gap-1">
                                <HiBan /> Limit Dolu
                            </button>
                        ) : (
                            <button 
                              onClick={() => handleBorrow(book.id)}
                              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                              Ödünç Al
                            </button>
                        )
                      )}

                      {!isAvailable && (isAdmin || isMyBook) && (
                        <button 
                          onClick={() => handleReturn(book.id)}
                          className={`px-4 py-2 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1 ${
                            isMyBook ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"
                          }`}
                        >
                          <HiReply /> {isMyBook ? "İade Et" : "Teslim Al"}
                        </button>
                      )}

                      {isAdmin && (
                        <button 
                          onClick={() => handleDelete(book.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}