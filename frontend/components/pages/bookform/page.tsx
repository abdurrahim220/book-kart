import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { BookDetails } from '@/lib/interface/types';
import Image from 'next/image';
import { bookFormFields } from '@/lib/constant/form_constant';

interface BookFormProps {
  register: UseFormRegister<BookDetails>;
  errors: FieldErrors<BookDetails>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  handleSubmit: UseFormHandleSubmit<BookDetails>;
  onSubmit: (data: BookDetails) => Promise<void>;
  uploadImages: string[];
}

const BookForm: React.FC<BookFormProps> = ({
  register,
  errors,
  handleImageUpload,
  handleRemoveImage,
  handleSubmit,
  onSubmit,
  uploadImages
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookFormFields.book.map((field) => {
          if (field.name === 'images') {
            return (
              <div key={field.name} className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.images && (
                  <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
                )}
                
                {/* Image previews */}
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {uploadImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={field.name} className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                {...register(field.name as keyof BookDetails, {
                  required: field.required && `${field.label} is required`,
                  valueAsNumber: field.type === 'number'
                })}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors[field.name as keyof BookDetails] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[field.name as keyof BookDetails] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name as keyof BookDetails]?.message}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Book
        </button>
      </div>
    </form>
  );
};

export default BookForm;