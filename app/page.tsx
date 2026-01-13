import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-[#121212] to-[#1e1e1e]">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#1de9b6]">
          Find the right freelancer for your job
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12">
          Post a job or get hired by top clients worldwide.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center gap-3 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search jobs by title..."
            className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1de9b6]"
          />
          <button className="px-6 py-3 bg-[#ff5252] rounded-lg hover:bg-[#ff1744] transition">
            Search
          </button>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 px-6 grid md:grid-cols-3 gap-12 text-center">
        <div className="p-6 bg-[#1e1e1e] rounded-xl shadow-lg hover:shadow-[#1de9b6]/50 transition">
          <h3 className="text-2xl font-semibold mb-2 text-[#1de9b6]">
            <a href="/post-job">Post a Job</a>
          </h3>
          <p className="text-gray-300">
            Create a job and receive bids from skilled freelancers.
          </p>
        </div>

        <div className="p-6 bg-[#1e1e1e] rounded-xl shadow-lg hover:shadow-[#ff5252]/50 transition">
          <h3 className="text-2xl font-semibold mb-2 text-[#ff5252]">
            Get Hired
          </h3>
          <p className="text-gray-300">
            Browse jobs and submit bids that match your skills.
          </p>
        </div>

        <div className="p-6 bg-[#1e1e1e] rounded-xl shadow-lg hover:shadow-[#2979ff]/50 transition">
          <h3 className="text-2xl font-semibold mb-2 text-[#2979ff]">
            Hire Smart
          </h3>
          <p className="text-gray-300">
            Review bids and hire the best fit easily.
          </p>
        </div>
      </section>
    </div>
  );
}
