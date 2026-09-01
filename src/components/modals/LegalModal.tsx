"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";

interface LegalModalProps {
  title: string | null;
  onClose: () => void;
}

export default function LegalModal({ title, onClose }: LegalModalProps) {
  if (!title) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl rounded-3xl bg-black border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] p-6 sm:p-8 z-10"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <p>
              Welcome to Nahidul Islam&apos;s portfolio. All strategies, development work, and consulting services are delivered with the highest standards of professional integrity, client data privacy, and confidentiality.
            </p>
            <p>
              <strong>Data Protection:</strong> Any information submitted through our contact and consultation forms is strictly used for communication regarding prospective projects. We never sell, rent, or share personal information with third parties.
            </p>
            <p>
              <strong>Intellectual Property:</strong> All custom website code, marketing roadmaps, and digital assets created for clients become the intellectual property of the respective client upon project completion.
            </p>
            <p>
              For any specific inquiries or custom agreements, please reach out directly at <span className="text-cyan-300">Nahidul472005@gmail.com</span>.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-900 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
