import { useState, useEffect } from "react";

export default function Greeting({ name = "User" }) {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setNow(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	function greeting() {
		const hour = now.getHours();
		if (hour < 12) return "Good Morning";
		if (hour < 18) return "Good Afternoon";
		return "Good Evening";
	}

	const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
	const currentTime = now.toLocaleTimeString("en-us", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	const hour = now.getHours();

	const moodLine =
		hour < 12
			? "A fresh start is a powerful advantage."
			: hour < 18
				? "This is afternoon"
				: "this is evening ";

	return (
		<header>
			<p>Personalize Greeting</p>
			<h1>
				{greeting()} {name}
			</h1>
			<p>
				This is {dayOfWeek} and the time is {currentTime}
			</p>
			<p>Current hour: {hour}:00</p>
			<p>{moodLine}</p>
		</header>
	);
}
