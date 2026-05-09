import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import userService from "../services/userService.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Button from "../components/Button.jsx";
import doctorAvatar from "../assets/doctor-avatar.svg";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await userService.getDoctors();
        setDoctors(data);
      } catch (e) {
        setError("Unable to fetch doctors.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  if (loading) return <LoadingSpinner text="Loading doctors" />;

  return (
    <div className="safe-container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Doctor Directory
            </h1>
            <p className="text-slate-600 mt-2">
              Browse registered doctors and their contact email.
            </p>
          </div>
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 px-4 py-2 text-sm text-slate-700 shadow-sm">
            {doctors.length} doctor{doctors.length === 1 ? "" : "s"}
          </div>
        </div>
      </motion.div>

      {error ? (
        <div className="rounded-2xl bg-red-50 ring-1 ring-red-200 text-red-700 px-4 py-3">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {doctors.length === 0 ? (
          <div className="rounded-3xl bg-white ring-1 ring-slate-200 p-8 text-center text-slate-600 col-span-full">
            No doctors have been registered yet.
          </div>
        ) : (
          doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              whileHover={{ y: -3 }}
              className="rounded-3xl bg-white ring-1 ring-slate-200 p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={doctorAvatar}
                    alt="Doctor avatar"
                    className="doctor-avatar"
                  />
                  <div>
                    <div className="text-slate-900 font-bold text-lg">
                      {doctor.name}
                    </div>
                    <div className="text-slate-600 text-sm mt-1">
                      {doctor.email}
                    </div>
                    <div className="mt-3 inline-flex items-center rounded-full bg-sky-600/10 text-sky-700 px-3 py-1 text-xs font-semibold">
                      {doctor.role}
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full md:w-auto"
                  onClick={() => {
                    window.location.href = "/book";
                  }}
                >
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Doctors;
