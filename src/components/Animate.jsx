import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
export default function Animate({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
