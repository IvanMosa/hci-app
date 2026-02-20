"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Pencil,
  ExternalLink,
  Trash2,
  Plus,
  X,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { EditProfileModal } from "./EditProfileModal";
import { useMyApplications } from "@/api/application/useMyApplications";
import { useCreatePortfolio } from "@/api/portfolio/useCreatePortfolio";
import { useUpdatePortfolio } from "@/api/portfolio/useUpdatePortfolio";
import { useDeletePortfolio } from "@/api/portfolio/useDeletePortfolio";
import { useAllSkills } from "@/api/skill/useAllSkills";
import { useAddFreelancerSkill } from "@/api/skill/useAddFreelancerSkill";
import { useRemoveFreelancerSkill } from "@/api/skill/useRemoveFreelancerSkill";
import {
  useUploadProfileImage,
  useUploadPortfolioImage,
} from "@/api/upload/useUploadImage";
import { toast } from "react-toastify";
import johnDoeImg from "../../../public/john-doe.png";

import nodejsImg from "../../../public/nodejs-original.png";
import reactImg from "../../../public/react-original.png";
import javaImg from "../../../public/java-original.png";
import pgadminImg from "../../../public/pgadmin-original.png";
import html5Img from "../../../public/html5-original.png";
import figmaImg from "../../../public/figma-original.png";

const SKILL_IMAGES: Record<string, StaticImageData> = {
  "Node.js": nodejsImg,
  React: reactImg,
  Java: javaImg,
  PostgreSQL: pgadminImg,
  HTML5: html5Img,
  Figma: figmaImg,
};

