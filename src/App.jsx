import "./App.css";
import Greeting from "./Greeting";
import Card from "./Card";

function App() {
	const tips = [
		"Take one small action before aiming for perfect results.",
		"Focus on progress, not pressure.",
		"Pause, breathe, and restart with clarity when struck",
		"Protect your energy by finishing one task at a time.",
	];
	return (
		<>
			<h1>HelloWorld</h1>
			<Greeting name="John Doe" />

			<Card title="Motivational Tips" className="tips-block">
				<ul className="tip-list">
					{tips.map((tip, index) => (
						<li key={index}>{tip}</li>
					))}
				</ul>
			</Card>
		</>
	);
}

export default App;
