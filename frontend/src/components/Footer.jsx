import { FaHospital } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="safe-container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-sky-600/10 text-sky-700 flex items-center justify-center">
            <FaHospital />
          </div>
          <div>
            <div className="font-bold text-slate-900">Hospital Appointment</div>
            <div className="text-sm text-slate-600">
              Premium UI powered by existing backend APIs.
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
