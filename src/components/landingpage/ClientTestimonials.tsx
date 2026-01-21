'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
    id: string;
    name: string;
    caseType: string;
    message: string;
    imageUrl?: string | null;
}

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial, isActive: boolean }) => (
    <div
        className={`relative rounded-3xl p-8 flex flex-col h-full backdrop-blur-md border transition-all duration-300 ${isActive
            ? 'bg-white/90 border-blue-200 shadow-xl'
            : 'bg-white/60 border-transparent shadow-none'
            }`}
    >
        <div className="absolute top-6 right-8 text-blue-100">
            <Quote size={48} className="transform rotate-180" fill="currentColor" />
        </div>

        <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${isActive ? 'border-blue-500' : 'border-gray-200'}`}>
                <Image
                    src={testimonial.imageUrl || '/default-profile.avif'}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <h3 className={`text-lg font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                    {testimonial.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                    {testimonial.caseType}
                </p>
            </div>
        </div>

        <p className={`relative z-10 text-base leading-relaxed ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
            "{testimonial.message}"
        </p>
    </div>
)

export default function ClientTestimonials({ testimonials = [] }: { testimonials?: Testimonial[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Handle empty state
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    // Infinite Scroll Logic
    const [isResizing, setIsResizing] = useState(false);
    const extendedTestimonials = [...testimonials, ...testimonials.slice(0, 3)];

    const handleNext = () => {
        if (isResizing) return;
        setCurrentIndex((prev) => {
            return prev + 1;
        });
    };

    const handlePrev = () => {
        if (isResizing) return;
        if (currentIndex === 0) {
            setIsResizing(true);
            setCurrentIndex(testimonials.length);
            setTimeout(() => {
                setIsResizing(false);
                setCurrentIndex(testimonials.length - 1);
            }, 50);
            return;
        }
        setCurrentIndex(prev => prev - 1);
    }

    // Auto-reset for infinite loop
    useEffect(() => {
        if (currentIndex === testimonials.length) {
            const timeout = setTimeout(() => {
                setIsResizing(true);
                setCurrentIndex(0);
                requestAnimationFrame(() => setIsResizing(false));
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, testimonials.length]);


    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length, handleNext]);

    const dragEndHandler = (event: any, info: any) => {
        if (info.offset.x < -100) {
            handleNext();
        } else if (info.offset.x > 100) {
            handlePrev();
        }
        setIsAutoPlaying(true);
    };

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gray-50">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl translate-y-1/4" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        Every Case. Every Voice. <br />
                        <span className="text-blue-600">Every Victory.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Don't just take our word for it. Hear what our clients have to say about their experience with Vyska Legal.
                    </motion.p>
                </div>

                {/* Mobile/Tablet Carousel (Draggable) */}
                <div className="lg:hidden">
                    <motion.div
                        className="flex gap-4"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={dragEndHandler}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full min-w-[300px]"
                            >
                                <TestimonialCard testimonial={testimonials[currentIndex % testimonials.length]} isActive={true} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Mobile Controls */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={handlePrev} // Changed to handlePrev
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md active:scale-95 transition-all text-gray-700"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="flex items-center text-sm font-medium text-gray-500">
                            {(currentIndex % testimonials.length) + 1} / {testimonials.length}
                        </span>
                        <button
                            onClick={handleNext} // Changed to handleNext
                            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md active:scale-95 transition-all text-gray-700"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Desktop Carousel (Simple Sliding Track) */}
                <div className="hidden lg:block relative overflow-hidden px-4 -mx-4">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{
                                x: `-${currentIndex * (100 / 3)}%`
                            }}
                            transition={{
                                duration: isResizing ? 0 : 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            {extendedTestimonials.map((testimonial, idx) => (
                                <div
                                    key={`${testimonial.id}-${idx}`}
                                    className="w-1/3 flex-shrink-0 px-4"
                                >
                                    <TestimonialCard
                                        testimonial={testimonial}
                                        isActive={true} // Simple mode: all active
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons for Desktop */}
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-0 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 transition-all text-gray-900 z-30"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-0 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-gray-50 transition-all text-gray-900 z-30"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="hidden lg:flex justify-center gap-2 mt-12">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setIsResizing(false);
                                setCurrentIndex(idx);
                                setIsAutoPlaying(false);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${(currentIndex % testimonials.length) === idx ? 'w-8 bg-blue-600' : 'w-2 bg-blue-200 hover:bg-blue-300'
                                }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
