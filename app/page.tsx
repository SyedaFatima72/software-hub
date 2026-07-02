import { prisma } from "../app/lib/prisma";
import Navbar from "./components/Navbar";
import Image from "next/image";

// This is a Server Component - fetches data directly from database
export default async function Home() {
  // Fetch ALL templates from ALL users
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  // Convert tags from string to array
  const formattedTemplates = templates.map((template) => ({
    id: template.id,
    image: template.image,
    title: template.title,
    description: template.description,
    tags: template.tags ? template.tags.split(",") : [],
    sellerName: template.user?.name || "Anonymous",
  }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800">Browse Templates</h1>
            <p className="mt-4 text-gray-500 text-lg">
              Explore all templates created by our community
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {formattedTemplates.length} templates available
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedTemplates.length > 0 ? (
              formattedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {template.image ? (
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 break-words">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      By: {template.sellerName}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed break-words line-clamp-3">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                      {template.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-green-100 text-[#00B140] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16">
                <p className="text-gray-400 text-lg">
                  No templates available yet. Be the first to create one!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}