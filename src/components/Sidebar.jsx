import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  LogOut,
  Menu,
  User,
  Bell,
  CalendarDays,
  History,
} from "lucide-react";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { name: "Attendance", icon: <Calendar />, path: "/attendance" },
    { name: "Attn History", icon: <History />, path: "/history" },
    { name: "Students", icon: <Users />, path: "/students" },
    { name: "Teachers", icon: <User />, path: "/teachers" },
    { name: "Alert", icon: <Bell />, path: "/alert" },
    { name: "Class Session", icon: <CalendarDays />, path: "/session" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`h-screen bg-white shadow-md border-r transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>
          AttenQR
        </span>
        <button onClick={() => setCollapsed(!collapsed)} className="p-1">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition hover:bg-blue-50 hover:text-blue-700 ${
              location.pathname === item.path ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            <div className="text-gray-700">{item.icon}</div>
            {!collapsed && <span className="text-gray-800">{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 w-full px-4">
        <button
          onClick={handleLogout}
          className=" flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
