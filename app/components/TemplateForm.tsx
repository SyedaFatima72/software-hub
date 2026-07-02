"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, Plus, Tag, Type, FileText } from "lucide-react";

interface TemplateFormProps {
  onClose: () => void;
  onSave: (template: {
    image: string;
    title: string;
    description: string;
    tags: string[];
  }) => void;
  initialData?: {
    image: string;
    title: string;
    description: string;
    tags: string[];
  };
}

export default function TemplateForm({
  onClose,
  onSave,
  initialData,
}: TemplateFormProps) {
  const [image, setImage] = useState<string>(initialData?.image || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const TITLE_MAX = 50;
  const DESCRIPTION_MAX = 200;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      image: image || "",
      title: title || "Untitled",
      description: description || "No description",
      tags: tags.length > 0 ? tags : ["untagged"],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? "Edit Template" : "Add New Template"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Image
            </label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-6 transition-all cursor-pointer ${
                image
                  ? "border-[#00B140] bg-green-50/50"
                  : "border-gray-300 hover:border-[#00B140] bg-gray-50 hover:bg-green-50/20"
              }`}
            >
              {image ? (
                <div className="relative">
                  <Image
                    src={image}
                    alt="Template preview"
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    Drag & drop an image here
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    or click to browse
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                <Type className="inline w-4 h-4 mr-2" />
                Title
              </label>
              <span className={`text-xs ${title.length > TITLE_MAX ? 'text-red-500' : 'text-gray-400'}`}>
                {title.length}/{TITLE_MAX}
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= TITLE_MAX) {
                  setTitle(e.target.value);
                }
              }}
              className={`w-full px-4 py-3 rounded-xl border ${
                title.length > TITLE_MAX ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 outline-none transition-all`}
              placeholder="Enter template title (max 50 chars)"
              required
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                <FileText className="inline w-4 h-4 mr-2" />
                Description
              </label>
              <span className={`text-xs ${description.length > DESCRIPTION_MAX ? 'text-red-500' : 'text-gray-400'}`}>
                {description.length}/{DESCRIPTION_MAX}
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= DESCRIPTION_MAX) {
                  setDescription(e.target.value);
                }
              }}
              className={`w-full px-4 py-3 rounded-xl border ${
                description.length > DESCRIPTION_MAX ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 outline-none transition-all resize-none`}
              placeholder="Enter template description (max 200 chars)"
              rows={3}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="inline w-4 h-4 mr-2" />
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 outline-none transition-all"
                placeholder="Type a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-[#00B140] text-white rounded-xl hover:bg-green-700 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-[#00B140] rounded-full text-sm font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#00B140] text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-500/30"
            >
              {initialData ? "Update Template" : "Create Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}