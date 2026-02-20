import PropTypes from "prop-types";
import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      // Use 'initial' and 'exit' to create a "slide up" and "fade away" effect
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      // 'willChange' hints to the browser to use the GPU for smoother animation
      style={{ willChange: "opacity, transform" }}
      transition={{ 
        // Entrance uses a spring for a "premium" feel
        type: "spring",
        damping: 25,
        stiffness: 200,
        // Exit is faster and linear to keep the UI feeling responsive
        exit: { duration: 0.2, ease: "easeIn" }
      }}
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTransition;