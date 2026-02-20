"use client";

import { useState, useEffect, useRef } from "react";
import { X, Camera, Loader2 } from "lucide-react";
import { useUpdateUser } from "@/api/user/useUpdateUser";
import { useUpdateFreelancerProfile } from "@/api/freelancer/useUpdateFreelancerProfile";
import { useUploadProfileImage } from "@/api/upload/useUploadImage";
import Image from "next/image";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any;
  type: "freelancer" | "client";
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  profile,
  type,
}: EditProfileModalProps) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: updateUserAsync, isPending: isUpdatingUser } =
    useUpdateUser();
  const {
    mutateAsync: updateFreelancerAsync,
    isPending: isUpdatingFreelancer,
  } = useUpdateFreelancerProfile();
  const { mutateAsync: uploadProfileImageAsync, isPending: isUploadingImage } =
    useUploadProfileImage();

  useEffect(() => {
    if (isOpen && profile) {
      setName(profile.userDetails?.name || "");
      setSurname(profile.userDetails?.surname || "");
      setEmail(profile.userDetails?.email || "");
      setPhone(profile.userDetails?.phone || "");
      setLocation(profile?.location || "");
      setBio(profile?.bio || "");
      setHourlyRate(profile?.hourlyRate?.toString() || "");
      setImagePreview(profile?.imageUrl || null);
      setImageFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image must be less than 5MB",
        }));
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "First name is required";
    if (!surname.trim()) newErrors.surname = "Last name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const userId = profile.userDetails?.id || profile?.userId;
    const fileToUpload = imageFile;

    try {
      await updateUserAsync({
        userId,
        data: {
          name: name.trim(),
          surname: surname.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
        },
      });
    } catch (e) {
      console.error("Update user failed:", e);
    }

    try {
      if (type === "freelancer" && userId) {
        await updateFreelancerAsync({
          profileId: userId,
          data: {
            bio: bio || undefined,
            location: location || undefined,
            ...(hourlyRate ? { hourlyRate: parseFloat(hourlyRate) } : {}),
          },
        });
      }
    } catch (e) {
      console.error("Update freelancer failed:", e);
    }

    try {
      if (fileToUpload && userId) {
        await uploadProfileImageAsync({
          userId,
          file: fileToUpload,
        });
      }
    } catch (e) {
      console.error("Upload image failed:", e);
    }

    onClose();
  };

  const isPending = isUpdatingUser || isUpdatingFreelancer || isUploadingImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#070415]">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Camera size={28} className="text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-gray-500 hover:text-[#070415] transition-colors"
            >
              {imagePreview ? "Change Photo" : "Upload Photo"}
            </button>
            {isUploadingImage && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 size={14} className="animate-spin" />
                Uploading...
              </div>
            )}
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm text-[#070415] focus:outline-none transition-colors ${
                  errors.name
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-[#070415]"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                  if (errors.surname)
                    setErrors((prev) => ({ ...prev, surname: "" }));
                }}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm text-[#070415] focus:outline-none transition-colors ${
                  errors.surname
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-[#070415]"
                }`}
              />
              {errors.surname && (
                <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm text-[#070415] focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-gray-200 focus:border-[#070415]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +385 95 123 4567"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#070415] focus:outline-none focus:border-[#070415] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#070415] focus:outline-none focus:border-[#070415] transition-colors"
            />
          </div>

          {type === "freelancer" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#070415] focus:outline-none focus:border-[#070415] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#070415] focus:outline-none focus:border-[#070415] transition-colors"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-8 py-2.5 bg-[#070415] text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
