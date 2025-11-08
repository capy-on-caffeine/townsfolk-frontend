'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';

export default function Home() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div 
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
              <span className="block text-white">Validate your startup idea with</span>
              <span className="block text-[#9b0e0e] mt-2">AI-powered personas</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Get authentic feedback on your startup idea from diverse AI-generated personas. 
              Validate your assumptions and iterate faster with targeted audience insights.
            </p>
            <div className="mt-10 flex gap-4 sm:justify-center lg:justify-start">
              {!isAuthenticated && (
                <>
                  <Button onClick={() => loginWithRedirect()}>
                    Get Started
                  </Button>
                  <Button variant="secondary">
                    Learn More
                  </Button>
                </>
              )}
              {isAuthenticated && (
                <Button onClick={() => window.location.href = '/ideas/new'}>
                  Submit New Idea
                </Button>
              )}
            </div>
          </motion.div>
          
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            {/* Placeholder for future image or animated demo */}
            <div className="bg-black/20 backdrop-blur rounded-xl h-[400px] flex items-center justify-center border border-white/10">
              <p className="text-gray-400">Demo visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
