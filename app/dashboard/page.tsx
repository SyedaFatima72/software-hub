import Navbar from "../components/Navbar";
import TemplateCard from "../components/TemplateCard";
import { templates } from "../data/templates";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
              Software Templates
            </h1>
            <p className="mt-6 text-gray-500 text-lg md:text-xl max-w-3xl mx-auto">
              Explore our premium collection of website & software templates. 
              Find the perfect solution for your next project.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}