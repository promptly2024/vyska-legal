'use client'

import Link from 'next/link'
import { Instagram, Linkedin, MapPin, Clock, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface CompanyInfo {
    id: string;
    instagramUrl?: string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
    facebookUrl?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    headOffice?: string | null;
    mapUrl?: string | null;
}

export default function FooterClient({ companyInfo }: { companyInfo: CompanyInfo | null }) {
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
        visible: { opacity: 1, y: 0 }
    }

    return (
        <footer className="relative bg-gray-50 border-t border-gray-200 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
                <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl text-blue-100/30" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl translate-y-1/2" />
            </div>

            <div className="relative z-10 py-16 md:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
                    >
                        {/* Brand Column */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div>
                                <h3 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 mb-4 inline-block">
                                    Vyska Legal
                                </h3>
                                <p className="text-gray-600 text-lg max-w-sm leading-relaxed">
                                    Guiding you through life's legal turns with expertise, integrity, and care.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {[
                                    { icon: Instagram, url: companyInfo?.instagramUrl, label: "Instagram" },
                                    { icon: Linkedin, url: companyInfo?.linkedinUrl, label: "LinkedIn" },
                                ].map((social, idx) => social.url ? (
                                    <Link
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 hover:text-blue-600 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} />
                                    </Link>
                                ) : null)}

                                {companyInfo?.twitterUrl && (
                                    <Link
                                        href={companyInfo.twitterUrl}
                                        target="_blank"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 hover:text-blue-600 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                                        aria-label="Twitter"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </Link>
                                )}
                                {companyInfo?.facebookUrl && (
                                    <Link
                                        href={companyInfo.facebookUrl}
                                        target="_blank"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 hover:text-blue-600 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                                        aria-label="Facebook"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </motion.div>

                        {/* Links Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
                            <motion.div variants={itemVariants}>
                                <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    Quick Links
                                </h4>
                                <ul className="space-y-4">
                                    {[
                                        { label: 'User Dashboard', href: '/user' },
                                        { label: 'Admin Dashboard', href: '/admin' },
                                        { label: 'About us', href: '/about' },
                                        { label: 'Blogs', href: '/blogs' },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="group flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                                                <span>{link.label}</span>
                                                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h4 className="text-lg font-bold text-gray-900 mb-6">
                                    Legal
                                </h4>
                                <ul className="space-y-4">
                                    {[
                                        { label: 'Disclaimer', href: '/disclaimer' },
                                        { label: 'Privacy Policy', href: '/privacy-policy' },
                                        { label: 'Terms & Services', href: '/terms-services' },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="group flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                                                <span>{link.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h4 className="text-lg font-bold text-gray-900 mb-6">
                                    Contact
                                </h4>
                                <ul className="space-y-4">
                                    {companyInfo?.email && (
                                        <li>
                                            <a href={`mailto:${companyInfo.email}`} className="flex items-start gap-3 group">
                                                <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                                                    <Mail size={14} />
                                                </div>
                                                <span className="text-gray-600 group-hover:text-blue-700 transition-colors break-all text-sm">
                                                    {companyInfo.email}
                                                </span>
                                            </a>
                                        </li>
                                    )}
                                    {companyInfo?.phone && (
                                        <li>
                                            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3 group">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                                                    <Phone size={14} />
                                                </div>
                                                <span className="text-gray-600 group-hover:text-blue-700 transition-colors text-sm">
                                                    {companyInfo.phone}
                                                </span>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            {companyInfo?.mapUrl && (
                <div className="w-full h-[300px] md:h-[400px] relative mt-8">
                    <div className="absolute inset-0 z-0">
                        <iframe
                            title="Vyska Legal Office Location"
                            src={companyInfo.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        />
                    </div>
                    {/* Overlay Card for Address */}
                    <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-12 md:bottom-12 md:max-w-md">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h5 className="text-lg font-bold text-gray-900 mb-1">Visit Our Office</h5>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        {companyInfo?.headOffice || companyInfo?.address || "New Delhi, Mumbai, Pune, Noida, Lucknow and Prayagraj"}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full w-fit">
                                        <Clock size={14} />
                                        <span>12:00 PM - 08:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Copyright / Bottom Bar */}
            <div className="bg-[#1a1a1a] text-white py-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Vyska Legal. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms-services" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
