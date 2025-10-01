import { Helmet } from "react-v19-helmet-async";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../apiConfig";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Auto-slide gallery images
  const operationImages = [
    "/gallery/gallery4.webp",
    "/gallery/gallery5.webp",
    "/gallery/gallery7.webp",
    "/gallery/gallery8.webp",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % operationImages.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home | ExportHills Global</title>
        <meta
          name="description"
          content="ExportHills Global connects Indian agricultural, leather, and handcrafted products with worldwide markets."
        />
      </Helmet>

      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title">We Deal With</h2>
          <div className="services-grid">
            {categories.map((cat) => (
              <ProductCard
                key={cat._id}
                product={{
                  _id: cat._id,
                  name: cat.name,
                  image: cat.image,
                }}
                link={`/categories/${cat._id}`} // ✅ goes to CategoryPage.jsx
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="section-title">Why Choose Us?</h2>
            <ul className="space-y-4 mt-6 text-lg text-gray-700">
              <li>✅ Wide range of agricultural, handcrafted & leather products</li>
              <li>✅ High-quality products sourced directly from trusted suppliers</li>
              <li>✅ Strong global network for exports</li>
              <li>✅ Committed to timely delivery and customer satisfaction</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="/banners/WhyChooseUs.webp"
              alt="Our Infrastructure"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Operations Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Carousel */}
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg bg-white flex flex-col justify-center">
            <img
              src={operationImages[current]}
              alt="Operations"
              className="w-full h-full object-cover transition-all duration-700"
            />

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {operationImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${
                    current === idx ? "bg-[#d28c47]" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="section-title">Our Operations</h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              At ExportHills, our operations are streamlined to ensure smooth
              procurement, packaging, and global distribution. We maintain high
              standards in every step, ensuring our products meet international
              quality benchmarks.
            </p>
            <ul className="mt-6 space-y-3 text-lg text-gray-700">
              <li>📦 Modern warehousing & packaging facilities</li>
              <li>🚚 Efficient supply chain & logistics management</li>
              <li>🌍 Global distribution with trusted partners</li>
              <li>🔍 Rigorous quality checks at every stage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Approved By Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="section-title mb-10">Approved By</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            <img src="/logos/apeda.webp" alt="APEDA" className="h-16 mx-auto" />
            <img src="/logos/ecgc.webp" alt="ECGC" className="h-16 mx-auto" />
            <img src="/logos/epch.webp" alt="EPCH" className="h-16 mx-auto" />
            <img src="/logos/fieo.webp" alt="FIEO" className="h-16 mx-auto" />
            <img src="/logos/fssai.webp" alt="FSSAI" className="h-16 mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}
