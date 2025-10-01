import { Helmet } from "react-v19-helmet-async";

import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

export default function Gallery() {
  const images = [
    "/gallery/gallery1.webp",
    "/gallery/gallery2.webp",
    "/gallery/gallery3.webp",
    "/gallery/gallery4.webp",
    "/gallery/gallery5.webp",
    "/gallery/gallery6.webp",
    "/gallery/gallery7.webp",
    "/gallery/gallery8.webp",
    "/gallery/gallery9.webp",
    "/gallery/gallery10.webp",
  ];
  return (
    <div className="py-16">
      <Helmet>
        <title>Gallery | ExportHills</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        />

        <h2 className="section-title">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="card">
              <img
                src={src}
                alt={`img-${idx}`}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
