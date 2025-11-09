import { motion } from 'framer-motion';

const features = [
  {
    title: "Diverse AI Personas",
    description: "Get feedback from a variety of AI-generated personas representing different demographics, professions, and mindsets.",
    icon: "🎭",
  },
  {
    title: "In-Depth Analysis",
    description: "Receive detailed insights about your product and its potential market fit.",
    icon: "📊",
  },
  {
    title: "Instant Feedback",
    description: "No more waiting for user research. Get comprehensive feedback within minutes.",
    icon: "⚡",
  },
  {
    title: "Market Insights",
    description: "Understand how your idea fits into the current market landscape and competitive environment.",
    icon: "🎯",
  },
  {
    title: "Actionable Reports",
    description: "Get clear, actionable recommendations to improve your product and go-to-market strategy.",
    icon: "📝",
  },
  {
    title: "Trend Analysis",
    description: "Stay ahead with AI-powered insights about emerging market trends and opportunities.",
    icon: "📈",
  },
];

export const Features = () => {
  return (
    <section className="relative py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#9b0e0e] to-red-500"> Better Validation</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to validate your startup idea and make data-driven decisions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group h-full"
            >
              <div className="relative z-10 p-8 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:scale-[1.02] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-30 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white/90">{feature.title}</h3>
                  <div className="text-3xl">{feature.icon}</div>
                </div>
                <p className="text-white/70 flex-grow">{feature.description}</p>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b0e0e] to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};