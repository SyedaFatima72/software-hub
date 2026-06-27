"use client";

import Image from "next/image";
import { Template } from "../types/template";
import { useState } from "react";

interface Props {
  template: Template;
}

const TemplateCard = ({ template }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden relative">
        <Image
          src={template.image}
          alt={template.title}
          width={600}
          height={350}
          className={`w-full h-56 object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute top-4 right-4 bg-[#00B140] text-white px-3 py-1 rounded-full text-sm font-semibold">
          {template.category}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{template.title}</h2>
        <p className="text-[#00B140] font-semibold mt-1">
          Website No: {template.websiteNo}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-green-100 text-[#00B140] text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-500 mt-4 leading-7 line-clamp-3">
          {template.description}
        </p>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-gray-700 hover:bg-gray-800 text-white rounded-lg py-3 font-semibold transition hover:shadow-lg">
            View Demo
          </button>
          <button className="flex-1 bg-[#00B140] hover:bg-green-700 text-white rounded-lg py-3 font-semibold transition hover:shadow-lg hover:-translate-y-1">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;