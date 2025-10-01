import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../apiConfig";

export default function Navbar() {
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [hoverCategoryIndex, setHoverCategoryIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [categories, setCategories] = useState([]);
  const timerRef = useRef(null);

  const location = useLocation();

  // Fetch categories + products
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Auto-close menu on route change
  useEffect(() => {
    if (mobileOpen || isProductsOpen) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setMobileOpen(false);
        setProductsOpen(false);
        setOpenCategory(null);
        setHoverCategoryIndex(null);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  // Hover handlers for desktop
  const handleMouseEnterProducts = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setProductsOpen(true), 200);
  };

  const handleMouseLeaveProducts = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setProductsOpen(false);
      setOpenCategory(null);
      setHoverCategoryIndex(null);
    }, 400);
  };

  // Close menu on product click
  const handleProductClick = () => {
    setProductsOpen(false);
    setOpenCategory(null);
    setHoverCategoryIndex(null);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logos/logoeh.png"
            alt="ExportHills Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="nav-link hover:text-[#d28c47]">
            Home
          </Link>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterProducts}
            onMouseLeave={handleMouseLeaveProducts}
          >
            <button className="nav-link hover:text-[#d28c47]">
              Our Products ▾
            </button>

            {isProductsOpen && (
              <div
                className="absolute left-0 mt-2 flex"
                style={{
                  minHeight: "auto",
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {/* Category list panel */}
                <div className="relative w-56 bg-white shadow-lg rounded-l-md border border-gray-300 z-20">
                  {categories.map((cat, index) => (
                    <div
                      key={cat._id}
                      className={`px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                        openCategory === cat._id ? "bg-gray-100" : ""
                      }`}
                      onMouseEnter={() => {
                        setOpenCategory(cat._id);
                        setHoverCategoryIndex(index);
                      }}
                      style={{ minHeight: "40px" }}
                    >
                      <Link
                        to={`/categories/${cat._id}`}
                        className="flex-1 hover:text-[#d28c47]"
                        onClick={() => {
                          setProductsOpen(false);
                          setOpenCategory(null);
                          setHoverCategoryIndex(null);
                        }}
                      >
                        {cat.name}
                      </Link>
                      <span>›</span>
                    </div>
                  ))}
                </div>

                {/* Products submenu panel */}
                {openCategory !== null && hoverCategoryIndex !== null && (
                  <div
                    className="absolute left-full w-56 bg-white shadow-lg rounded-r-md border border-gray-300"
                    style={{
                      top: `${hoverCategoryIndex * 40}px`,
                      minHeight: "40px",
                      zIndex: 30,
                    }}
                  >
                    {categories
                      .find((cat) => cat._id === openCategory)
                      ?.products?.map((prod) => (
                        <Link
                          key={prod._id}
                          to={`/products/${prod._id}`}
                          onClick={handleProductClick}
                          className="block px-4 py-2 hover:bg-gray-100 hover:text-[#d28c47] text-sm text-gray-700"
                        >
                          {prod.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/gallery" className="nav-link hover:text-[#d28c47]">
            Gallery
          </Link>
          <Link to="/about" className="nav-link hover:text-[#d28c47]">
            About Us & Certifications
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-md bg-[#d28c47] text-white hover:bg-[#b87436] transition flex items-center gap-1"
          >
            Contact Us →
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {(mobileOpen || isClosing) && (
        <div
          className={`md:hidden bg-white shadow-lg p-4 space-y-3 absolute top-16 left-0 w-full transition-all duration-300 ${
            mobileOpen && !isClosing
              ? "translate-y-0 opacity-100"
              : "-translate-y-5 opacity-0"
          }`}
        >
          <Link to="/" className="block text-gray-700">
            Home
          </Link>
          <Link to="/about" className="block text-gray-700">
            About Us & certifications
          </Link>

          {/* Accordion for Mobile */}
          <div>
            <button
              className="w-full text-left text-gray-700 font-semibold flex justify-between items-center"
              onClick={() => setProductsOpen(!isProductsOpen)}
            >
              Our Products {isProductsOpen ? "▾" : "▸"}
            </button>

            {isProductsOpen && (
              <div className="pl-4 space-y-2 transition-all duration-300">
                {categories.map((cat) => (
                  <div key={cat._id}>
                    <span
                      className="block font-medium text-gray-600 cursor-pointer flex justify-between items-center"
                      onClick={() =>
                        setOpenCategory(
                          openCategory === cat._id ? null : cat._id
                        )
                      }
                    >
                      {cat.name}
                      <span>{openCategory === cat._id ? "▾" : "▸"}</span>
                    </span>

                    {openCategory === cat._id && (
                      <div className="pl-4 space-y-1 transition-all duration-300">
                        {cat.products?.map((prod) => (
                          <Link
                            key={prod._id}
                            to={`/products/${prod._id}`}
                            onClick={handleProductClick} // close on click
                            className="block pl-4 text-gray-500 hover:text-[var(--brand-primary)]"
                          >
                            {prod.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/gallery" className="block text-gray-700">
            Gallery
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 rounded-md bg-[#d28c47] text-white hover:bg-[#b87436] transition flex items-center gap-1"
          >
            Contact Us →
          </Link>
        </div>
      )}
    </nav>
  );
}
