'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CircleArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PracticeArea } from '@prisma/client'

interface ServicesClientProps {
    services: PracticeArea[]
}

export default function ServicesClient({ services }: ServicesClientProps) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    const ServiceCard = ({ service, index }: { service: PracticeArea, index: number }) => (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                    {service.title}
                </h3>
                <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-blue-600 transform group-hover:rotate-45 transition-transform duration-300" />
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                {service.description}
            </p>
        </motion.div>
    )

    return (
        <section
            className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden relative"
            style={{
                background: 'linear-gradient(180deg, #EAEFFF 0%, #AFC3FF 100%)'
            }}
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center sm:text-left mb-12 sm:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold font-lato text-gray-900 leading-tight"
                    >
                        <span className="text-blue-700">Our areas of expertise</span>
                        <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-normal text-gray-700">
                            From urgent cases to long-term planning.
                        </span>
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                >
                    {/* Column 1: Services 0-2 */}
                    <div className="flex flex-col gap-6">
                        {services.slice(0, 3).map((service, idx) => (
                            <ServiceCard key={service.id} service={service} index={idx} />
                        ))}
                    </div>

                    <div className="hidden xl:flex flex-col justify-center h-full relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px]">
                        <Image
                            src="/court.png"
                            alt="Legal services"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-8">
                            <p className="text-white text-lg font-medium italic">"Dedicated to protecting your rights and securing your future."</p>
                        </div>
                    </div>

                    {/* Column 3: Services 3-5 (or 3-end) */}
                    <div className="flex flex-col gap-6">
                        {services.slice(3, 6).map((service, idx) => (
                            <ServiceCard key={service.id} service={service} index={idx + 3} />
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center sm:text-right mt-12"
                >
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 text-lg font-semibold text-gray-800 hover:text-blue-700 transition-all px-6 py-3 rounded-full bg-white/50 hover:bg-white active:scale-95 duration-300"
                    >
                        View all services
                        <CircleArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
