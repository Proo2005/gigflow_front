import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-[#1de9b6] mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-300 mb-4">
          GigFlow respects your privacy. We collect only the information
          necessary to operate the platform.
        </p>

        <p className="text-gray-300 mb-4">
          Your data is never sold to third parties and is stored securely.
        </p>

        <p className="text-gray-300">
          By using GigFlow, you consent to our privacy practices.
        </p>
      </section>

      <Footer />
    </div>
  );
}
