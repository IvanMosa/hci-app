"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCreateApplication } from "@/api/application/useCreateApplication";
import { useUpdateApplication } from "@/api/application/useUpdateApplication";
import { useMyApplications } from "@/api/application/useMyApplications";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  freelancerId: string;
}

export const ApplyModal = ({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  freelancerId,
}: ApplyModalProps) => {
  const { mutate: createApplication, isPending: isCreating } =
    useCreateApplication(onClose);
  const { mutate: updateApplication, isPending: isUpdating } =
    useUpdateApplication(onClose);
  const { data: myApplications } = useMyApplications(freelancerId);

  const existingApplication = myApplications?.find(
    (app) => app.jobId === jobId,
  );

  const [formData, setFormData] = useState({
    proposal: "",
    bidAmount: "",
  });

  useEffect(() => {
    if (existingApplication) {
      setFormData({
        proposal: existingApplication.proposal || "",
        bidAmount: existingApplication.bidAmount
          ? String(existingApplication.bidAmount)
          : "",
      });
    }
  }, [existingApplication]);

  if (!isOpen) return null;

  const isPending = isCreating || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingApplication) {
      updateApplication({
        applicationId: existingApplication.id,
        proposal: formData.proposal,
        bidAmount: formData.bidAmount ? Number(formData.bidAmount) : undefined,
      });
    } else {
      createApplication({
        jobId,
        freelancerId,
        proposal: formData.proposal,
        bidAmount: formData.bidAmount ? Number(formData.bidAmount) : undefined,
      });
    }
  };

  const inputStyles =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all";
  const labelStyles = "block text-sm font-bold mb-2 text-[#070415]";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[20px] w-full max-w-[600px] p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black cursor-pointer"
          aria-label="close button"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-[#070415]">
          {existingApplication ? "Update Application" : "Apply for Project"}
        </h2>
        <p className="text-gray-500 text-sm mb-8">{jobTitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelStyles}>Your Proposal</label>
            <textarea
              placeholder="Describe why you're the best fit for this project..."
              className={`${inputStyles} h-40 resize-none`}
              value={formData.proposal}
              onChange={(e) =>
                setFormData({ ...formData, proposal: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className={labelStyles}>Bid Amount ($)</label>
            <input
              type="number"
              placeholder="e.g. 1500"
              className={inputStyles}
              value={formData.bidAmount}
              onChange={(e) =>
                setFormData({ ...formData, bidAmount: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-10 py-3 rounded-full border border-gray-300 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-12 py-3 rounded-full bg-[#070415] text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400 cursor-pointer"
            >
              {isPending
                ? "Submitting..."
                : existingApplication
                  ? "Update"
                  : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
