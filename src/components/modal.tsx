import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl"; // Bootstrap-like sizes
}

const sizeClasses = {
  sm: "max-w-sm",  // Small (similar to Bootstrap modal-sm)
  md: "max-w-md",  // Medium (default, Bootstrap normal size)
  lg: "max-w-lg",  // Large (similar to Bootstrap modal-lg)
  xl: "max-w-2xl", // Extra Large (similar to Bootstrap modal-xl)
};

export default function Modal({ isOpen, onClose, title, children, size = "xl" }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault(); // Prevent modal from closing on Esc
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`bg-white p-6 rounded-2xl shadow-lg relative w-full ${sizeClasses[size]}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer"
              onClick={onClose}
            >
              <X size={18} />
            </button>

            {/* Title */}
            {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}

            {/* Content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
