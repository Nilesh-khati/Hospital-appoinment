import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner({ text = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        className="text-sky-600 text-3xl"
      >
        <FaSpinner />
      </motion.div>
      <div className="text-sm text-slate-600">{text}...</div>
    </div>
  );
}

