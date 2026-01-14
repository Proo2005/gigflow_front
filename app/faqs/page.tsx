import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  {
    q: "What is GigFlow?",
    a: "GigFlow is a freelance marketplace connecting clients and freelancers.",
  },
  {
    q: "Is GigFlow free?",
    a: "Yes, posting jobs and applying is currently free.",
  },
  {
    q: "Can I be both client and freelancer?",
    a: "Yes, users can act as both.",
  },
  {
    q: "How are freelancers hired?",
    a: "Clients review offers and confirm the best one.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-[#1de9b6] mb-10">FAQs</h1>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700"
            >
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
