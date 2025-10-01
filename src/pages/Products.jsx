
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Helmet} from "react-v19-helmet-async";

import { BASE_URL } from "../apiConfig";


export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="py-16">
      <Helmet>
        <title>Products | ExportHills</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Products</h2>
        <div className="services-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
