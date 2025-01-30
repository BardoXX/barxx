"use client"; // Belangrijk!

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { toggleDarkMode, darkMode } = useTheme();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
}