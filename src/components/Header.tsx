import { CircleQuestionMark } from "lucide-react";
import { ThemeToggle } from "./theme-provider/ThemeToggle";
import { Button } from "./ui/button";

export function Header() {
	return (
		<div>
			<h1 className="text-primary mb-2 text-center text-4xl font-bold">
				Dummy Data Generator
			</h1>
			<div className="absolute top-4 right-4 flex gap-2">
				<ThemeToggle />
				<Button variant="outline" size="icon" asChild>
					<a href="https://github.com/willemverbuyst/dummy-data-generator">
						<CircleQuestionMark />
					</a>
				</Button>
			</div>
		</div>
	);
}
