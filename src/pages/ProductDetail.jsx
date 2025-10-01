import { Helmet } from "react-v19-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import { BASE_URL } from "../apiConfig";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const backendRoot = BASE_URL.replace("/api", "");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        return axios.get(
          `${BASE_URL}/products/category/${res.data.categoryId._id}`
        );
      })
      .then((res) => setRelated(res.data.filter((p) => p._id !== id)))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div className="py-16 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-white">
      {/* SEO Meta */}
      <Helmet>
        <title>
          {product.seoMeta?.title || `${product.name} | ExportHills`}
        </title>
        <meta
          name="description"
          content={
            product.seoMeta?.description ||
            `Explore ${product.name} from ExportHills Global.`
          }
        />
      </Helmet>

      {/* Banner Image */}
      <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src={
            product.image
              ? `${backendRoot}${product.image}`
              : "/placeholder.webp"
          }
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {product.name}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: product.name },
          ]}
        />

        {/* Info Section */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-6">
            {product.categoryId?.name}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description || "No description available."}
          </p>

          {/* Highlights */}
          {product.bulletPoints?.length > 0 && (
            <div className="mb-10">
              <h3 className="font-semibold text-xl mb-3 text-[#d28c47]">
                Highlights
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {product.bulletPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications?.length > 0 && (
            <div className="mb-10">
              <h3 className="font-semibold text-xl mb-3 text-[#d28c47]">
                Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-md shadow-sm text-gray-700 text-sm"
                  >
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            to={"/contact"}
            className="px-6 py-3 bg-[#d28c47] text-white rounded-md font-medium hover:bg-[#b87436] transition"
          >
            Enquire Now
          </Link>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="section-title">Related Products</h2>
            <div className="services-grid">
              {related.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block px-6 py-3 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
