// components/Layout.js
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main>{children}</main>
    </div>
  );
}
