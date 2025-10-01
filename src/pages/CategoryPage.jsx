import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-v19-helmet-async";
import Breadcrumb from "../components/Breadcrumb";
import { BASE_URL } from "../apiConfig";

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);

  // ✅ remove `/api` for static assets
  const backendRoot = BASE_URL.replace("/api", "");

  useEffect(() => {
    // Fetch category details
    axios
      .get(`${BASE_URL}/categories/${id}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.error(err));

    // ✅ Correct API endpoint for products by category
    axios
      .get(`${BASE_URL}/products/category/${id}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!category) {
    return <div className="py-16 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="py-16 bg-white">
      <Helmet>
        <title>{category.name} | ExportHills</title>
        <meta
          name="description"
          content={category.description || `Explore ${category.name} from ExportHills.`}
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: category.name },
          ]}
        />

        {/* Category Details */}
        <div className="mb-12">
          <h2 className="section-title">{category.name}</h2>
          {category.image && (
            <img
              src={`${backendRoot}${category.image}`}
              alt={category.name}
              className="w-full h-64 object-cover rounded-lg shadow mb-6"
            />
          )}
          <p className="text-gray-700 leading-relaxed">{category.description}</p>
        </div>

        {/* Products in Category */}
        <h3 className="section-title">Products</h3>
        {items.length > 0 ? (
          <div className="services-grid">
            {items.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
