"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { memo, useEffect, useMemo, useState } from "react";

const gradients = [
	{ from: "#a78bfa", to: "#ec4899" },
	{ from: "#ec4899", to: "#a78bfa" },
	{ from: "#60a5fa", to: "#a78bfa" },
	{ from: "#a78bfa", to: "#3b82f6" },
	{ from: "#ec4899", to: "#f97316" },
	{ from: "#f97316", to: "#ec4899" },
];

const TEXT = "Em Sinh Kay";
const LETTERS = TEXT.split("");

export const AnimatedName = memo(function AnimatedName() {
	const [index, setIndex] = useState<number>(0);

	const sparkles = useMemo(
		() =>
			Array.from({ length: 4 }).map((_, i) => ({
				initialX: (i * 37 - 55) % 150,
				initialY: (i * 23 - 30) % 80,
				animX: (i * 61 - 75) % 250,
				animY: (i * 47 - 60) % 150,
				duration: 5 + (i % 3),
				delay: i * 0.8,
			})),
		[],
	);

	const progress = useMotionValue(0);
	const smoothProgress = useSpring(progress, { stiffness: 40, damping: 20 });

	const fromColor = useTransform(
		smoothProgress,
		[0, 1],
		[gradients[index].from, gradients[(index + 1) % gradients.length].from],
	);

	const toColor = useTransform(
		smoothProgress,
		[0, 1],
		[gradients[index].to, gradients[(index + 1) % gradients.length].to],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			progress.set(0);
			progress.set(1);
			setTimeout(() => {
				setIndex((prev) => (prev + 1) % gradients.length);
				progress.set(0);
			}, 1000);
		}, 5000);
		return () => clearInterval(interval);
	}, [progress]);

	const backgroundImage = useTransform(
		[fromColor, toColor],
		([from, to]) => `linear-gradient(to right, ${from}, ${to})`,
	);

	return (
		<motion.span
			className="relative inline-block"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1, ease: "easeOut" }}
		>
			{LETTERS.map((letter, i) => (
				<motion.span
					key={i}
					className="inline-block bg-clip-text text-transparent"
					style={{ backgroundImage, backgroundSize: "200% 200%" }}
					initial={{ opacity: 0, y: 30, rotateX: -90 }}
					animate={{ opacity: 1, y: 0, rotateX: 0 }}
					transition={{
						duration: 0.8,
						delay: i * 0.01,
						ease: "easeOut",
					}}
					whileHover={{
						scale: 1.3,
						rotateY: 15,
						transition: { duration: 0.3, ease: "easeOut" },
					}}
				>
					{letter === " " ? " " : letter}
				</motion.span>
			))}

			<motion.div
				className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-xl"
				animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.08, 1] }}
				transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
			/>

			{sparkles.map((s, i) => (
				<motion.div
					key={i}
					className="absolute h-1.5 w-1.5 rounded-full bg-yellow-300"
					initial={{ x: s.initialX, y: s.initialY, opacity: 0, scale: 0 }}
					animate={{ x: s.animX, y: s.animY, opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
					transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
				/>
			))}

			<motion.div
				className="absolute right-0 -bottom-3 left-0 h-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
			/>
		</motion.span>
	);
});
