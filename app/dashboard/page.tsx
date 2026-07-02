"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Plus, Edit, Trash2 } from "lucide-react";
import TemplateForm from "../components/TemplateForm";

interface Template {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  userId: string;
}

export default function Dashboard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchTemplates(parsedUser.id);
  }, [router]);

  const fetchTemplates = async (userId: string) => {
    try {
      const res = await fetch(`/api/templates?userId=${userId}`);
      const data = await res.json();
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTemplate = async (template: Omit<Template, "id" | "userId">) => {
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...template,
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setTemplates([data, ...templates]);
        setIsModalOpen(false);
        alert("Template created successfully!");
      } else {
        alert(data.error || "Failed to create template");
      }
    } catch (error) {
      console.error("Error adding template:", error);
      alert("Failed to add template");
    }
  };

  const editTemplate = async (updatedTemplate: Template) => {
    try {
      const res = await fetch(`/api/templates`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedTemplate,
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const updated = templates.map((t) =>
          t.id === data.id ? data : t
        );
        setTemplates(updated);
        setIsModalOpen(false);
        setEditingTemplate(null);
        alert("Template updated successfully!");
      } else {
        alert(data.error || "Failed to update template");
      }
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Failed to update template");
    }
  };

  const deleteTemplate = async (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      try {
        const res = await fetch(`/api/templates?id=${id}&userId=${user.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const filtered = templates.filter((t) => t.id !== id);
          setTemplates(filtered);
          alert("Template deleted successfully!");
        } else {
          alert("Failed to delete template");
        }
      } catch (error) {
        console.error("Error deleting template:", error);
        alert("Failed to delete template");
      }
    }
  };

  const openEditModal = (template: Template) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Templates</h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome, {user?.name}!
              </p>
            </div>
            <span className="text-sm text-gray-500">
              {templates.length} templates
            </span>
          </div>

          {/* Templates Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add New Template Card - Plus Icon */}
            <div
              onClick={() => {
                setEditingTemplate(null);
                setIsModalOpen(true);
              }}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#00B140] transition-all duration-300 flex items-center justify-center min-h-[400px] cursor-pointer hover:shadow-lg group"
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 group-hover:bg-[#00B140]/10 transition-all duration-300 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-10 h-10 text-gray-400 group-hover:text-[#00B140] transition-all duration-300" />
                </div>
                <p className="text-gray-500 font-medium group-hover:text-[#00B140] transition-all duration-300">
                  Add New Template
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Click to upload
                </p>
              </div>
            </div>

            {/* Template Cards */}
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                  {template.image ? (
                    <Image
                      src={template.image}
                      alt={template.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight break-words">
                    {template.title || "Untitled"}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed break-words flex-1">
                    {template.description || "No description"}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-100">
                    {template.tags?.length > 0 ? (
                      template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-green-100 text-[#00B140] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No tags</span>
                    )}
                  </div>

                  {/* Action Buttons - Edit & Delete */}
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(template);
                      }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTemplate(template.id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {templates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No templates yet. Click the <span className="text-[#00B140] font-semibold">+</span> button to add your first template!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <TemplateForm
          onClose={() => {
            setIsModalOpen(false);
            setEditingTemplate(null);
          }}
          onSave={(template) => {
            if (editingTemplate) {
              editTemplate({ ...template, id: editingTemplate.id, userId: user.id });
            } else {
              addTemplate(template);
            }
          }}
          initialData={editingTemplate || undefined}
        />
      )}
    </>
  );
}