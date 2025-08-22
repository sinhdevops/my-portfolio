import { Github, Mail, Facebook } from "lucide-react";
import { SiZalo } from "react-icons/si";

export const CONTACTS = [
	{
		href: "https://github.com/levansinh",
		target: "_blank",
		rel: "noopener noreferrer",
		icon: <Github className="h-5 w-5" />,
		label: "GitHub",
	},
	{
		href: "mailto:lesinh3005@gmail.com",
		icon: <Mail className="h-5 w-5" />,
		label: "Email",
	},
	{
		href: "https://zalo.me/0325610016",
		target: "_blank",
		rel: "noopener noreferrer",
		icon: <SiZalo className="h-5 w-5" />,
		label: "Zalo",
	},
	{
		href: "https://www.facebook.com/sinh.levan.39589",
		target: "_blank",
		rel: "noopener noreferrer",
		icon: <Facebook className="h-5 w-5" />,
		label: "Facebook",
	},
];
