"use client";

import { createTimeline, stagger, text } from "animejs";
import { useEffect } from "react";

import { FloatingNav } from "@/components/floating-nav";
import AboutMeSection from "./_components/about-me";
import HeroSection from "./_components/hero";
import SkillSection from "./_components/skill";
import ProjectSection from "./_components/project";
import ExperienceSection from "./_components/experience";
import ContactSection from "./_components/contact";

export default function Portfolio() {
	useEffect(() => {
		const { chars } = text.split("#description", {
			chars: {
				wrap: "clip",
				clone: "bottom",
			},
		});

		createTimeline().add(
			chars,
			{
				y: "-100%",
				loop: true,
				loopDelay: 3750,
				duration: 750,
				ease: "inOut(2)",
			},
			stagger(150, { from: "first" }),
		);
	}, []);

	return (
		<>
			{/* Floating Nav */}
			<FloatingNav />

			{/* Hero Section */}
			<HeroSection />

			{/* About Section */}
			<AboutMeSection />

			{/* Skills Section */}
			{/* <SkillSection /> */}

			{/* Projects Section */}
			<ProjectSection />

			{/* Experience Section */}
			<ExperienceSection />

			{/* Contact Section */}
			<ContactSection />
		</>
	);
}
