import { useState } from "react";
import { Helmet } from "react-v19-helmet-async";
import axios from "axios";
import { BASE_URL } from "../apiConfig";
import Breadcrumb from "../components/Breadcrumb";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let tempErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(formData.email.trim())
    ) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/contact`, formData);
      alert("✅ Thank you for contacting us!");
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <Helmet>
        <title>Contact Us | ExportHills Global</title>
        <meta name="description" content="Get in touch with ExportHills for trade inquiries." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

        <h2 className="section-title">Contact</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <div className="contact-panel">
            <h3 className="font-semibold text-lg mb-2">Get In Touch</h3>
            <p className="text-sm text-gray-600 mb-4">
              Fill the form and we'll respond within 24-48 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`contact-input ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Your name"
                  required
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`contact-input ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Email address"
                  required
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`contact-input h-36 ${errors.message ? "border-red-500" : ""}`}
                  placeholder="Message"
                  required
                />
                {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="contact-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Office Info + Map */}
          <div>
            <div className="bg-[#d28c47] text-white p-6 rounded-lg mb-6">
              <h4 className="font-semibold">Office</h4>
              <p className="text-sm mt-2">
                03, Sampurna Platina, Kuha, Sundarpada, Bhubaneswar, Odisha, 751002
              </p>
              <p className="text-sm mt-2">📧 sales.exporthills@gmail.com</p>
              <p className="text-sm mt-2">📞 +919976033033</p>
            </div>

            <iframe
              title="ExportHills Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.3715003870557!2d85.78617798070576!3d20.201877867336023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7005f06e4b3%3A0x1f105d56642ce63c!2sSampurna%20Platina%20Homes!5e0!3m2!1sen!2sin!4v1758973856153!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
