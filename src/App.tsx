import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { ThemeProvider } from "./components/theme-provider/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-dark relative flex h-full min-h-screen w-screen flex-col items-center gap-2 p-4">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
