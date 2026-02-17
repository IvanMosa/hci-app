"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useUpdateUser } from "@/api/user/useUpdateUser";
import { useUpdateFreelancerProfile } from "@/api/freelancer/useUpdateFreelancerProfile";

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
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutate: updateFreelancer, isPending: isUpdatingFreelancer } =
    useUpdateFreelancerProfile();

  useEffect(() => {
    if (profile) {
      setName(profile.userDetails?.name || "");
      setSurname(profile.userDetails?.surname || "");
      setEmail(profile.userDetails?.email || "");
      setLocation(profile?.location || "");
      setBio(profile?.bio || "");
      setHourlyRate(profile?.hourlyRate?.toString() || "");
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const userId = profile.userDetails?.id || profile?.userId;

    updateUser(
      {
        userId,
        data: { name, surname, email },
      },
      {
        onSuccess: () => {
          if (type === "freelancer" && profile?.id) {
            updateFreelancer(
              {
                profileId: profile.id,
                data: {
                  bio: bio || undefined,
                  location: location || undefined,
                  ...(hourlyRate ? { hourlyRate: parseFloat(hourlyRate) } : {}),
                },
              },
              {
                onSuccess: () => onClose(),
              },
            );
          } else {
            onClose();
          }
        },
      },
    );
  };

  const isPending = isUpdatingUser || isUpdatingFreelancer;

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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#070415] focus:outline-none focus:border-[#070415] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#070415] focus:outline-none focus:border-[#070415] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
