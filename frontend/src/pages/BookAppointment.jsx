import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import appointmentService from "../services/appointmentService.js";
import userService from "../services/userService.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Button from "../components/Button.jsx";

function BookAppointment() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await userService.getDoctors();
        setDoctors(data);
        if (data.length > 0) setDoctorId(data[0]._id);
      } catch (err) {
        setError("Unable to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitLoading(true);

    if (!doctorId || !date || !time) {
      setError("Please select a doctor, date, and time");
      setSubmitLoading(false);
      return;
    }

    try {
      await appointmentService.bookAppointment({ doctorId, date, time });
      setMessage("Appointment booked successfully");
      setDate("");
      setTime("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading doctors" />;

  return (
    <div className="safe-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Book an Appointment
        </h1>
        <p className="text-slate-600 mt-2">
          Schedule a new appointment with a doctor.
        </p>
      </div>

      {user?.role !== "patient" ? (
        <div className="rounded-2xl bg-sky-50 ring-1 ring-sky-200 px-4 py-3 text-sky-900 mb-5">
          Only patients can book appointments. Doctors may review appointments
          from the Appointments dashboard.
        </div>
      ) : null}

      <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-6 md:p-8">
        {message ? (
          <div className="rounded-2xl bg-green-50 ring-1 ring-green-200 px-4 py-3 text-green-800 mb-4">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-2xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-red-800 mb-4">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700">
                Select Doctor
              </label>
              <select
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
              >
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} ({doctor.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Date
                </label>
                <input
                  type="date"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Time
                </label>
                <input
                  type="time"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={submitLoading || user.role !== "patient"}
            >
              {submitLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
