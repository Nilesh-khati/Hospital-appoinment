import { useEffect, useState } from "react";
import appointmentService from "../services/appointmentService.js";
import userService from "../services/userService.js";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { motion } from "framer-motion";
import { FaUserMd, FaUsers, FaCalendarCheck } from "react-icons/fa";

function StatCard({ icon, label, value, hint, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-slate-600 text-sm font-semibold">{label}</div>
          <div className="mt-2 text-slate-900 font-extrabold text-3xl">
            {value}
          </div>
          <div className="mt-2 text-slate-600 text-sm">{hint}</div>
        </div>
        <div
          className={`h-12 w-12 rounded-2xl ${gradient} flex items-center justify-center text-slate-800`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [doctorsData, patientsData, appointmentsData] = await Promise.all(
          [
            userService.getDoctors(),
            userService.getPatients(),
            appointmentService.getAppointments(),
          ],
        );
        setDoctors(doctorsData);
        setPatients(patientsData);
        setAppointments(appointmentsData);
      } catch (e) {
        console.error(e);
        setError("Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <LoadingSpinner text="Loading dashboard" />;

  return (
    <div className="safe-container">
      <div className="mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-slate-900"
        >
          Welcome back, {user?.name}
        </motion.h1>
        <p className="text-slate-600 mt-2">
          Your role is <span className="font-semibold">{user?.role}</span>. Use
          the navigation to manage hospital appointments.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl bg-red-50 ring-1 ring-red-200 text-red-800 px-4 py-3 mb-5">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<FaUserMd />}
          label="Doctors"
          value={doctors.length}
          hint="Active providers available for booking."
          gradient="bg-sky-600/10"
        />
        <StatCard
          icon={<FaUsers />}
          label="Patients"
          value={patients.length}
          hint="Registered patients in the system."
          gradient="bg-cyan-500/10"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          label="Appointments"
          value={appointments.length}
          hint="Total booked or cancelled appointments."
          gradient="bg-blue-600/10"
        />
      </div>
    </div>
  );
}

export default Dashboard;
