import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HiTrash, HiUserGroup, HiBadgeCheck, HiAcademicCap } from "react-icons/hi";
import { api } from "../../helper/api";
import { useLoggedInUsersContext } from "./LoggedInUserContext";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  username: string;
  name: string;
  role: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { loggedInUser } = useLoggedInUsersContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.role !== "admin") {
      toast.error("Bu sayfaya giriş yetkiniz yok! ⛔");
      navigate("/");
      return;
    }

    fetchUsers();
  }, [loggedInUser, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("auth/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Kullanıcı listesi alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu kullanıcıyı kalıcı olarak silmek istiyor musun?")) return;

    try {
      await api.delete(`auth/users/${id}`);
      toast.success("Kullanıcı silindi.");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("Silme işlemi başarısız.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 pt-6 pb-12 animate-fade-in">
      
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Kullanıcı Yönetimi</h1>
           <p className="text-gray-500 mt-2">Sistemdeki kayıtlı üyeleri buradan yönetebilirsin.</p>
        </div>
        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
           <HiUserGroup className="w-8 h-8" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-400 font-bold tracking-wider">
              <th className="px-6 py-4">Kullanıcı Adı</th>
              <th className="px-6 py-4">Ad Soyad</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={4} className="py-8 text-center text-gray-500">Yükleniyor...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={4} className="py-8 text-center text-gray-500">Hiç kullanıcı yok.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                         <HiBadgeCheck /> Personel
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700 border border-teal-200">
                         <HiAcademicCap /> Öğrenci
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Kullanıcıyı Sil"
                    >
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