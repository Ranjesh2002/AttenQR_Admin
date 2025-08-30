import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  LogOut,
  User,
  Bell,
  CalendarDays,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        {!collapsed && (
          // <h1 className="text-xl font-bold text-blue-600">AttenQR</h1>
          <div class="hover:bg-gray-100 hover:border hover:border-gray-300 transition-all duration-300 p-2 rounded-2xl">
            <img
              src="/make the background .png"
              alt="AttenQR Logo"
              class="w-30 h-auto"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition hover:bg-blue-50 hover:text-blue-700 ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                : ""
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
