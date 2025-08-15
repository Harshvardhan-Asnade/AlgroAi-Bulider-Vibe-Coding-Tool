
'use client';

import { motion } from 'framer-motion';
import Logo from '../ui/logo';

export default function IntroAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.5,
      },
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
    },
  };
  
  const bylineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' }
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={logoVariants} className="intro-logo-container">
        <Logo className="text-7xl md:text-8xl lg:text-9xl" />
      </motion.div>
      <motion.div variants={bylineVariants} className="mt-4 text-center">
        <p className="text-lg text-muted-foreground tracking-widest">by Harsh</p>
      </motion.div>
    </motion.div>
  );
}
