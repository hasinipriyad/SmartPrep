import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-18 items-center rounded-full bg-accent-soft transition-colors dark:bg-panel-dark"
    >
      <span
        className={`inline-flex h-7 w-9 items-center justify-center rounded-full bg-white text-accent shadow transition-transform ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {isDark ? <FiMoon size={15} /> : <FiSun size={15} />}
      </span>
    </button>
  );
}