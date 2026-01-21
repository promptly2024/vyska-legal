'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

export default function MeetOurTeam() {
    const teamMembers = [
        {
            id: 1,
            name: "Vibhu Garg",
            title: "Advocate",
            description: "Designated Partner, with over 10 years of expertise",
            image: "/vibhu.png",
            bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        },
        {
            id: 2,
            name: "Anjana Tiwari",
            title: "Advocate",
            description: "Designated Partner, with over 8 years of expertise",
            image: "/ajana.png",
            bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
        }
    ]

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    }

    return (
        <section className="relative bg-[#1a1a1a] py-20 lg:py-32 text-white overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.1),transparent_25%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(147,51,234,0.05),transparent_25%)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/3 space-y-8 text-center lg:text-left pt-10"
                    >
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
                            MEET OUR<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                TEAM
                            </span>
                        </h2>
                        <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                            The people behind your protection, your progress, and your peace of mind. Experienced professionals dedicated to your legal success.
                        </p>

                        <div className="flex flex-col items-center lg:items-start gap-1 opacity-80">
                            <span className="text-sm tracking-widest text-gray-400 uppercase">Expertise</span>
                            <div className="w-16 h-[1px] bg-gradient-to-r from-white to-transparent"></div>
                        </div>

                        <div className="flex justify-center lg:justify-start pt-4">
                            <Link href="/about?tab=team">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-blue-500/30 hover:border-blue-400 transition-colors duration-300"
                                >
                                    <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300" />
                                    <span className="relative z-10 text-blue-400 font-semibold tracking-wide group-hover:text-blue-300 flex items-center gap-2 cursor-pointer">
                                        View All Members
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Team Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:w-2/3 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-8 lg:gap-10"
                    >
                        {teamMembers.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={itemVariants}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className={`
                                    relative w-full max-w-[320px] 
                                    ${member.bgColor} 
                                    rounded-3xl overflow-hidden
                                    shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                                    border border-white/10
                                    group
                                `}
                            >
                                <div className="flex flex-col items-center pt-10 pb-8 px-6">
                                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 rounded-full overflow-hidden border-4 border-white/90 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>

                                    <div className="text-center space-y-1 z-10">
                                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-900 transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-lg font-medium text-blue-700">
                                            {member.title}
                                        </p>
                                        <div className="w-10 h-0.5 bg-gray-300 mx-auto my-3" />
                                        <p className="text-sm text-gray-600 leading-relaxed px-2">
                                            {member.description}
                                        </p>
                                    </div>

                                    {/* Decorative subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
