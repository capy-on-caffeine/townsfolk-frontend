'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import React from 'react';

const steps = [
    {
        title: '1. Describe Your Idea',
        description:
            'Share your startup idea, product concept, or business model in detail. The more information you provide, the better insights you\'ll receive.',
        icon: (
            <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden>
                <defs>
                    <linearGradient id='g1' x1='0' x2='1'>
                        <stop offset='0' stopColor='#FDE68A' />
                        <stop offset='1' stopColor='#F59E0B' />
                    </linearGradient>
                </defs>
                <path
                    d='M9 18h6v2a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-2z'
                    fill='url(#g1)'
                />
                <path
                    d='M12 2a6 6 0 0 0-4 10.9V14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1.1A6 6 0 0 0 12 2z'
                    fill='url(#g1)'
                />
            </svg>
        ),
    },
    {
        title: '2. Generate Personas',
        description:
            'Our AI creates diverse personas representing your target market, each with unique backgrounds, needs, and perspectives.',
        icon: (
            <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden>
                <defs>
                    <linearGradient id='g2' x1='0' x2='1'>
                        <stop offset='0' stopColor='#A78BFA' />
                        <stop offset='1' stopColor='#60A5FA' />
                    </linearGradient>
                </defs>
                <path
                    d='M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                    fill='url(#g2)'
                />
                <path
                    d='M4 20a6 6 0 0 1 16 0v1H4v-1z'
                    fill='url(#g2)'
                />
            </svg>
        ),
    },
    {
        title: '3. Get Feedback',
        description:
            'Receive comprehensive feedback from each persona, including market fit analysis, potential concerns, and improvement suggestions.',
        icon: (
            <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden>
                <defs>
                    <linearGradient id='g3' x1='0' x2='1'>
                        <stop offset='0' stopColor='#34D399' />
                        <stop offset='1' stopColor='#10B981' />
                    </linearGradient>
                </defs>
                <path
                    d='M3 13h4v7H3zM10 8h4v12h-4zM17 3h4v17h-4z'
                    fill='url(#g3)'
                />
            </svg>
        ),
    },
    {
        title: '4. Take Action',
        description:
            'Use the actionable insights to refine your idea, pivot if needed, and make data-driven decisions for your business.',
        icon: (
            <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden>
                <defs>
                    <linearGradient id='g4' x1='0' x2='1'>
                        <stop offset='0' stopColor='#60A5FA' />
                        <stop offset='1' stopColor='#7C3AED' />
                    </linearGradient>
                </defs>
                <path
                    d='M2 12l10 9 10-9-10-9L2 12z'
                    fill='url(#g4)'
                />
                <path
                    d='M12 8v8'
                    stroke='rgba(255,255,255,0.9)'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                />
            </svg>
        ),
    },
];

export function HowItWorks() {
    return (
        <section className='relative py-24 bg-black'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-16'
                >
                    <h2 className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
                        How It Works
                    </h2>
                    <p className='mt-4 text-xl text-gray-400'>
                        Get valuable feedback on your startup idea in four simple steps
                    </p>
                </motion.div>

                <div className='mt-16'>
                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-4'>
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className='relative h-full'
                            >
                                <div
                                    className='p-6 mx-2 rounded-2xl overflow-hidden flex flex-col items-start text-left h-full'
                                    style={{
                                        minHeight: '300px', // Set fixed minimum height
                                        width: '100%', // Ensure full width
                                        background:
                                            'linear-gradient(315deg, rgba(255,0,0,0.08), rgba(255,0,0,0.02))',
                                        border: '1px solid rgba(255,70,70,0.18)',
                                        boxShadow:
                                            '0 8px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        transition: 'all .18s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                                            '0 12px 40px rgba(2,6,23,0.7), 0 0 30px rgba(255,70,70,0.12), inset 0 1px 0 rgba(255,255,255,0.02)';
                                        (e.currentTarget as HTMLDivElement).style.background =
                                            'linear-gradient(315deg, rgba(255,0,0,0.12), rgba(255,0,0,0.03)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.transform = '';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                                            '0 8px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)';
                                        (e.currentTarget as HTMLDivElement).style.background =
                                            'linear-gradient(315deg, rgba(255,0,0,0.08), rgba(255,0,0,0.02)';
                                    }}
                                >
                                    <div
                                        className='w-20 h-20 mb-4 flex items-center justify-center rounded-[22px] p-2 self-center md:self-start'
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,0,0,0.05))', // Original gradient
                                            border: '1px solid rgba(255,70,70,0.2)',
                                            boxShadow: '0 6px 20px rgba(255,0,0,0.15)',
                                            backdropFilter: 'blur(6px)',
                                            WebkitBackdropFilter: 'blur(6px)',
                                        }}
                                    >
                                        <div className='text-white transform scale-150'>{step.icon}</div>
                                    </div>

                                    <h3 className='text-xl font-semibold text-white mb-3 w-full'>
                                        {step.title}
                                    </h3>
                                    <p className='text-gray-300 text-sm w-full flex-grow'>{step.description}</p>
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
                    className='mt-16 text-center'
                >
                    <Button size='lg'>Try It Now</Button>
                </motion.div>
            </div>
        </section>
    );
}