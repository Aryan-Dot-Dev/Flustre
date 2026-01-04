"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import CycleText from "@/components/animata/text/cycle-text";
import Eight from "@/components/animata/bento-grid/eight";
import ScrollingTestimonials from "@/components/animata/container/scrolling-testimonials";
import PixelSnow from "@/components/PixelSnow";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [smoothMousePos, setSmoothMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const router = useRouter();
  const [portalActive, setPortalActive] = useState(false);
  const [portalOrigin, setPortalOrigin] = useState({ x: 0, y: 0 });
  const [clickPortalRadius, setClickPortalRadius] = useState(280);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // Calculate scroll progress over first 80vh
      const heroHeight = window.innerHeight * 0.8;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      const newX = smoothMousePos.x + (mouseRef.current.x - smoothMousePos.x) * 0.25;
      const newY = smoothMousePos.y + (mouseRef.current.y - smoothMousePos.y) * 0.25;
      
      // Only update if the change is significant (more than 0.5px)
      if (Math.abs(newX - smoothMousePos.x) > 0.5 || Math.abs(newY - smoothMousePos.y) > 0.5) {
        setSmoothMousePos({ x: newX, y: newY });
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothMousePos]);

  const testimonials = [
    {
      name: "Sarah Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      description: "Flustre transformed our customer support. Response times dropped by 70% while satisfaction scores soared."
    },
    {
      name: "Michael Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      description: "The AI understands context better than any solution we've tried. It's like having a trained specialist 24/7."
    },
    {
      name: "Emily Watson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      description: "Implementation was seamless. Our team was up and running in days, not months. Game changer for our enterprise."
    },
    {
      name: "David Kim",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      description: "The multilingual support is exceptional. We serve customers in 30+ countries without any communication barriers."
    },
    {
      name: "Lisa Anderson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      description: "Security and compliance were our top concerns. Flustre exceeded all our enterprise requirements."
    }
  ];

  const portalRadius = 280 + scrollProgress * 2220; // 280px to 2500px
  const actualPortalRadius = portalActive ? clickPortalRadius : portalRadius;
  const maskOpacity = 1 - scrollProgress;
  
  // Calculate rim scale based on portal expansion
  const scrollRimScale = 1 + scrollProgress * 3;
  const clickRimScale = portalActive ? (clickPortalRadius / 280) : 1;
  const rimScale = portalActive ? clickRimScale : scrollRimScale;
  const rimOpacity = portalActive ? 1 : Math.max(1 - scrollProgress * 2, 0);
  
  const textScale = 1 + scrollProgress * 0.1;
  const hudOpacity = Math.max(1 - scrollProgress * 1.5, 0);

  const handleTalkToUsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPortalActive(true);
    
    // Animate the portal expansion using GSAP
    const maxDimension = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    gsap.to({ value: clickPortalRadius }, {
      value: maxDimension,
      duration: 0.6,
      ease: 'power2.in',
      onUpdate: function() {
        setClickPortalRadius(this.targets()[0].value);
      },
      onComplete: () => {
        router.push('/contact');
      }
    });
  };

  return (
    <div className="relative bg-[#05050a] font-sans text-neutral-100 overflow-x-hidden">
      {/* Layer 0: PixelSnow Background - Sticky */}
      <div className="sticky top-0 h-screen z-0 bg-[#05050a]">
        <div className="absolute inset-0 bg-[#05050a] pointer-events-none">
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

        {/* Layer 1: Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="text-center"
            style={{
              transform: `scale(${textScale})`,
              transition: 'none',
            }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[88px] leading-[1.1] font-bold tracking-tight">
              <div 
                className="text-white"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI that <span style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px rgba(251,146,60,0.6)' }}>talks</span>
              </div>
            </h1>
            <div className="flex justify-center items-center mt-1">
              <CycleText />
            </div>
            
            <div className="flex gap-4 flex-col items-center mt-6 md:mt-8">
              <p className="text-lg md:text-md font-semibold text-white/80 tracking-wide">
                Enterprise-grade AI Communication
              </p>
              <button 
                onClick={handleTalkToUsClick}
                className="cursor-target w-fit cursor-pointer rounded-full bg-gray-200 px-14 py-4 text-base md:text-lg text-black font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative z-50 pointer-events-auto"
              >
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2: The Mask (Radial Gradient) - NO CSS transitions */}
      {scrollProgress < 1.2 && (
        <div
          className="fixed inset-0 pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle ${actualPortalRadius}px at ${smoothMousePos.x}px ${smoothMousePos.y}px, rgba(0, 0, 0, 0) 0%, transparent 10%, rgba(5, 5, 10, 0.95) 100%)`,
            opacity: maskOpacity,
            transition: 'none',
          }}
        />
      )}

      {/* Layer 3: Glass Lens Rim - NO CSS transitions */}
      {(scrollProgress < 0.6 || portalActive) && (
        <div
          className="fixed pointer-events-none z-40"
          style={{
            left: `${smoothMousePos.x}px`,
            top: `${smoothMousePos.y}px`,
            transform: `translate(-50%, -50%) scale(${rimScale})`,
            opacity: rimOpacity,
            transition: 'none',
          }}
        >
          <div
            className="relative"
            style={{
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 40px rgba(255,255,255,0.2), 0 0 10px rgba(255,255,255,0.06)",
            }}
          >
            {/* Crosshair */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
          </div>
        </div>
      )}
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 flex items-center w-full px-6 py-4 text-white justify-between z-50">
        <div className={`cursor-target uppercase rounded-full text-lg font-bold px-4 py-2 transition-all ${scrolled ? 'border border-neutral-700 bg-black/20 shadow-neutral-400 shadow-lg backdrop-blur-lg' : ''}`}>
          Flustre
        </div>
        <div className={`cursor-target uppercase rounded-full text-sm font-medium px-6 py-2 transition-all ${scrolled ? 'border border-neutral-700 bg-black/20 shadow-neutral-400 shadow-lg backdrop-blur-lg' : ''}`}>
          I want to try
        </div>
      </div>

      {/* Features Section */}
      <section className="w-full bg-[#05050a] px-6 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Eight />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#05050a] px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl mb-16 md:text-5xl font-bold text-center text-white mb-4">
            What our <span className="text-orange-500">Customers</span> say for us
          </h2>
          <ScrollingTestimonials data={testimonials} />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#05050a] border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="text-2xl font-bold text-white mb-4">Flustre</div>
              <p className="text-white/60 text-sm leading-relaxed">
                Enterprise-grade AI Communication platform that understands and responds with human-like nuance.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Features</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Pricing</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">API Documentation</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Integrations</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">About Us</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Careers</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Blog</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Press Kit</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Privacy Policy</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Terms of Service</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">Cookie Policy</a></li>
                <li><a href="#" className="cursor-target text-white/60 hover:text-orange-500 transition-colors text-sm no-underline hover:underline hover:decoration-wavy hover:decoration-orange-500 underline-offset-4">GDPR</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Flustre. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="cursor-target text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="cursor-target text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="cursor-target text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="cursor-target text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}