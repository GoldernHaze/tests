import { motion } from 'motion/react';
import { Plane } from 'lucide-react';

export function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-3 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg"
        whileHover={{ 
          boxShadow: "0 10px 25px rgba(30, 64, 175, 0.3)",
          scale: 1.1
        }}
      >
        <Plane className="h-6 w-6 text-white" />
      </motion.div>
      <motion.div
        whileHover={{ x: 2 }}
      >
        <h1 className="text-2xl font-black text-slate-800">
          Career <span className="text-blue-600">Pilot</span>
        </h1>
      </motion.div>
    </motion.div>
  );
}