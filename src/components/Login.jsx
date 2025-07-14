import { useState } from "react";
import adminapi from "../utils/api";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const response = await adminapi.post("/admin-login/", {
        email: email,
        password: password,
      });

      const { tokens, user } = response.data;
      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      localStorage.setItem("adminUser", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-[800px] h-[450px] bg-white flex shadow-2xl rounded-lg overflow-hidden">
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to access admin dashboard
          </p>
          {error && (
            <div className="text-red-500 text-sm mb-4 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handlelogin} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="AdminID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type={showpassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <span
                className="absolute top-3.5 right-3 cursor-pointer text-gray-400"
                onClick={() => setShowpassword(!showpassword)}
              >
                {showpassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all shadow-md"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-5">
            If this is not your site, you are not welcome
          </p>
        </div>
        <div className="w-1/2 relative bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 flex items-center justify-center p-5">
          {/* Floating SVG background or animation */}
          <div className="text-white text-center">
            <h1 className="text-2xl font-semibold mb-2">Attendance</h1>
            <h2 className="text-xl font-light">Management System</h2>
            <div className="mt-8">
              <svg
                className="w-32 h-32 mx-auto opacity-20 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
