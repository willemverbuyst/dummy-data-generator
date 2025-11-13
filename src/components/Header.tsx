import { ThemeToggle } from "./theme-provider/ThemeToggle";

export function Header() {
  return (
    <div>
      <h1 className="text-primary mb-2 text-center text-4xl font-bold">
        Dummy Data Generator
      </h1>
      <span className="absolute top-4 right-4">
        <ThemeToggle />
      </span>
    </div>
  );
}
