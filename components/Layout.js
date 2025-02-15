// components/Layout.js
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
          <Link href="/">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Quiz Master
            </p>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      {/* Add padding-top to avoid content being hidden behind navbar */}
      <main>
        {children}
      </main>
    </div>
  );
}
