import { Helmet } from "react-v19-helmet-async";
import { useState, useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";

export default function Certifications() {
  // Certificates List
  const certs = [
    {
      id: 1,
      title: "FIEO Membership Certificate",
      image: "/certifications/FIEO-Certificate-pdf-1024x727.webp",
    },
    {
      id: 2,
      title: "EPCH Membership Certificate",
      image: "/certifications/Certificate-724x1024.webp",
    },
    {
      id: 3,
      title: "GST Registration Certificate",
      image: "/certifications/GST-1-pdf-724x1024.webp",
    },
    {
      id: 4,
      title: "Udyam Registration Certificate",
      image:
        "/certifications/Udyam-Registration-Certificate-1-pdf-724x1024.webp",
    },
  ];

  // Modal state
  const [selectedCert, setSelectedCert] = useState(null);

  // Interactive zoom/pan state
  const [interactive, setInteractive] = useState(false); // default: fit-to-screen view
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [lastDistance, setLastDistance] = useState(null);

  const containerRef = useRef(null);

  // helpers
  const closeModal = () => {
    setSelectedCert(null);
    setInteractive(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setLastDistance(null);
  };

  const getDistance = (touches) => {
    const [t1, t2] = touches;
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  };

  // When user opens modal, reset interactive states
  const openModal = (c) => {
    setSelectedCert(c);
    setInteractive(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setLastDistance(null);
  };

  return (
    <div className="py-16 bg-gray-50">
      <Helmet>
        <title>Certifications | ExportHills</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Home", to: "/" }, { label: "Certifications" }]}
        />

        <h2 className="section-title mb-8">Certifications</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {certs.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer"
              onClick={() => openModal(c)}
            >
              <img
                src={c.image}
                alt={c.title}
                className="h-72 w-auto object-contain mb-4 rounded shadow-sm"
              />
              <h3 className="font-semibold text-gray-800 text-lg">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          onClick={closeModal} // close by clicking outside
        >
          <div
            className="bg-white p-4 rounded-lg max-w-6xl w-full relative flex flex-col items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()} // avoid closing when clicking inside
          >
            {/* Top toolbar: enable/disable interactive zoom + close */}
            <div className="w-full flex justify-between items-center mb-3">
              <div className="flex items-center space-x-3">
                {/* Toggle interactive zoom/pan */}
                <button
                  onClick={() => {
                    setInteractive((v) => {
                      if (!v) {
                        setZoom(1);
                        setPosition({ x: 0, y: 0 });
                      }
                      return !v;
                    });
                  }}
                  className={`px-3 py-1 rounded border text-sm ${
                    interactive
                      ? "bg-[#d28c47] text-white border-[#d28c47]"
                      : "bg-white text-gray-800 border-gray-200"
                  }`}
                >
                  {interactive ? "Disable Zoom" : "Enable Zoom"}
                </button>

                {/* Fit to screen reset */}
                <button
                  onClick={() => {
                    setZoom(1);
                    setPosition({ x: 0, y: 0 });
                    setLastDistance(null);
                  }}
                  className="px-3 py-1 rounded border text-sm bg-white text-gray-800 border-gray-200"
                >
                  Reset View
                </button>
              </div>

              {/* Close */}
              <button
                onClick={closeModal}
                className="text-gray-700 hover:text-black text-2xl font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* VIEW: Fit mode (non-interactive) */}
            {!interactive && (
              <div className="flex justify-center items-center w-full py-2">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  style={{
                    maxWidth: "95%",
                    maxHeight: "82vh",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }}
                  className="rounded shadow-sm"
                />
              </div>
            )}

            {/* VIEW: Interactive zoom/pan mode */}
            {interactive && (
              <div
                ref={containerRef}
                className="flex justify-center items-center w-full h-[80vh] overflow-hidden cursor-grab"
                onWheel={(e) => {
                  e.preventDefault();
                  setZoom((prev) =>
                    e.deltaY < 0 ? Math.min(prev + 0.15, 4) : Math.max(prev - 0.15, 1)
                  );
                }}
                onMouseDown={(e) => {
                  setIsDragging(true);
                  setStartPos({
                    x: e.clientX - position.x,
                    y: e.clientY - position.y,
                  });
                }}
                onMouseMove={(e) => {
                  if (isDragging) {
                    setPosition({
                      x: e.clientX - startPos.x,
                      y: e.clientY - startPos.y,
                    });
                  }
                }}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onDoubleClick={() => {
                  setZoom(1);
                  setPosition({ x: 0, y: 0 });
                }}
                onTouchStart={(e) => {
                  if (e.touches.length === 2) {
                    setLastDistance(getDistance(e.touches));
                  } else if (e.touches.length === 1) {
                    setIsDragging(true);
                    setStartPos({
                      x: e.touches[0].clientX - position.x,
                      y: e.touches[0].clientY - position.y,
                    });
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches.length === 2) {
                    const distance = getDistance(e.touches);
                    if (lastDistance) {
                      const delta = distance - lastDistance;
                      setZoom((prev) =>
                        delta > 0 ? Math.min(prev + 0.03, 4) : Math.max(prev - 0.03, 1)
                      );
                    }
                    setLastDistance(distance);
                  } else if (e.touches.length === 1 && isDragging) {
                    setPosition({
                      x: e.touches[0].clientX - startPos.x,
                      y: e.touches[0].clientY - startPos.y,
                    });
                  }
                }}
                onTouchEnd={() => {
                  setIsDragging(false);
                  setLastDistance(null);
                }}
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="object-contain rounded transition-transform duration-100"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    willChange: "transform",
                    maxWidth: "none",
                    maxHeight: "none",
                  }}
                />
              </div>
            )}

            {/* Title */}
            <h3 className="mt-4 text-center font-semibold text-gray-800 text-lg">
              {selectedCert.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
