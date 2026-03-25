import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks: NavLink[] = [
    { name: "Home", href: "//" },
    { name: "Features", href: "/#features" },
    { name: "Process", href: "/#process" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-md transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 border-b border-gray-200">
          
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/assets/logo.png"
              alt="LawAdda Logo"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-gray-900 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300  rounded-lg transition"
            >
              Login
            </Link>

            <Link
              to="/"
              className="bg-gradient-to-b from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black px-5 py-2 text-white rounded-lg transition"
            >
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 text-lg font-medium bg-white/80 backdrop-blur-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)}>
            {link.name}
          </Link>
        ))}

        <Link to="/login" onClick={() => setIsOpen(false)}>
          Login
        </Link>

        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="bg-gradient-to-b from-gray-700 to-gray-900 px-6 py-2 text-white rounded-lg"
        >
          Try Demo
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 rounded-md bg-gradient-to-b from-gray-700 to-gray-900 p-3 text-white"
        >
          <XIcon />
        </button>
      </div>

      {/* Spacer to avoid overlap */}
      <div className="h-16"></div>
    </>
  );
}