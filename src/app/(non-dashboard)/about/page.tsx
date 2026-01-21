"use client";
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Facebook, Target, Eye, Heart, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    biography: string | null;
    photoUrl: string | null;
    createdAt: string;
    updatedAt: string;
    createdById: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    facebook?: string | null;
}

const About = () => {
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Fetch all team members
    const fetchTeamMembers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/team-member');
            if (!response.ok) throw new Error('Failed to fetch team members');
            const data = await response.json();
            setTeamMembers(data);
        } catch (error) {
            toast.error('Error fetching team members', {
                description: (error as Error).message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 border-b border-white/10">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
                    >
                        About <span className="text-blue-200">Vyska Legal</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                    >
                        Delivering modern, ethical, and client-focused legal solutions. Rooted in Prayagraj, serving the National Capital Region and beyond.
                    </motion.p>
                </div>
            </section>

            {/* Introduction & Image */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex-1"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Incorporated as a Limited Liability Partnership in April 2023, <span className="font-semibold text-blue-700">Vyska Legal</span> is a full-service law firm built on the belief that justice, integrity, and professional responsibility form the foundation of effective legal service.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We combine deep legal expertise with contemporary business practices to assist individuals, startups, corporations, and institutions. By integrating rigorous research, practical insight, and technology-enabled processes, we strive to simplify complex legal challenges while maintaining transparency and accountability.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-10"></div>
                                <img
                                    src="/doorpic.png"
                                    alt="About Vyska Legal"
                                    className="relative w-full max-w-md object-contain rounded-2xl shadow-xl border border-gray-100 bg-white p-4"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 bg-gray-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Our Mission",
                                description: "To empower our clients by providing accessible, high-quality, and ethical legal solutions tailored to their unique needs. We are dedicated to upholding justice and fostering trust."
                            },
                            {
                                icon: Eye,
                                title: "Our Vision",
                                description: "To be recognized as a leading law firm known for innovation, research excellence, and a strong commitment to shaping the future of legal practice in India and beyond."
                            },
                            {
                                icon: Heart,
                                title: "Core Values",
                                isList: true,
                                list: ["Integrity", "Client-Centricity", "Excellence", "Collaboration", "Accountability", "Innovation", "Respect", "Social Responsibility"]
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                {item.isList ? (
                                    <div className="flex flex-wrap gap-2">
                                        {item.list?.map((val, i) => (
                                            <span key={i} className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                                {val}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Unique Value Proposition */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-sm overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">Why Choose Vyska Legal?</h2>
                            <p className="text-lg text-gray-700 italic mb-8 max-w-4xl">
                                "Vyska Legal delivers modern, client-focused, and ethical legal solutions. Our experienced team combines deep legal expertise with personalized service, transparent communication, and innovative technology to empower clients."
                            </p>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { title: "Client-Centric Approach", desc: "Tailoring solutions to each client's unique needs." },
                                    { title: "Ethical Practice", desc: "Strict adherence to Bar Council of India rules." },
                                    { title: "Expertise & Innovation", desc: "Diverse expertise complemented by modern legal tech." },
                                    { title: "Local Insight, National Reach", desc: "Deep roots in Prayagraj, connections across major cities." },
                                    { title: "Social Responsibility", desc: "Committed to pro bono work and community engagement." },
                                    { title: "Transparent Communication", desc: "Clear, honest, and regular updates throughout your case." },
                                ].map((prop, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{prop.title}</h4>
                                            <p className="text-sm text-gray-600">{prop.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            Meet Our Team
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            A dynamic collective of lawyers, researchers, and strategists driven by passion for justice and excellence.
                        </motion.p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {teamMembers.length === 0 ? (
                                <div className="col-span-full text-center text-gray-400 text-lg">No team members found.</div>
                            ) : (
                                teamMembers.map(member => (
                                    <motion.article
                                        key={member.id}
                                        variants={fadeInUp}
                                        className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="relative w-32 h-32 mb-6 rounded-full p-1 bg-white ring-2 ring-gray-100 group-hover:ring-blue-100 transition-all duration-300">
                                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                                {member.photoUrl ? (
                                                    <Image
                                                        src={member.photoUrl}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-600 text-3xl font-bold">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h3 className="font-bold text-xl text-gray-900 mb-1">{member.name}</h3>
                                            <p className="text-blue-600 font-medium text-sm mb-4 uppercase tracking-wide">{member.role}</p>

                                            {member.biography && (
                                                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                                    {member.biography}
                                                </p>
                                            )}

                                            {/* Social Links */}
                                            <div className="flex items-center justify-center gap-3 mt-auto">
                                                {member.linkedin && (
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors">
                                                        <Linkedin size={18} />
                                                    </a>
                                                )}
                                                {member.twitter && (
                                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-colors">
                                                        <Twitter size={18} />
                                                    </a>
                                                )}
                                                {member.instagram && (
                                                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors">
                                                        <Instagram size={18} />
                                                    </a>
                                                )}
                                                {member.facebook && (
                                                    <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors">
                                                        <Facebook size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.article>
                                ))
                            )}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to seek legal counsel?</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Contact us today for a confidential consultation and discover how we can help you navigate your legal challenges.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all text-lg"
                        >
                            Contact Us
                        </a>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default About;
