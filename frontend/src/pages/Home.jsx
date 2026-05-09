import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaShieldAlt,
  FaStethoscope,
  FaUserMd,
} from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";

const heroImg1 =
  "https://images.unsplash.com/photo-1580281658628-7a3cc58d1b40?auto=format&fit=crop&w=1600&q=80";
const heroImg2 =
  "https://images.unsplash.com/photo-1580281798756-dc4e7f2c5f3e?auto=format&fit=crop&w=1600&q=80";

function Home() {
  return (
    <div className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/15 via-cyan-400/10 to-white" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="safe-container py-10 md:py-16 relative">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/70 px-4 py-2 text-sm text-sky-700 shadow-sm backdrop-blur"
              >
                <FaStethoscope className="text-sky-600" />
                <span className="font-medium">
                  Premium Appointment Experience
                </span>
              </motion.div>

              <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                Book appointments with trusted doctors —
                <span className="text-sky-600"> fast</span>,
                <span className="text-cyan-500"> secure</span>, and simple.
              </h1>

              <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
                A modern hospital appointment system built for patients and
                doctors. Schedule care in minutes and manage appointments
                effortlessly.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700"
                >
                  <MdMedicalServices />
                  Book Appointment
                </Link>
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5"
                >
                  <FaUserMd className="text-cyan-600" />
                  Find Doctors
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 shadow-sm ring-1 ring-slate-200 transition hover:bg-white"
                >
                  <FaShieldAlt className="text-sky-600" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 shadow-sm ring-1 ring-slate-200 transition hover:bg-white"
                >
                  <FaHeartbeat className="text-cyan-600" />
                  Register
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid grid-cols-12 gap-3"
                >
                  <div className="col-span-12 md:col-span-7">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={heroImg1}
                        alt="Medical care"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl mt-2 md:mt-0">
                      <img
                        src={heroImg2}
                        alt="Hospital environment"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="absolute -bottom-6 left-6 right-6 md:left-auto md:right-6">
                  <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-lg p-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col">
                        <div className="text-sky-600 font-bold text-lg">
                          Secure
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          JWT protected
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-cyan-500 font-bold text-lg">
                          Fast
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Book in seconds
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sky-700 font-bold text-lg">
                          Managed
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Cancel & view
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="safe-container py-10 md:py-14">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Everything you need for modern care
          </h2>
          <p className="mt-3 text-slate-600">
            Built to reflect the backend-supported features only.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-sky-600/10 text-sky-700 flex items-center justify-center">
                <FaStethoscope />
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  Doctor Directory
                </div>
                <div className="text-sm text-slate-600">
                  Fetch real doctors from the system.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                <MdMedicalServices />
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  Book Appointments
                </div>
                <div className="text-sm text-slate-600">
                  Schedule using doctor, date and time.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-sky-500/10 text-sky-700 flex items-center justify-center">
                <FaHeartbeat />
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  Appointments Dashboard
                </div>
                <div className="text-sm text-slate-600">
                  View and cancel permitted appointments.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur border border-slate-200 px-5 py-3 shadow-sm">
            <FaShieldAlt className="text-sky-600" />
            <span className="text-slate-700 text-sm">
              Authentication is handled via existing JWT flow.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
