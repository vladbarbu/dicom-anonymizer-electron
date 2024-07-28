import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderIcon } from "lucide-react";
interface LoadingOverlayProps {
    isOpen: boolean;
}

const DirectoryLoadingOverlay: React.FC<LoadingOverlayProps> = ({ isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        backdropFilter: "blur(10px)",
                    }}
                    exit={{
                        opacity: 0,
                        backdropFilter: "blur(0px)",
                    }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <motion.div
                        className="flex items-center justify-center rounded-lg  p-4 shadow-lg "
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 15,
                        }}
                    >
                        <span className="text-lg font-semibold text-black dark:text-white">
                            <LoaderIcon className="animate-spin" />
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DirectoryLoadingOverlay;
