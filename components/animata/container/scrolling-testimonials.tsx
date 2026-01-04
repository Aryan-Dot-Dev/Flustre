import { Marquee, MarqueeContent, MarqueeItem } from "../../ui/marquee";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
    name: string;
    image: string;
    description: string;
}

interface TestimonialProps {
    data: Testimonial[];
}

function TestimonialCard({
    testimonial: { image, name, description },
}: {
    testimonial: Testimonial;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={cn(
                "cursor-target relative w-96 overflow-hidden rounded-2xl border group transition-all duration-500 backdrop-blur-sm",
                !isHovering ? "border-white/10 bg-white/[0.02]" : "border-white/20 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20",
                !isHovering && "grayscale saturate-[0.2] brightness-[0.8]"
            )}
            key={name}
        >
            {/* Radial gradient glow on hover */}
            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
                }}
            />
            
            <div className={cn(
                "relative z-10 p-6 transition-all duration-500",
                !isHovering && "opacity-70"
            )}>
                {/* Quote Icon */}
                <svg 
                    className="w-8 h-8 text-white/20 mb-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>

                {/* Testimonial Text */}
                <p className="text-white/90 text-sm leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10 flex-shrink-0">
                        <img 
                            src={image} 
                            alt={name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{name}</p>
                        <p className="text-white/50 text-xs truncate">Founder of BAC</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ScrollingTestimonials({ data }: TestimonialProps) {
    return (
        <div className="w-full overflow-x-hidden space-y-4">
            <Marquee>
                <MarqueeContent pauseOnHover={true} direction="left">
                    {data.map((testimonial) => (
                        <MarqueeItem key={testimonial.name}>
                            <TestimonialCard testimonial={testimonial} />
                        </MarqueeItem>
                    ))}
                </MarqueeContent>
            </Marquee>

            <Marquee>
                <MarqueeContent pauseOnHover={true} direction="right">
                    {data.map((testimonial) => (
                        <MarqueeItem key={testimonial.name}>
                            <TestimonialCard testimonial={testimonial} />
                        </MarqueeItem>
                    ))}
                </MarqueeContent>
            </Marquee>

            <Marquee>
                <MarqueeContent pauseOnHover={true} direction="left">
                    {data.map((testimonial) => (
                        <MarqueeItem key={testimonial.name}>
                            <TestimonialCard testimonial={testimonial} />
                        </MarqueeItem>
                    ))}
                </MarqueeContent>
            </Marquee>
        </div>
    );
}
