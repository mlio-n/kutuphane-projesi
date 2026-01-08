import { useState } from "react";
import { api, setToken } from "../../helper/api";
import Cookies from "universal-cookie";
import { useLoggedInUsersContext } from "./LoggedInUserContext";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { HiUser, HiLockClosed, HiArrowRight, HiBookOpen } from "react-icons/hi";

export default function Login() {
  const cookies = new Cookies();
  const { setLoggedInUser } = useLoggedInUsersContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("auth/login", { username, password });
      
      const userData = res.data;
      const userToStore = {
        ...userData.user,
        access_token: userData.access_token
      };

      cookies.set("loggedInUser", userToStore, { path: "/" });
      setToken(userToStore.access_token);
      setLoggedInUser(userToStore);

      toast.success(`Hoş geldin, ${userToStore.username}! 👋`);
      navigate("/"); 
    } catch (error: any) {
      console.error(error);
      toast.error("Giriş başarısız! Bilgilerini kontrol et.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md z-10 border border-gray-100 relative">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg mb-6 transform rotate-3">
             <HiBookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tekrar Hoş Geldiniz</h2>
          <p className="text-gray-500 mt-2 text-sm">Kütüphane yönetim paneline erişmek için giriş yapın.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiUser className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              required
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none placeholder-gray-400"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="password"
              required
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none placeholder-gray-400"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-4 px-4 rounded-xl text-sm font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              "Giriş Yapılıyor..."
            ) : (
              <>
                Giriş Yap
                <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Henüz bir hesabın yok mu?{" "}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}