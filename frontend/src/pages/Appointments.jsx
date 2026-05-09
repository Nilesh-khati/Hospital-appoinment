import { useEffect, useState } from "react";
import appointmentService from "../services/appointmentService.js";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Button from "../components/Button.jsx";
import { motion } from "framer-motion";

function StatusBadge({ status }) {
  const isCancelled = status === "Cancelled";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        isCancelled
          ? "bg-red-50 text-red-700 ring-red-200"
          : "bg-green-50 text-green-700 ring-green-200"
      }`}
    >
      {status}
    </span>
  );
}

function AppointmentRow({ appointment, canCancel, onCancel }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-slate-200/70"
    >
      <td className="py-4 px-3 text-slate-900 font-medium">
        {appointment.patient?.name}
      </td>
      <td className="py-4 px-3 text-slate-900">{appointment.doctor?.name}</td>
      <td className="py-4 px-3 text-slate-700">{appointment.date}</td>
      <td className="py-4 px-3 text-slate-700">{appointment.time}</td>
      <td className="py-4 px-3">
        <StatusBadge status={appointment.status} />
      </td>
      <td className="py-4 px-3">
        <Button
          variant="danger"
          className="px-3 py-2 text-sm"
          disabled={!canCancel}
          onClick={() => onCancel(appointment._id)}
        >
          Cancel
        </Button>
      </td>
    </motion.tr>
  );
}

function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await appointmentService.getAppointments();
        setAppointments(data);
      } catch (err) {
        setError("Unable to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    setError(null);
    setMessage(null);

    try {
      await appointmentService.cancelAppointment(appointmentId);
      setAppointments((prev) =>
        prev.map((appointment) => {
          if (appointment._id === appointmentId) {
            return { ...appointment, status: "Cancelled" };
          }
          return appointment;
        })
      );
      setMessage("Appointment cancelled successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to cancel appointment");
    }
  };

  if (loading) return <LoadingSpinner text="Loading appointments" />;

  return (
    <div className="safe-container">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
            <p className="text-slate-600 mt-2">View and manage all booked appointments.</p>
          </div>
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 px-4 py-2 text-sm text-slate-700 shadow-sm">
            {appointments.length} total
          </div>
        </div>
      </div>

      {message ? (
        <div className="mb-5 rounded-2xl bg-green-50 ring-1 ring-green-200 text-green-800 px-4 py-3 text-sm">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="mb-5 rounded-2xl bg-red-50 ring-1 ring-red-200 text-red-800 px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-700 text-sm">
                <th className="py-3 px-3 font-semibold">Patient</th>
                <th className="py-3 px-3 font-semibold">Doctor</th>
                <th className="py-3 px-3 font-semibold">Date</th>
                <th className="py-3 px-3 font-semibold">Time</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 px-3 text-center text-slate-600">
                    No appointments are available.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => {
                  const belongsToUser =
                    appointment.patient?._id === user.id ||
                    appointment.doctor?._id === user.id;
                  const canCancel = appointment.status === "Booked" && belongsToUser;

                  return (
                    <AppointmentRow
                      key={appointment._id}
                      appointment={appointment}
                      canCancel={canCancel}
                      onCancel={handleCancel}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Appointments;

