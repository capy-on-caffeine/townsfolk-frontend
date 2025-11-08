import { motion } from 'framer-motion';
import { Button } from './Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-linear-to-r from-[#9b0e0e]/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-radial from-[#9b0e0e]/20 to-transparent opacity-50 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-[#9b0e0e] animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Idea Validation</span>
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Validate your product before it
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#9b0e0e] to-red-500"> hits the market</span>
            </h1>
            <p className="text-xl text-gray-400 mt-4 max-w-2xl">
              Validate your startup idea with diverse, AI-generated personas. Get detailed feedback and insights that help you iterate faster and build with confidence.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-12">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="secondary">See How It Works</Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 border border-white/10 rounded-2xl p-8 backdrop-blur-sm bg-white/5"
          >
            {[
              { value: '1,000+', label: 'Ideas Validated' },
              { value: '5,000+', label: 'AI Personas' },
              { value: '97%', label: 'Founder Satisfaction' },
              { value: '24/7', label: 'Instant Feedback' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};