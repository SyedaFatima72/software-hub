"use client";

import Image from "next/image";
import type { Template } from "../types/template";

interface Props {
  template: Template;
}

const TemplateCard = ({ template }: Props) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group flex flex-col">
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

        {/* Tags */}
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
      </div>
    </div>
  );
};

export default TemplateCard;