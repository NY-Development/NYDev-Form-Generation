import { motion } from "framer-motion";
import { pageFade } from "../utils/motionPresets";

const OrgSettings = () => (
  <motion.div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display" {...pageFade}>
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight mb-2">Settings</h1>
      <p className="text-slate-500 dark:text-slate-400">Update organization preferences and members.</p>
    </div>
  </motion.div>
);

export default OrgSettings;
