"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useCreateJob } from "@/api/job/useCreateJob";

const JOB_CATEGORIES = [
  { id: "web_development", label: "Web Development" },
  { id: "design", label: "Design" },
  { id: "writing", label: "Writing" },
  { id: "marketing", label: "Marketing" },
  { id: "data_science", label: "Data Science" },
  { id: "other", label: "Other" },
];

interface PostProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
}

export const PostProjectModal = ({
  isOpen,
  onClose,
  clientId,
}: PostProjectModalProps) => {
  const { mutate: createJob, isPending } = useCreateJob(onClose);
  const [formData, setFormData] = useState({
    title: "",
    category: "web_development",
    description: "",
    budget: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJob({
      ...formData,
      budget: Number(formData.budget),
      clientId,
    });
  };

  const inputStyles =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all";
  const labelStyles = "block text-sm font-bold mb-2 text-[#070415]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[20px] w-full max-w-[800px] p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-8 text-[#070415]">New project</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className={labelStyles}>Title</label>
              <input
                type="text"
                placeholder="Project title"
                className={inputStyles}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className={labelStyles}>Budget ($)</label>
              <input
                type="number"
                placeholder="e.g. 1200"
                className={inputStyles}
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className={labelStyles}>Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {JOB_CATEGORIES.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.category === cat.id
                      ? "border-black bg-gray-50 ring-1 ring-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    className="w-4 h-4 accent-black"
                    checked={formData.category === cat.id}
                    onChange={() =>
                      setFormData({ ...formData, category: cat.id })
                    }
                  />
                  <span className="text-sm font-medium text-[#070415]">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={labelStyles}>About project</label>
            <textarea
              placeholder="Write in max. 100 words"
              className={`${inputStyles} h-32 resize-none`}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-10 py-3 rounded-full border border-gray-300 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-12 py-3 rounded-full bg-[#070415] text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400"
            >
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
