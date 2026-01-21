'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroSlide {
    id: string;
    title: string;
    highlight?: string | null;
    description?: string | null;
    buttonText?: string | null;
    buttonLink?: string | null;
    imageUrl: string;
    order: number;
    type?: string;
    bgColor?: string | null;
}

export default function HeroCarousel({ slides = [] }: { slides?: HeroSlide[] }) {
    const [[page, direction], setPage] = useState([0, 0])
    const [paused, setPaused] = useState(false)

    // Wrap the index to support infinite cyclic pagination for any length of slides
    const slideIndex = Math.abs(page % slides.length)
    const currentSlide = slides[slideIndex]

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection])
    }

    const goToSlide = (index: number) => {
        // Calculate direction based on current and target index to animate correctly
        // This is a simplified direction logic for jump-to-slide
        const direction = index > slideIndex ? 1 : -1
        setPage([index + (page - slideIndex), direction])
    }

    useEffect(() => {
        if (!paused) {
            const timer = setInterval(() => {
                paginate(1)
            }, 5000)
            return () => clearInterval(timer)
        }
    }, [page, paused])


    if (!slides || slides.length === 0) return null;

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            zIndex: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    return (
        <div
            className="relative w-full overflow-hidden group"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x)

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1)
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1)
                            }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {currentSlide.type === 'fullBackground' ? (
                            <div className="w-full h-full relative">
                                <img
                                    src={currentSlide.imageUrl}
                                    alt={currentSlide.title}
                                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                    draggable={false}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgColor ? 'from-black/80 via-black/40 to-transparent' : 'from-black/80 via-black/40 to-transparent'}`} />
                                <div className="absolute inset-0 bg-black/20" />

                                <div className="h-full flex items-center px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8 md:py-12 relative z-10">
                                    <div className="text-white space-y-3 sm:space-y-4 md:space-y-6 max-w-lg lg:max-w-xl">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                                        >
                                            {currentSlide.title}
                                            <br />
                                            <span className="text-blue-400">{currentSlide.highlight}</span>
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed drop-shadow-md"
                                        >
                                            {currentSlide.description}
                                        </motion.p>
                                        {currentSlide.buttonText && currentSlide.buttonLink && (
                                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                                <Link href={currentSlide.buttonLink}>
                                                    <button className="bg-white text-gray-900 px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-lg text-sm md:text-base">
                                                        {currentSlide.buttonText}
                                                    </button>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`w-full h-full flex flex-col lg:flex-row bg-gradient-to-br ${currentSlide.bgColor || 'from-blue-900 to-slate-900'}`}>
                                <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12 relative z-10">
                                    <div className="text-white space-y-3 sm:space-y-4 md:space-y-6 max-w-lg lg:max-w-xl">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                                        >
                                            {currentSlide.title}
                                            <br />
                                            <span className="text-blue-400">{currentSlide.highlight}</span>
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-md"
                                        >
                                            {currentSlide.description}
                                        </motion.p>
                                        {currentSlide.buttonText && currentSlide.buttonLink && (
                                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                                <Link href={currentSlide.buttonLink}>
                                                    <button className="mt-4 bg-white text-gray-900 px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-lg text-sm md:text-base">
                                                        {currentSlide.buttonText}
                                                    </button>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 relative h-48 sm:h-56 md:h-64 lg:h-full overflow-hidden">
                                    <div className="w-full h-full lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
                                        <img
                                            src={currentSlide.imageUrl}
                                            alt={currentSlide.title}
                                            className="object-cover absolute inset-0 w-full h-full pointer-events-none"
                                            draggable={false}
                                        />
                                        <div className="absolute inset-0 bg-black/20 lg:hidden" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center py-3 sm:py-4 md:py-5 lg:py-6 bg-white">
                <div className="flex space-x-2 md:space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${slideIndex === index
                                ? 'bg-blue-600 scale-125'
                                : 'bg-gray-400 hover:bg-gray-500'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={slideIndex === index}
                        />
                    ))}
                </div>
            </div>
        </div >
    )
}
