// components/ThemeToggle.js
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full focus:outline-none transition"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <FiMoon size={24} className="text-gray-800" />
      ) : (
        <FiSun size={24} className="text-yellow-400" />
      )}
    </button>
  );
}
