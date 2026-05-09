import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/Button.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Signing in" />;
  }

  return (
    <div className="safe-container py-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-6 md:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Login
          </h1>
          <p className="text-slate-600 mt-2">
            Access your hospital appointment dashboard.
          </p>

          {error ? (
            <div className="mt-5 rounded-2xl bg-red-50 ring-1 ring-red-200 text-red-800 px-4 py-3 text-sm">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              className="font-semibold text-sky-700 hover:text-sky-800"
              to="/register"
            >
              Register now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
