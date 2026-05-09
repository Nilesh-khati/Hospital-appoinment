import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";
import { FaHospital, FaUserShield, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass =
    "text-sm font-semibold text-slate-700 hover:text-sky-700 transition";

  const activeClass = "text-sky-700";

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200/70"
    >
      <div className="safe-container py-3 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="Hospital Appointment"
        >
          <div className="h-11 w-11 rounded-2xl bg-sky-600/10 text-sky-700 flex items-center justify-center ring-1 ring-sky-600/20">
            <FaHospital className="text-xl" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-slate-900 text-base">
              Hospital Appointment
            </div>
            <div className="text-xs text-slate-500">
              Premium booking experience
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Doctors
              </NavLink>
              <NavLink
                to="/book"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Book
              </NavLink>
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Appointments
              </NavLink>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-slate-700">
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold bg-white ring-1 ring-slate-200 hover:bg-slate-50 transition"
                >
                  <FaSignOutAlt className="text-slate-700" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Register
              </NavLink>
              <div className="ml-3">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-sky-600/10 ring-1 ring-sky-600/20 px-3 py-2 text-sm font-semibold text-sky-700">
                  <FaUserShield />
                  Secure access
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile nav - minimal (no extra pages) */}
        <div className="md:hidden">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm"
            value={user ? window.location.pathname : window.location.pathname}
            onChange={(e) => navigate(e.target.value)}
          >
            {user ? (
              <>
                <option value="/dashboard">Dashboard</option>
                <option value="/doctors">Doctors</option>
                <option value="/book">Book</option>
                <option value="/appointments">Appointments</option>
              </>
            ) : (
              <>
                <option value="/login">Login</option>
                <option value="/register">Register</option>
              </>
            )}
          </select>
        </div>
      </div>
    </motion.nav>
  );
}
