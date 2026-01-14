import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-[#1de9b6] mb-8">Contact Us</h1>

        <p className="text-gray-300 mb-6">
          Have questions or feedback? We’d love to hear from you.
        </p>

        <div className="space-y-4 text-gray-300">
          <p>
            <strong>Email:</strong> support@gigflow.com
          </p>
          <p>
            <strong>Support Hours:</strong> Mon – Fri (10 AM – 6 PM IST)
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
