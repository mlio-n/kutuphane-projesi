import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HiTrash, HiPlus, HiCollection, HiOutlineCollection } from "react-icons/hi";
import { api } from "../../helper/api";
import { useLoggedInUsersContext } from "../auth/LoggedInUserContext";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const { loggedInUser } = useLoggedInUsersContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı bilgisi henüz yüklenmediyse bekle
    if (!loggedInUser) return;

    // 1. Admin Koruması: Admin değilse at
    if (loggedInUser.role !== "admin") {
      toast.error("Bu sayfaya erişim yetkiniz yok! ⛔");
      navigate("/"); // Ana sayfaya fırlat
      return;
    }

    // 2. Admin ise verileri çek
    fetchCategories();
  }, [loggedInUser, navigate]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      setCategories(res.data);
    } catch (error) {
      toast.error("Kategoriler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await api.post("categories", { name });
      toast.success("Kategori eklendi.");
      setName("");
      fetchCategories();
    } catch (error) {
      toast.error("Ekleme başarısız.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu kategoriyi silmek istediğine emin misin?")) return;

    try {
      await api.delete(`categories/${id}`);
      toast.success("Kategori silindi.");
      setCategories(categories.filter((c) => c.id !== id));
    } catch (error) {
      toast.error("Silinemedi. Bu kategoriye ait kitaplar olabilir.");
    }
  };

  // Eğer kullanıcı admin değilse veya yükleniyorsa boş ekran göster (Sayfa içeriğini gizle)
  if (!loggedInUser || loggedInUser.role !== "admin") {
    return null; 
  }

  return (
    <div className="max-w-4xl mx-auto px-8 pt-6 pb-12 animate-fade-in">
      
      {/* BAŞLIK */}
      <div className="flex items-center justify-between mb-10">
        <div>
           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Kategoriler</h1>
           <p className="text-gray-500 mt-2">Kitapların sınıflandırıldığı alanları buradan yönet.</p>
        </div>
        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
           <HiCollection className="w-8 h-8" />
        </div>
      </div>

      {/* EKLEME FORMU */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-10">
         <form onSubmit={handleAdd} className="flex gap-4">
            <div className="relative flex-1">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineCollection />
               </div>
               <input 
                 type="text" 
                 placeholder="Yeni Kategori Adı (Örn: Tarih, Roman...)" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-400"
                 required
               />
            </div>
            <button type="submit" className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-transform hover:-translate-y-0.5 flex items-center gap-2 shadow-lg">
               <HiPlus className="w-5 h-5" /> Ekle
            </button>
         </form>
      </div>

      {/* LİSTE */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-400 font-bold tracking-wider">
                 <th className="px-6 py-4">Kategori Adı</th>
                 <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr><td colSpan={2} className="py-8 text-center text-gray-500">Yükleniyor...</td></tr>
              ) : categories.length === 0 ? (
                 <tr><td colSpan={2} className="py-8 text-center text-gray-500">Henüz kategori yok.</td></tr>
              ) : (
                 categories.map((cat) => (
                    <tr key={cat.id} className="group hover:bg-orange-50/30 transition-colors">
                       <td className="px-6 py-4 font-bold text-gray-700">{cat.name}</td>
                       <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDelete(cat.id)} className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
                             <HiTrash className="w-5 h-5" />
                          </button>
                       </td>
                    </tr>
                 ))
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
}