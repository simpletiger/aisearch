"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Watch for HubSpot form submission (success message appears)
  useEffect(() => {
    if (!isOpen || !formRef.current) return;

    const observer = new MutationObserver(() => {
      if (formRef.current) {
        const successEl = formRef.current.querySelector('.submitted-message');
        if (successEl) {
          setSubmitted(true);
        }
      }
    });

    observer.observe(formRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isOpen]);

  // Reset submitted state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-8 shadow-2xl shadow-black/50 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Header - hidden after successful submission */}
              {!submitted && (
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold gradient-text mb-2">
                    Stay Ahead of the Shift
                  </h3>
                  <p className="text-white text-sm">
                    Get monthly AI search insights delivered to your inbox. No spam, just data.
                  </p>
                </div>
              )}

              {/* HubSpot Form Container */}
              <div 
                ref={formRef}
                className="hs-form-frame hubspot-form-container" 
                data-region="na1" 
                data-form-id="17388829-1101-4ce2-a09b-c97ae0c9e17f" 
                data-portal-id="20896464"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
