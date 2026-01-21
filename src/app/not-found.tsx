"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState<number>(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center space-y-8"
            >
                {/* 404 Illustration placeholder or Icon */}
                <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-70 animate-pulse"></div>
                        <FileQuestion className="w-32 h-32 text-indigo-600 relative z-10" />
                    </div>
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Page Not Found
                    </h1>
                    <p className="text-lg text-gray-600">
                        Sorry, we couldn’t find the page you’re looking for. It might have been moved or doesn't exist.
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 shadow-sm">
                    <p className="text-gray-500 font-medium mb-4">
                        Redirecting to homepage in <span className="text-indigo-600 font-bold text-xl">{countdown}</span> seconds...
                    </p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                        <motion.div
                            className="bg-indigo-600 h-2 rounded-full"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 10, ease: "linear" }}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go Home Now
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
