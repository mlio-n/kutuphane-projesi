import { useState, useRef, useEffect } from "react";
import { api } from "../../helper/api";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { HiUser, HiLockClosed, HiArrowRight, HiBookOpen, HiIdentification, HiAcademicCap, HiChevronDown } from "react-icons/hi";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles = [
    { value: "student", label: "Öğrenci" },
    { value: "admin", label: "Personel / Yönetici" },
  ];

  const selectedRoleLabel = roles.find((r) => r.value === role)?.label;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleRoleSelect = (value: string) => {
    setRole(value);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("auth/register", { name, username, password, role });
      toast.success("Kayıt Başarılı! Şimdi giriş yapabilirsin. 🎉");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Kayıt başarısız! Bilgileri kontrol et.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md z-10 border border-gray-100 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 shadow-lg mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <HiBookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Aramıza Katıl</h2>
          <p className="text-gray-500 mt-2 text-sm">Kütüphane dünyasına adım atmak için hesabını oluştur.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiIdentification className="h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            <input
              type="text"
              required
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all outline-none placeholder-gray-400"
              placeholder="Adınız Soyadınız"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiUser className="h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            <input
              type="text"
              required
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all outline-none placeholder-gray-400"
              placeholder="Kullanıcı Adı Seçin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative group" ref={dropdownRef}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <HiAcademicCap className={`h-5 w-5 transition-colors ${isDropdownOpen ? 'text-teal-600' : 'text-gray-400'}`} />
            </div>
            <button
              type="button"
              onClick={toggleDropdown}
              className={`w-full pl-11 pr-4 py-4 bg-gray-50 border text-left text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all flex items-center justify-between ${
                isDropdownOpen ? 'border-teal-500 bg-white ring-2 ring-teal-500' : 'border-gray-200 text-gray-900'
              }`}
            >
              <span className={selectedRoleLabel ? 'text-gray-900' : 'text-gray-400'}>
                {selectedRoleLabel || 'Rol Seçin'}
              </span>
              <HiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto focus:outline-none py-2">
                {roles.map((roleOption) => (
                  <li
                    key={roleOption.value}
                    onClick={() => handleRoleSelect(roleOption.value)}
                    className={`cursor-pointer select-none relative py-3 pl-11 pr-4 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors ${
                      role === roleOption.value ? 'font-semibold text-teal-700 bg-teal-50/50' : 'text-gray-900'
                    }`}
                  >
                    {roleOption.label}
                    {role === roleOption.value && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-teal-600">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            <input
              type="password"
              required
              className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all outline-none placeholder-gray-400"
              placeholder="Güçlü Bir Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-4 px-4 rounded-xl text-sm font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
          >
            {loading ? (
              "Hesap Oluşturuluyor..."
            ) : (
              <>
                Kayıt Ol
                <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Zaten hesabın var mı?{" "}
              <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                Giriş Yap
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}