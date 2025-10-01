// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../apiConfig"; // http://localhost:5000/api

export default function ProductCard({ product, link }) {
  // ✅ remove `/api` for images
  const backendRoot = BASE_URL.replace("/api", "");

  return (
    <div className="card">
      <div className="img-wrap">
        <img
          src={
            product.image
              ? `${backendRoot}${product.image}` // e.g. http://localhost:5000/uploads/Spices.webp
              : "/placeholder.webp"
          }
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <Link
          to={link || `/products/${product._id}`}
          className="inline-block mt-4 px-4 py-2 rounded-md bg-[#d28c47] text-white font-medium hover:bg-[#b87436] transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
