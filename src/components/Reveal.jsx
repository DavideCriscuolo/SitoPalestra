import { motion } from "framer-motion";

// Ingresso morbido allo scroll; con prefers-reduced-motion il MotionConfig in App lo disattiva.
export default function Reveal({ as = "div", delay = 0, className, children }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
