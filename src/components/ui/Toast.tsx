import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string | null;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-bg-elevated border border-border-custom px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-sm font-medium text-text-white">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
