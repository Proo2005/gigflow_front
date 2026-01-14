import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-[#1de9b6] mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-300 mb-4">
          By using GigFlow, you agree to follow all applicable rules and
          regulations. Users are responsible for maintaining the accuracy of
          their information.
        </p>

        <p className="text-gray-300 mb-4">
          GigFlow is not responsible for disputes between users. All agreements
          are made directly between clients and freelancers.
        </p>

        <p className="text-gray-300">
          We reserve the right to update these terms at any time.
        </p>
      </section>

      <Footer />
    </div>
  );
}
