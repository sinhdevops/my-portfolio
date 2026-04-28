"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";

export function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		mass: 0.5,
	});

	const [isVisible, setIsVisible] = useState<boolean>(false);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setIsVisible(latest > 0.01);
	});

	return (
		<motion.div
			className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-purple-500 to-pink-500"
			style={{ scaleX }}
			animate={{ opacity: isVisible ? 1 : 0 }}
			transition={{ opacity: { duration: 0.3 } }}
		/>
	);
}
