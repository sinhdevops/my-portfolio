"use client";

import {
	SiReact,
	SiNextdotjs,
	SiJavascript,
	SiNodedotjs,
	SiTailwindcss,
	SiGit,
	SiExpress,
	SiTypescript,
	SiReactquery,
} from "react-icons/si";
import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const SKILL = [
	{ icon: <SiReact color="#61DAFB" /> },
	{ icon: <SiNextdotjs color="#fff" /> },
	{ icon: <SiJavascript color="#F7DF1E" /> },
	{ icon: <SiNodedotjs color="#68A063" /> },
	{ icon: <SiTailwindcss color="#38B2AC" /> },
	{ icon: <SiGit color="#F05133" /> },
	{ icon: <SiExpress color="#fff" /> },
	{ icon: <SiTypescript color="#3178C6" /> },
	{ icon: <SiReactquery color="#ff00ff" /> },
];

// custom hook
function useSkillTransform(rotation: MotionValue<number>, i: number, total: number) {
	const x = useTransform(rotation, (r) => Math.cos((i / total) * 2 * Math.PI + r) * 120);
	const y = useTransform(rotation, (r) => Math.sin((i / total) * 2 * Math.PI + r) * 120);
	return { x, y };
}

// tách thành component riêng để gọi hook hợp lệ
function SkillIcon({
	rotation,
	index,
	total,
	icon,
}: {
	rotation: MotionValue<number>;
	index: number;
	total: number;
	icon: React.ReactNode;
}) {
	const { x, y } = useSkillTransform(rotation, index, total);

	return (
		<motion.div
			className="absolute text-4xl"
			style={{ x, y }}
			whileHover={{
				scale: 1.5,
				rotate: 15,
				filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
			}}
		>
			{icon}
		</motion.div>
	);
}

export function CreativeHero() {
	const rotation = useMotionValue(0);
	const reqRef = useRef<number>(0);

	useEffect(() => {
		const animate = () => {
			rotation.set(rotation.get() + 0.01);
			reqRef.current = requestAnimationFrame(animate);
		};
		reqRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(reqRef.current!);
	}, [rotation]);

	return (
		<div className="relative mx-auto flex h-[400px] w-[400px] items-center justify-center">
			<div className="absolute h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
			<div className="absolute h-52 w-52 rounded-full border border-purple-400/30 blur-sm"></div>

			{SKILL.map((skill, i) => (
				<SkillIcon key={i} rotation={rotation} index={i} total={SKILL.length} icon={skill.icon} />
			))}
		</div>
	);
}
