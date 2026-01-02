import { useEffect, useState } from "react";
import { HiBookOpen, HiUsers, HiCollection, HiClock, HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { api } from "../../helper/api";
import { useLoggedInUsersContext } from "../auth/LoggedInUserContext";

export default function Home() {
  const { loggedInUser } = useLoggedInUsersContext();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalCategories: 0,
    activeLoans: 0,
  });

  useEffect(() => {
    api.get("stats")
      .then((res) => setStats(res.data))
      .catch(() => console.error("Error fetching stats"));
  }, []);

  const cards = [
    { 
      label: "Toplam Kitap", 
      value: stats.totalBooks, 
      icon: HiBookOpen, 
      color: "text-blue-600", 
      bg: "bg-blue-100",
      link: "/books"
    },
    { 
      label: "Toplam Üye", 
      value: stats.totalUsers, 
      icon: HiUsers, 
      color: "text-green-600", 
      bg: "bg-green-100",
      link: loggedInUser?.role === 'admin' ? "/users" : null
    },
    { 
      label: "Okunan Kitaplar", 
      value: stats.activeLoans, 
      icon: HiClock, 
      color: "text-orange-600", 
      bg: "bg-orange-100",
      link: "/books"
    },
    { 
      label: "Kategoriler", 
      value: stats.totalCategories, 
      icon: HiCollection, 
      color: "text-purple-600", 
      bg: "bg-purple-100",
      link: loggedInUser?.role === 'admin' ? "/categories" : null
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 pt-8 pb-12 animate-fade-in">
      
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Hoş Geldin, {loggedInUser?.name}! 👋
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Kütüphane durumunu buradan hızlıca takip edebilirsin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{card.label}</p>
                <h3 className="text-3xl font-extrabold text-gray-800">{card.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>

            {card.link && (
              <Link to={card.link} className="mt-4 flex items-center text-sm font-semibold text-gray-400 group-hover:text-indigo-600 transition-colors">
                İncele <HiArrowRight className="ml-1" />
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl flex items-center justify-between">
         <div>
           <h2 className="text-2xl font-bold mb-2">Yeni Kitaplar Eklemeye Ne Dersin?</h2>
           <p className="text-indigo-100 max-w-lg">
             Kütüphaneyi zenginleştirmek için hemen kitap listesine git ve yeni eserler ekle.
           </p>
         </div>
         <Link to="/books" className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
            Kitaplara Git
         </Link>
      </div>

    </div>
  );
}