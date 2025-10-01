import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Hero({
  title = "Passion for Global Trade",
  subtitle = `Welcome to ExportHills Global Private Limited – Your trusted partner for international sourcing and exports.`,
  ctaText = "Contact Us",
  ctaLink = "/contact",
}) {
  // Use public folder images
  const banners = [
    "/banners/HERO-BANNER-1.webp",
    "/banners/HERO-BANNER-2.webp",
    "/banners/HERO-BANNER-3.webp",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
  };

  return (
    <header className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Carousel */}
      <Slider {...settings} className="h-full">
        {banners.map((img, i) => (
          <div key={i}>
            <div
              className="h-[90vh] bg-cover bg-center"
              style={{
                backgroundImage: img
                  ? `url(${img}), linear-gradient(to right, #1f2937, #111827)`
                  : "linear-gradient(to right, #1f2937, #111827)",
              }}
            ></div>
          </div>
        ))}
      </Slider>

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="font-bold text-2xl md:text-3xl text-white tracking-wide mb-2">
            WHO WE ARE
          </div>
          <h1 className="hero-title text-4xl md:text-6xl text-white font-bold">
            {title}
          </h1>
          <p className="hero-sub text-gray-200 max-w-2xl mx-auto mt-4">
            {subtitle}
          </p>

          <div className="hero-cta-row justify-center mt-6 space-x-4">
            <Link
              to={ctaLink}
              className="px-6 py-3 bg-[#d28c47] text-white rounded-md font-medium hover:bg-[#b87436] transition"
            >
              {ctaText}
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              Our Products
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
