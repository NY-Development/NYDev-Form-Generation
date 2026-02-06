export const pageFade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

export const staggerContainer = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

export const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

export const hoverLift = {
  whileHover: { y: -4, boxShadow: "0 14px 30px rgba(15, 23, 42, 0.12)" }
};
