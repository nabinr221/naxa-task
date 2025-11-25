import { Link, useLocation } from "react-router";
import { useState } from "react";
import logo from "../../../assets/logo.png";
interface MenuItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      path: "/",
      label: "Home",
      exact: true,
    },
    {
      path: "/users",
      label: "User Form",
    },
    {
      path: "/maps",
      label: "Map viewer",
    },
  ];

  const isActive = (menuItem: MenuItem): boolean => {
    if (menuItem.exact) {
      return location.pathname === menuItem.path;
    }
    return location.pathname.startsWith(menuItem.path);
  };

  const getMenuItemClasses = (menuItem: MenuItem, isMobile = false): string => {
    const baseClasses =
      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";

    const mobileClasses = isMobile ? "block text-base" : "";

    if (isActive(menuItem)) {
      return `${baseClasses} ${mobileClasses} bg-blue-100 text-blue-700 border-l-2 border-blue-500`;
    }

    return `${baseClasses} ${mobileClasses} text-gray-600 hover:text-gray-900 hover:bg-gray-100`;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <div className="w-28 h-auto">
                <img src={logo} alt="" className="w-full h-full contain" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getMenuItemClasses(item)}
                aria-current={isActive(item) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={getMenuItemClasses(item, true)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive(item) ? "page" : undefined}
                >
                  {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                  {item.label}
                  {isActive(item) && <span className="sr-only">(current)</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
