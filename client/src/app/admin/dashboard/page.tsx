"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

interface Developer {
  _id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  socialLinks: SocialLink[];
  skills: Skill[];
  resume?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

interface Skill {
  name: string;
  icon?: string;
  proficiency?: number;
}

export default function AdminDashboardPage() {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<Developer>({
    defaultValues: {
      socialLinks: [],
      skills: [],
    },
  });

  const socialLinks = watch("socialLinks") || [];
  const skills = watch("skills") || [];

  useEffect(() => {
    const fetchDeveloper = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/developer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data && response.data.length > 0) {
          const developerData = response.data[0];
          setDeveloper(developerData);
          
          // Set form values
          Object.entries(developerData).forEach(([key, value]) => {
            setValue(key as any, value);
          });
        }
      } catch (error) {
        console.error("Error fetching developer data:", error);
        setErrorMessage("Failed to load developer data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeveloper();
  }, [setValue]);

  const addSocialLink = () => {
    setValue("socialLinks", [...socialLinks, { platform: "", url: "" }]);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = [...socialLinks];
    newLinks.splice(index, 1);
    setValue("socialLinks", newLinks);
  };

  const addSkill = () => {
    setValue("skills", [...skills, { name: "", proficiency: 50 }]);
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setValue("skills", newSkills);
  };

  const onSubmit = async (data: Developer) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (developer?._id) {
        // Update existing developer
        await axios.patch(
          `http://localhost:3001/developer/${developer._id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Create new developer
        await axios.post("http://localhost:3001/developer", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving developer data:", error);
      setErrorMessage("Failed to save profile data");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update your profile information that will be displayed on your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Job Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Job title is required" })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
            </div>
            
            <div className="md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                {...register("bio", { required: "Bio is required" })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              ></textarea>
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div>
            
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Avatar URL
              </label>
              <input
                id="avatar"
                type="text"
                {...register("avatar")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Resume URL
              </label>
              <input
                id="resume"
                type="text"
                {...register("resume")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Social Links
            </h2>
            <button
              type="button"
              onClick={addSocialLink}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Link
            </button>
          </div>
          
          <div className="space-y-4">
            {socialLinks.map((_, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor={`socialLinks.${index}.platform`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Platform
                  </label>
                  <input
                    id={`socialLinks.${index}.platform`}
                    type="text"
                    {...register(`socialLinks.${index}.platform` as const, {
                      required: "Platform is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                  />
                  {errors.socialLinks?.[index]?.platform && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.socialLinks[index]?.platform?.message}
                    </p>
                  )}
                </div>
                
                <div className="flex-1">
                  <label
                    htmlFor={`socialLinks.${index}.url`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    URL
                  </label>
                  <input
                    id={`socialLinks.${index}.url`}
                    type="text"
                    {...register(`socialLinks.${index}.url` as const, {
                      required: "URL is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                  />
                  {errors.socialLinks?.[index]?.url && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.socialLinks[index]?.url?.message}
                    </p>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="mt-7 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            
            {socialLinks.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No social links added yet. Click "Add Link" to add your social media profiles.
              </p>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Skills
            </h2>
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Skill
            </button>
          </div>
          
          <div className="space-y-4">
            {skills.map((_, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor={`skills.${index}.name`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Skill Name
                  </label>
                  <input
                    id={`skills.${index}.name`}
                    type="text"
                    {...register(`skills.${index}.name` as const, {
                      required: "Skill name is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                  />
                  {errors.skills?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.skills[index]?.name?.message}
                    </p>
                  )}
                </div>
                
                <div className="flex-1">
                  <label
                    htmlFor={`skills.${index}.proficiency`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Proficiency (%)
                  </label>
                  <input
                    id={`skills.${index}.proficiency`}
                    type="number"
                    min="0"
                    max="100"
                    {...register(`skills.${index}.proficiency` as const, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="mt-7 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            
            {skills.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No skills added yet. Click "Add Skill" to add your skills.
              </p>
            )}
          </div>
        </div>

        {/* Form Messages */}
        {successMessage && (
          <div className="p-4 bg-green-100 text-green-800 rounded-md">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="p-4 bg-red-100 text-red-800 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}