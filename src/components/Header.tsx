import { ModeToggle } from "./theme-provider/mode-toggle";

export function Header() {
  return (
    <div>
      <h1 className="text-primary mb-2 text-center text-4xl font-bold">
        Dummy Data Generator
      </h1>
      <span className="absolute top-4 right-4">
        <ModeToggle />
      </span>
    </div>
  );
}