const AVAILABLE_SKILL_NAMES = Object.keys(SKILL_IMAGES);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FreelancerProfile = ({ profile }: { profile: any }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(
    null,
  );
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [portfolioImageFile, setPortfolioImageFile] = useState<File | null>(
    null,
  );
  const [portfolioImagePreview, setPortfolioImagePreview] = useState<
    string | null
  >(null);
  const portfolioImageRef = useRef<HTMLInputElement>(null);

  const { data: applications } = useMyApplications(profile?.id || null);
  const createPortfolio = useCreatePortfolio();
  const updatePortfolio = useUpdatePortfolio();
  const deletePortfolio = useDeletePortfolio();
  const { data: allSkills } = useAllSkills();
  const addSkill = useAddFreelancerSkill();
  const removeSkill = useRemoveFreelancerSkill();
  const uploadPortfolioImage = useUploadPortfolioImage();

  const acceptedApps = applications?.filter((app) => app.status === "accepted");
  const balance = acceptedApps?.reduce(
    (sum, app) => sum + Number(app.bidAmount || app.job?.budget || 0),
    0,
  );

  const portfolio = profile?.portfolio || [];
  const profileSkills: { skill: { id: string; name: string } }[] =
    profile?.skills || [];
  const profileSkillIds = profileSkills.map((s) => s.skill.id);

  const availableToAdd =
    allSkills?.filter(
      (s) =>
        AVAILABLE_SKILL_NAMES.includes(s.name) &&
        !profileSkillIds.includes(s.id),
    ) || [];

  const handleAddSkill = (skillId: string) => {
    addSkill.mutate({ freelancerId: profile.id, skillId });
  };

  const handleRemoveSkill = (skillId: string) => {
    removeSkill.mutate({ freelancerId: profile.id, skillId });
  };

  const handlePortfolioImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return;
      setPortfolioImageFile(file);
      setPortfolioImagePreview(URL.createObjectURL(file));
    }
  };

  const resetPortfolioModal = () => {
    setPortfolioForm({ title: "", description: "", url: "" });
    setPortfolioImageFile(null);
    setPortfolioImagePreview(null);
    setEditingPortfolioId(null);
    setIsPortfolioModalOpen(false);
  };

  const openEditPortfolio = (item: {
    id: string;
    title: string;
    description?: string;
    url?: string;
    imageUrl?: string;
  }) => {
    setEditingPortfolioId(item.id);
    setPortfolioForm({
      title: item.title,
      description: item.description || "",
      url: item.url || "",
    });
    setPortfolioImageFile(null);
    setPortfolioImagePreview(item.imageUrl || null);
    setIsPortfolioModalOpen(true);
  };

  const openAddPortfolio = () => {
    setEditingPortfolioId(null);
    setPortfolioForm({ title: "", description: "", url: "" });
    setPortfolioImageFile(null);
    setPortfolioImagePreview(null);
    setIsPortfolioModalOpen(true);
  };

  const handlePortfolioSubmit = () => {
    if (!portfolioForm.title.trim()) return;
    if (portfolioForm.url && !/^https?:\/\/.+/.test(portfolioForm.url)) {
      toast.error("URL must start with http:// or https://");
      return;
    }

    if (editingPortfolioId) {
      updatePortfolio.mutate(
        {
          id: editingPortfolioId,
          title: portfolioForm.title,
          description: portfolioForm.description || undefined,
          url: portfolioForm.url || undefined,
        },
        {
          onSuccess: () => {
            if (portfolioImageFile) {
              uploadPortfolioImage.mutate(
                { portfolioId: editingPortfolioId, file: portfolioImageFile },
                { onSuccess: resetPortfolioModal },
              );
            } else {
              resetPortfolioModal();
            }
          },
        },
      );
    } else {
      createPortfolio.mutate(
        {
          freelancerId: profile.id,
          title: portfolioForm.title,
          description: portfolioForm.description || undefined,
          url: portfolioForm.url || undefined,
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (data: any) => {
            const portfolioId = data?.id || data?.data?.id;
            if (portfolioImageFile && portfolioId) {
              uploadPortfolioImage.mutate(
                { portfolioId, file: portfolioImageFile },
                {
                  onSettled: () => {
                    resetPortfolioModal();
                  },
                },
              );
            } else {
              resetPortfolioModal();
            }
            toast.success("Portfolio item added!");
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            const msg = Array.isArray(error?.response?.data?.message)
              ? error.response.data.message[0]
              : error?.response?.data?.message ||
                "Failed to add portfolio item";
            toast.error(msg);
          },
        },
      );
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-10 lg:px-15 py-6 bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-16 gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
            {profile?.imageUrl ? (
              <Image
                src={profile.imageUrl}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <Image
                src={johnDoeImg}
                alt="Profile"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-3xl font-bold text-[#070415]">
              {profile.userDetails?.name} {profile.userDetails?.surname}
            </h1>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit mt-1">
              Freelancer
            </span>
          </div>
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <Pencil size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="text-left sm:text-right space-y-1">
          <p className="text-xl sm:text-3xl font-light text-[#070415]">
            Balance:{" "}
            <span className="font-bold">
              ${balance != null ? balance.toLocaleString() : "0"}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            {profile?.hourlyRate
              ? `$${Number(profile.hourlyRate).toLocaleString()}/hr`
              : "Hourly rate not set"}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-16">
        <section>
          <h2 className="text-2xl font-bold mb-8 text-[#070415]">
            Personal Information
          </h2>
          <div className="text-gray-500 text-[15px] space-y-1 font-medium leading-relaxed">
            <p>{profile?.location}</p>
            <p>{profile.userDetails?.email}</p>
            <p>{profile.userDetails?.phone || "No phone number"}</p>
          </div>
          {profile?.bio && (
            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-md">
              {profile.bio}
            </p>
          )}
        </section>

        <section className="flex items-center gap-6 pt-2">
          {portfolio.length > 0 && (
            <span className="font-bold text-sm text-green-600">
              {portfolio.length} portfolio item{portfolio.length !== 1 && "s"}
            </span>
          )}
          <button
            onClick={openAddPortfolio}
            className="bg-[#070415] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
          >
            Upload Portfolio
          </button>
        </section>
      </div>

      {/* Portfolio Section */}
      {portfolio.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#070415]">Portfolio</h2>
          <div className="grid grid-cols-3 gap-4">
            {portfolio.map(
              (item: {
                id: string;
                title: string;
                description?: string;
                url?: string;
                imageUrl?: string;
              }) => (
                <div
                  key={item.id}
                  className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white group relative"
                >
                  {item.imageUrl && (
                    <div className="relative w-full h-40">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-[#070415] text-base">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#070415] transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditPortfolio(item);
                          }}
                          className="text-gray-300 hover:text-[#070415] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deletePortfolio.mutate(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.url && (
                      <p className="text-xs text-gray-400 mt-2 truncate">
                        {item.url}
                      </p>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-[#070415]">Skills</h2>
          <button
            onClick={() => setIsSkillsModalOpen(true)}
            className="bg-[#070415] text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
          >
            Add Skills
          </button>
        </div>

        {profileSkills.length === 0 ? (
          <p className="text-gray-400 text-sm">No skills added yet.</p>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {profileSkills.map((s) => {
              const img = SKILL_IMAGES[s.skill.name];
              if (!img) return null;
              return (
                <div
                  key={s.skill.id}
                  className="group relative w-14 h-14 rounded-full border border-gray-100 shadow-sm flex items-center justify-center p-3 hover:scale-110 transition-transform bg-white"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={s.skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(s.skill.id)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X size={10} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Portfolio Upload Modal */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={resetPortfolioModal}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <button
              onClick={resetPortfolioModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[#070415] mb-6">
              {editingPortfolioId
                ? "Edit Portfolio Item"
                : "Add Portfolio Item"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={portfolioForm.title}
                  onChange={(e) =>
                    setPortfolioForm({
                      ...portfolioForm,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#070415] transition-colors"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  value={portfolioForm.description}
                  onChange={(e) =>
                    setPortfolioForm({
                      ...portfolioForm,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#070415] transition-colors resize-none"
                  placeholder="Brief description of your work"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={portfolioForm.url}
                  onChange={(e) =>
                    setPortfolioForm({ ...portfolioForm, url: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#070415] transition-colors"
                  placeholder="https://example.com"
                />
              </div>

              {/* Portfolio Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Project Image
                </label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#070415] transition-colors"
                  onClick={() => portfolioImageRef.current?.click()}
                >
                  {portfolioImagePreview ? (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={portfolioImagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon size={32} className="text-gray-300" />
                      <p className="text-sm text-gray-400">
                        Click to upload an image
                      </p>
                      <p className="text-xs text-gray-300">
                        JPEG, PNG, GIF, WebP (max 5MB)
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={portfolioImageRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handlePortfolioImageChange}
                  className="hidden"
                />
                {portfolioImagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setPortfolioImageFile(null);
                      setPortfolioImagePreview(null);
                    }}
                    className="mt-2 text-xs text-red-500 hover:text-red-700"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={resetPortfolioModal}
                className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePortfolioSubmit}
                disabled={
                  !portfolioForm.title.trim() ||
                  createPortfolio.isPending ||
                  updatePortfolio.isPending ||
                  uploadPortfolioImage.isPending
                }
                className="bg-[#070415] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                {createPortfolio.isPending ||
                updatePortfolio.isPending ||
                uploadPortfolioImage.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : editingPortfolioId ? (
                  <Pencil size={16} />
                ) : (
                  <Plus size={16} />
                )}
                {editingPortfolioId ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Modal */}
      {isSkillsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSkillsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <button
              onClick={() => setIsSkillsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[#070415] mb-6">
              Add Skills
            </h2>

            {availableToAdd.length === 0 ? (
              <p className="text-gray-400 text-sm">
                All available skills have been added.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {availableToAdd.map((skill) => {
                  const img = SKILL_IMAGES[skill.name];
                  if (!img) return null;
                  return (
                    <button
                      key={skill.id}
                      onClick={() => handleAddSkill(skill.id)}
                      disabled={addSkill.isPending}
                      className="flex flex-col items-center gap-2 p-4 border border-gray-100 rounded-xl hover:border-[#070415] hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <div className="relative w-10 h-10">
                        <Image
                          src={img}
                          alt={skill.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium text-[#070415]">
                        {skill.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        type="freelancer"
      />
    </div>
  );
};
