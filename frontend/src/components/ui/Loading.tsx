import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: '#27272a',
        borderTopColor: '#10b981',
      }}
    />
  );
}

export function LoadingDots() {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    start: {
      y: 0,
    },
    end: {
      y: -10,
    },
  };

  return (
    <motion.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
          }}
          variants={dotVariants}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        />
      ))}
    </motion.div>
  );
}
