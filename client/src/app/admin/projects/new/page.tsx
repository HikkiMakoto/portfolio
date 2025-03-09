"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  featuredImage: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
}

export default function NewProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      featuredImage: "",
      technologies: [""],
      githubUrl: "",
      liveUrl: "",
      featured: false,
      order: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "technologies",
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Filter out empty technologies
    data.technologies = data.technologies.filter(tech => tech.trim() !== "");

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/projects", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setSuccessMessage("Project created successfully!");
      reset();
      
      // Redirect to projects list after a short delay
      setTimeout(() => {
        router.push("/admin/projects");
      }, 1500);
      
    } catch (error: any) {
      console.error("Error creating project:", error);
      setErrorMessage(error.response?.data?.message || "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new project to your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Project Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="featuredImage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Featured Image URL
              </label>
              <input
                id="featuredImage"
                type="text"
                {...register("featuredImage")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Short Description *
              </label>
              <textarea
                id="description"
                rows={2}
                {...register("description", { required: "Description is required" })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                placeholder="Brief description of the project (shown in cards)"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="longDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Long Description
              </label>
              <textarea
                id="longDescription"
                rows={5}
                {...register("longDescription")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                placeholder="Detailed description of the project, challenges, solutions, etc."
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                GitHub URL
              </label>
              <input
                id="githubUrl"
                type="text"
                {...register("githubUrl")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="liveUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Live Demo URL
              </label>
              <input
                id="liveUrl"
                type="text"
                {...register("liveUrl")}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="order"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Display Order
              </label>
              <input
                id="order"
                type="number"
                min="0"
                {...register("order", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Lower numbers appear first
              </p>
            </div>

            <div>
              <div className="flex items-center h-full">
                <input
                  id="featured"
                  type="checkbox"
                  {...register("featured")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Featured Project
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Technologies Used
            </h2>
            <button
              type="button"
              onClick={() => append("")}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Technology
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <input
                  {...register(`technologies.${index}` as const)}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            {fields.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No technologies added yet. Click "Add Technology" to add technologies used in your project.
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

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
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
                Creating...
              </span>
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}