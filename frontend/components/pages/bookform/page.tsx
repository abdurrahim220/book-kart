// components/pages/bookform/page.tsx
import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  useWatch,
  Control, // Import Control type
} from "react-hook-form";
import { BookDetails } from "@/lib/interface/types";

import { ChevronDown, Upload } from "lucide-react";
import { bookFormFields } from "@/lib/constant/form_constant";
import Image from "next/image";

interface BookFormProps {
  register: UseFormRegister<BookDetails>;
  control: Control<BookDetails>; // Add control prop
  errors: FieldErrors<BookDetails>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  handleSubmit: UseFormHandleSubmit<BookDetails>;
  onSubmit: (data: BookDetails) => void;
  uploadImages: string[];
}

const BookForm: React.FC<BookFormProps> = ({
  register,
  control, // Receive control prop
  errors,
  handleImageUpload,
  handleRemoveImage,
  handleSubmit,
  onSubmit,
  uploadImages,
}) => {
  const shippingCharge = useWatch({
    name: "shippingCharge",
    control, // Use the control prop here
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Book Details Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <span className="mr-2">📘</span> Book Details
        </h2>
        <div className="space-y-4">
          {bookFormFields.bookDetails.map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  {...register(field.name as keyof BookDetails, {
                    required: field.required ? `${field.label} is required` : false,
                  })}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              )}

              {field.type === "select" && (
                <div className="relative">
                  <select
                    {...register(field.name as keyof BookDetails, {
                      required: field.required ? `${field.label} is required` : false,
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Please select {field.label.toLowerCase()}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              )}

              {field.type === "radio" && (
                <div className="flex gap-4">
                  {field.options?.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        value={option}
                        {...register(field.name as keyof BookDetails, {
                          required: field.required ? `${field.label} is required` : false,
                        })}
                        className="mr-2 h-5 w-5 text-blue-600"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {field.type === "file" && (
                <div>
                  <label className="border-2 border-dashed border-blue-300 rounded-md p-4 flex items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Upload className="h-6 w-6 text-blue-500 mr-2" />
                    <span className="text-blue-500">
                      Click here to upload up to 4 images (Size: 15MB max. each)
                    </span>
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {uploadImages.map((image, index) => (
                      <div key={index} className="relative">
                        <Image src={image} alt="Preview" height={80} width={80} className=" object-cover rounded-md" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors[field.name as keyof BookDetails] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name as keyof BookDetails]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Optional Details Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <span className="mr-2">❓</span> Optional Details
          <span className="ml-2 text-sm text-gray-500">
            (Description, MRP, Author, etc...)
          </span>
        </h2>
        <div className="space-y-4">
          {bookFormFields.optionalDetails.map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  {...register(field.name as keyof BookDetails, {
                    required: field.required ? `${field.label} is required` : false,
                  })}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  {...register(field.name as keyof BookDetails, {
                    required: field.required ? `${field.label} is required` : false,
                    valueAsNumber: true,
                  })}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  {...register(field.name as keyof BookDetails, {
                    required: field.required ? `${field.label} is required` : false,
                  })}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-24"
                />
              )}

              {errors[field.name as keyof BookDetails] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name as keyof BookDetails]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Details Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <span className="mr-2">💲</span> Pricing Details
        </h2>
        <div className="space-y-4">
          {bookFormFields.pricingDetails.map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "number" && (
                <input
                  type="number"
                  {...register(field.name as keyof BookDetails, {
                    required: field.required ? `${field.label} is required` : false,
                    valueAsNumber: true,
                  })}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
                    field.name === "shippingChargeFree" && shippingCharge !== "free" ? "hidden" : ""
                  }`}
                />
              )}

              {/* {field.type === "radio" && (
                <div className="flex gap-4">
                  {field.options?.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        value={option}
                        {...register(field.name as keyof BookDetails, {
                          required: field.required ? `${field.label} is required` : false,
                        })}
                        className="mr-2 h-5 w-5 text-blue-600"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )} */}

              {field.name === "shippingCharge" && (
                <p className="text-sm text-gray-500">
                  Buyers prefer free shipping or low shipping charges.
                </p>
              )}

              {errors[field.name as keyof BookDetails] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name as keyof BookDetails]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit Book
      </button>
    </form>
  );
};

export default BookForm;