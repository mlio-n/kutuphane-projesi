import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HiBookOpen, HiCollection, HiHome, HiLogout, HiUsers, HiUser } from "react-icons/hi"; 
import { useLoggedInUsersContext } from "../auth/LoggedInUserContext";

export default function DashboardLayout() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUsersContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate("/login");
  };

  const menuItems = [
    { label: "Ana Sayfa", path: "/", icon: HiHome },
    { label: "Kitaplar", path: "/books", icon: HiBookOpen },
    { label: "Kategoriler", path: "/categories", icon: HiCollection },
    { label: "Kullanıcılar", path: "/users", icon: HiUsers },
  ];

  const isAdmin = loggedInUser?.role === 'admin';
  const roleLabel = isAdmin ? "Personel / Yonetici" : "Ogrenci";
  const roleColor = isAdmin ? "text-indigo-600" : "text-gray-500";
  const avatarGradient = isAdmin ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-gradient-to-br from-green-400 to-cyan-500";

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex shadow-xl z-10">
        
        <div>
           <div className="h-20 flex items-center px-8 border-b border-gray-100">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white mr-3 shadow-indigo-200 shadow-lg">
               <HiBookOpen className="w-5 h-5" />
             </div>
             <h1 className="text-xl font-black tracking-tight text-gray-800">Kutuphane</h1>
           </div>

           <nav className="p-4 space-y-2 mt-4">
             {menuItems.map((item) => {
               const isActive = location.pathname === item.path;
               if ((item.path === "/users" || item.path === "/categories") && !isAdmin) return null;

               return (
                 <Link
                   key={item.path}
                   to={item.path}
                   className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${
                     isActive 
                       ? "bg-indigo-50 text-indigo-700 shadow-sm translate-x-1" 
                       : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                   }`}
                 >
                   <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                   {item.label}
                 </Link>
               );
             })}
           </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
            
            {/* Avatar Kısmı: name yerine username kullanıldı */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${avatarGradient}`}>
              {loggedInUser?.username?.charAt(0).toUpperCase() || <HiUser />}
            </div>

            <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-gray-900 truncate">
                 {/* İsim Kısmı: name yerine username kullanıldı */}
                 {loggedInUser?.username || "Kullanici"} 
               </p>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${roleColor}`}>
                    {roleLabel}
                  </p>
               </div>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Cikis Yap" 
            >
              <HiLogout className="w-5 h-5" />
            </button>
          </div>
        </div>

      </aside>

      <main className="flex-1 overflow-auto relative">
        <div className="min-h-full">
           <Outlet />
        </div>
      </main>
    </div>
  );
}