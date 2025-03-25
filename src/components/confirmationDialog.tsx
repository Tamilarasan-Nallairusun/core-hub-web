import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationDialogProps {
  title?: string;
  message?: string;
  yesText?: string;
  noText?: string;
  onYes: () => void;
  onNo?: () => void;
  isOpen: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  yesText = "Yes",
  noText = "No",
  onYes,
  onNo,
  isOpen,
}) => {
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
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            <p
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={{ __html: message }}
            />

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={onNo}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                {noText}
              </button>
              <button
                onClick={onYes}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {yesText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
