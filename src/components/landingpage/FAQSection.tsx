'use client'

import { useState } from 'react'
import { ChevronDown, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export default function FAQSection({ faqs = [] }: { faqs?: FAQ[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    if (!faqs || faqs.length === 0) return null;

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gray-50">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl translate-y-1/4" />
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        Focus on Your Business. <br />
                        <span className="text-blue-600">We'll Handle the Rest.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Answers to common questions about our legal services and process.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group rounded-2xl transition-all duration-300 ${openIndex === index
                                    ? 'bg-white shadow-xl ring-1 ring-blue-100'
                                    : 'bg-white/60 hover:bg-white hover:shadow-lg ring-1 ring-transparent'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                                aria-expanded={openIndex === index}
                            >
                                <span className={`text-lg font-semibold transition-colors duration-300 ${openIndex === index ? 'text-blue-700' : 'text-gray-800'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${openIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500'
                                    }`}>
                                    {openIndex === index ? (
                                        <Minus size={18} />
                                    ) : (
                                        <Plus size={18} />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-0">
                                            <div className="h-px w-full bg-gray-100 mb-4" />
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
