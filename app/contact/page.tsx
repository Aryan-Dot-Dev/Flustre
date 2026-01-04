"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";
import PixelSnow from "@/components/PixelSnow";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });

        setTimeout(() => setSubmitStatus("idle"), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="relative min-h-screen bg-[#05050a] font-sans text-neutral-100 overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#05050a]">
                    <PixelSnow
                        color="#a78bfa"
                        flakeSize={0.012}
                        minFlakeSize={1.5}
                        pixelResolution={180}
                        speed={0.8}
                        depthFade={10}
                        farPlane={25}
                        brightness={1.2}
                        gamma={0.5}
                        density={0.25}
                        variant="snowflake"
                        direction={125}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <header className="w-full px-6 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-2xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                                <Mail className="w-8 h-8 text-purple-400" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Let&apos;s Talk
                            </h1>
                            <p className="text-lg text-white/70 max-w-lg mx-auto">
                                Ready to transform your customer communication? We&apos;re here to help you get started.
                            </p>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                        placeholder="Acme Inc."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us about your needs..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>

                                {submitStatus === "success" && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center">
                                        Thanks! We&apos;ll get back to you soon.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 text-center">
                            <p className="text-white/60 text-sm">
                                Or reach us directly at{" "}
                                <a href="mailto:hello@flustre.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    hello@flustre.com
                                </a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
