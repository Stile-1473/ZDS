import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            <motion.div
                className="
                    fixed inset-0
                    bg-black/40 backdrop-blur-sm
                    flex items-center justify-center
                    z-[999999]

                    pointer-events-auto
                "
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="
                        w-[90%] max-w-lg
                        bg-white/60 backdrop-blur-xl
                        shadow-xl rounded-2xl border h-fit border-white/40
                        p-6 relative
                    "
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-blue-500">
                            {title}
                        </h2>
                        <button
                            className="p-2 rounded-full hover:bg-red-200 transition"
                            onClick={onClose}
                        >
                            <X className="w-5 h-5  text-gray-600" />
                        </button>
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto pr-1 custom-scroll">
                        {children}
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.getElementById("modal-root")
    );
};

export default Modal;
