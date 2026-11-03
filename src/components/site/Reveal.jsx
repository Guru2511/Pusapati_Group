import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  ul: motion.ul,
  span: motion.span,
  p: motion.p,
};

export default function Reveal({ children, delay = 0, y = 26, className, as = "div", amount = 0.15 }) {
  const reduce = useReducedMotion();
  const Tag = tags[as] || motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay: Math.min(delay, 600) / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}