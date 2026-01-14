import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-[#1de9b6] mb-6">About GigFlow</h1>

        <p className="text-gray-300 mb-6 leading-relaxed">
          GigFlow is a modern freelance marketplace designed to connect skilled
          freelancers with clients looking for reliable talent. Our platform
          simplifies job posting, bidding, hiring, and communication.
        </p>

        <p className="text-gray-300 mb-6 leading-relaxed">
          Whether you are a client who wants quality work done or a freelancer
          searching for opportunities, GigFlow provides a secure and
          transparent workflow for both.
        </p>

        <h2 className="text-2xl font-semibold text-[#1de9b6] mt-10 mb-4">
          Our Mission
        </h2>

        <p className="text-gray-300 leading-relaxed">
          To make freelancing simple, accessible, and efficient for everyone.
        </p>
      </section>

      <Footer />
    </div>
  );
}
