import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CycleText() {
    const words = ["like", "to"];
    const [index, setIndex] = useState(0);

    const total = words.length;
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % total);
        }, 2500);
        return () => clearInterval(interval);
    }, [total]);

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                <motion.h2
                    key={`words_${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3, ease: [0.405, 0, 0.025, 1] }}
                    style={{ fontSize: '42px' }}
                    className="font-semibold text-white leading-[1.1]"
                >
                    {words[index]} humans
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}
