"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PortalTransitionProps {
    isActive: boolean;
    onComplete?: () => void;
    originX: number;
    originY: number;
}

export default function PortalTransition({ isActive, onComplete, originX, originY }: PortalTransitionProps) {
    const portalRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!isActive || !portalRef.current) return;

        setIsAnimating(true);
        const portal = portalRef.current;

        // Set initial position at click point
        gsap.set(portal, {
            left: originX,
            top: originY,
        });

        // Create timeline for portal expansion
        const maxDimension = Math.max(window.innerWidth, window.innerHeight) * 1.5;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                onComplete?.();
            }
        });

        // Single smooth expansion
        tl.to(portal, {
            width: maxDimension,
            height: maxDimension,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.in'
        })
            .to(portal, {
                opacity: 0,
                duration: 0.2,
                ease: 'power1.out'
            }, '-=0.1');

        return () => {
            tl.kill();
        };
    }, [isActive, originX, originY, onComplete]);

    if (!isActive && !isAnimating) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[10000]">
            <div
                ref={portalRef}
                className="absolute w-0 h-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 opacity-0"
                style={{
                    willChange: 'width, height, opacity',
                }}
            />
        </div>
    );
}
