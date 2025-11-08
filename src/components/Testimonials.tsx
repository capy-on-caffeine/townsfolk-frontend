'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    content: "Using this platform completely changed how we approached our market validation. The AI personas provided insights we hadn't even considered.",
    author: "Sarah Chen",
    role: "Founder, TechStart",
    avatar: "/avatars/sarah.jpg"
  },
  {
    content: "The speed and depth of feedback is incredible. We were able to pivot our strategy based on the insights and saw immediate results.",
    author: "Marcus Johnson",
    role: "CEO, InnovateCo",
    avatar: "/avatars/marcus.jpg"
  },
  {
    content: "The diverse perspectives from AI personas helped us identify and fix critical gaps in our product before launch. Absolutely invaluable.",
    author: "Elena Rodriguez",
    role: "Product Lead, FutureScale",
    avatar: "/avatars/elena.jpg"
  }
];

export function Testimonials() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Trusted by Innovators
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            See how founders and teams are using our platform to validate their ideas
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 bg-gray-900 rounded-2xl"
              >
                <div className="relative">
                  <p className="text-lg text-gray-300 italic mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <Image
                        className="h-12 w-12 rounded-full"
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-semibold text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}