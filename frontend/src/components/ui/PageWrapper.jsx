import { motion } from "framer-motion";

export const PageWrapper = ({ children }) => {
  return (
    <div className="page-bg px-4 py-6 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};