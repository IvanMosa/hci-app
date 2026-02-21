"use client";

import { useState } from "react";
import { X, ImagePlus } from "lucide-react";
import { useCreateJob } from "@/api/job/useCreateJob";
import { useUploadJobImage } from "@/api/upload/useUploadImage";
import { toast } from "react-toastify";
import Image from "next/image";

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
  const { mutateAsync: createJob, isPending } = useCreateJob(onClose);
  const { mutateAsync: uploadJobImage, isPending: isUploading } =
    useUploadJobImage();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "web_development",
    description: "",
    budget: "",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};
    const trimmedTitle = formData.title.trim();
    const trimmedDesc = formData.description.trim();

    if (!trimmedTitle) {
      newErrors.title = "Title is required";
    } else if (trimmedTitle.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (trimmedTitle.length > 100) {
      newErrors.title = "Title must be at most 100 characters";
    }

    if (!trimmedDesc) {
      newErrors.description = "Description is required";
    } else if (trimmedDesc.length < 50) {
      newErrors.description = `Description must be at least 50 characters (${trimmedDesc.length}/50)`;
    } else if (trimmedDesc.length > 500) {
      newErrors.description = "Description must be at most 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/^image\/(jpeg|png|gif|webp)$/)) {
        toast.error("Only image files (JPEG, PNG, GIF, WebP) are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (!formData.budget) {
      toast.error("Please enter a budget");
      return;
    }

    try {
      const job = await createJob({
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        budget: Number(formData.budget),
        clientId,
      });

      if (imageFile && job?.id) {
        await uploadJobImage({ jobId: job.id, file: imageFile });
      }
    } catch {}
  };

  const inputStyles =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all";
  const labelStyles = "block text-sm font-bold mb-2 text-[#070415]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[800px] p-5 sm:p-8 md:p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black"
          aria-label="close button"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#070415]">
          New project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <label className={labelStyles}>Title</label>
              <input
                type="text"
                placeholder="Project title"
                className={`${inputStyles} ${errors.title ? "border-red-400 focus:ring-red-400" : ""}`}
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                maxLength={100}
                required
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
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
              placeholder="Describe your project (50–500 characters)"
              className={`${inputStyles} h-32 resize-none ${errors.description ? "border-red-400 focus:ring-red-400" : ""}`}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description)
                  setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              maxLength={500}
              required
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="text-red-500 text-xs">{errors.description}</p>
              ) : (
                <span />
              )}
              <span
                className={`text-xs ${formData.description.trim().length > 500 ? "text-red-500" : "text-gray-400"}`}
              >
                {formData.description.trim().length}/500
              </span>
            </div>
          </div>

          <div>
            <label className={labelStyles}>Project Image</label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Project preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-all bg-gray-50">
                  <ImagePlus size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-medium">
                    Click to upload an image
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    JPEG, PNG, GIF or WebP (max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-10 py-3 rounded-full border border-gray-300 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="px-12 py-3 rounded-full bg-[#070415] text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400"
            >
              {isPending || isUploading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
