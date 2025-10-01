import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav className="text-sm mb-6 text-gray-600">
      {items.map((item, index) => (
        <span key={index}>
          {item.to ? (
            <Link to={item.to} className="hover:text-[var(--brand-primary)] font-bold">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-bold">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
