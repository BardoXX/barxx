"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  // Laad reCAPTCHA script
  useEffect(() => {
    console.log("Laden reCAPTCHA...");

    const loadRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
              action: "submit",
            })
            .then((token) => {
              console.log("reCAPTCHA token ontvangen:", token);
              setRecaptchaToken(token);
            })
            .catch((error) => console.error("reCAPTCHA error:", error));
        });
      }
    };

    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = loadRecaptcha;

      document.body.appendChild(script);

      return () => {
        script.onload = null;
        document.body.removeChild(script);
      };
    } else {
      loadRecaptcha();
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Naam is verplicht";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Ongeldig emailadres";
    if (!formData.subject.trim()) newErrors.subject = "Onderwerp is verplicht";
    if (!formData.message.trim()) newErrors.message = "Bericht is verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatusMessage(null); // Reset statusbericht

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit" }
      );
      setRecaptchaToken(token);

      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Verzenden mislukt");

      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatusMessage({ type: "success", text: "Melding succesvol verstuurd!" });
      toast.success("Melding succesvol verstuurd!");
    } catch (error) {
      setStatusMessage({ type: "error", text: error.message || "Er is een fout opgetreden" });
      toast.error(error.message || "Er is een fout opgetreden");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Je naam"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Je emailadres"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.subject ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Onderwerp"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Typ je bericht hier..."
            rows="5"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 font-medium"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Versturen...
            </span>
          ) : (
            "Verstuur Bericht"
          )}
        </button>
      </form>

      {statusMessage && (
        <p className={`mt-4 text-center font-medium ${statusMessage.type === "success" ? "text-green-500" : "text-red-500"}`}>
          {statusMessage.text}
        </p>
      )}
    </div>
  );
}
