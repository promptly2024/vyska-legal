'use client'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface CompanyStats {
    yearsExperience?: string | null;
    successRate?: string | null;
    trustedClients?: string | null;
    casesWon?: string | null;
}

const StatCounter = ({ value, label, delay }: { value: string, label: string, delay: number }) => {
    // Extract number and suffix (e.g., "20+")
    const numberMatch = value.match(/\d+/)
    const number = numberMatch ? parseInt(numberMatch[0]) : 0
    const suffix = value.replace(/\d+/, '')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col"
        >
            <div className="flex items-baseline">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-600 mb-2 tabular-nums tracking-tight">
                    {value}
                </span>
            </div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">
                {label}
            </div>
        </motion.div>
    )
}

export default function WhyVyskaExists({ companyStats }: { companyStats?: CompanyStats | null }) {
    const stats = [
        { value: companyStats?.yearsExperience || "20+", label: "Years of experience" },
        { value: companyStats?.successRate || "98%", label: "Success rate" },
        { value: companyStats?.trustedClients || "150+", label: "Trusted clients" },
        { value: companyStats?.casesWon || "500+", label: "Cases won" }
    ]

    return (
        <section className="relative bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative z-10">
                    <div className="max-w-xl w-full space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="flex items-start gap-6">
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: '100%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="w-1.5 bg-gradient-to-b from-blue-600 to-blue-300 rounded-full flex-shrink-0 self-stretch min-h-[100px]"
                                />
                                <div>
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                        Why <span className="text-blue-600">Vyska</span> exists?
                                    </h2>
                                    <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-light">
                                        Learn how our journey, values, and victories shape the way we serve you today.
                                    </p>
                                </div>
                            </div>

                            <div className="pl-8">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Incorporated as a Limited Liability Partnership (LLP) in April 2023,{' '}
                                    <strong className="text-blue-900 font-bold">Vyska Legal</strong>{' '}
                                    has grown into a distinguished full-service law firm with a strategic focus on Prayagraj and the NCR.
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-10 pt-4 pl-8 border-t border-gray-100">
                            {stats.map((stat, index) => (
                                <StatCounter
                                    key={index}
                                    value={stat.value}
                                    label={stat.label}
                                    delay={0.2 + (index * 0.1)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Video Side */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden bg-gray-900"
                >
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply z-10" />

                    {/* Desktop Polygon Mask */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-24 bg-white z-20"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />

                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/vdo.mp4" type="video/mp4" />
                        <source src="/vdo.webm" type="video/webm" />
                    </video>
                </motion.div>
            </div>
        </section>
    )
}