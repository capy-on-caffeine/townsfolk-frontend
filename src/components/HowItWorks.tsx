'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';

const steps = [
  {
    title: "1. Describe Your Idea",
    description: "Share your startup idea, product concept, or business model in detail. The more information you provide, the better insights you'll receive.",
    icon: "💡",
  },
  {
    title: "2. Generate Personas",
    description: "Our AI creates diverse personas representing your target market, each with unique backgrounds, needs, and perspectives.",
    icon: "👥",
  },
  {
    title: "3. Get Feedback",
    description: "Receive comprehensive feedback from each persona, including market fit analysis, potential concerns, and improvement suggestions.",
    icon: "📊",
  },
  {
    title: "4. Take Action",
    description: "Use the actionable insights to refine your idea, pivot if needed, and make data-driven decisions for your business.",
    icon: "🚀",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Get valuable feedback on your startup idea in four simple steps
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-4xl bg-linear-to-r from-violet-600 to-indigo-600 rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button size="lg">
            Try It Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}