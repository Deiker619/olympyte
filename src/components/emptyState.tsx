import { motion } from "framer-motion";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <motion.p
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
      className="text-lg font-medium text-center text-gray-500"
    >
      {message}
    </motion.p>
  );
}
