// pages/book-sell.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BookForm from "@/components/pages/bookform/page";
import WrapperContainer from "@/components/shared/WrapperContainer";
import { BookDetails } from "@/lib/interface/types";
import { useAddProductMutation } from "@/lib/store/features/productApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BookSell = () => {
  const [uploadImages, setUploadImages] = useState<string[]>([]); // For preview URLs
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // For raw File objects
  const [addProducts] = useAddProductMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,

    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<BookDetails>({
    defaultValues: {
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).slice(0, 4); // Limit to 4 images
      const newUploadImages = newFiles.map((file) => URL.createObjectURL(file)); // For preview
      setUploadImages((prevImages) => [...prevImages, ...newUploadImages].slice(0, 4));
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 4)); // Store raw files
      setValue("images", [...selectedFiles, ...newFiles].slice(0, 4)); // Update form with raw files
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setValue("images", selectedFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: BookDetails) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "images") {
          const value = data[key as keyof BookDetails];
          if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        }
      });

      // Append raw File objects to FormData
      if (Array.isArray(selectedFiles) && selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("images", file); // Append the raw File object
        });
      }

      const response = await addProducts(formData).unwrap();
      console.log("API Response:", response);

      if (response.success) {
        toast.success(response.message);
        reset();
        setUploadImages([]); // Clear preview images
        setSelectedFiles([]); // Clear selected files
        const bookId = response.data?._id;
        if (bookId) {
          console.log("Redirecting to:", `/books/${bookId}`);
          await router.push(`/books/${bookId}`);
        } else {
          throw new Error("Book ID not found in response");
        }
      } else {
        throw new Error(response.message || "Failed to create product");
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(error.message || "An error occurred while creating the product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <WrapperContainer>
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Sell Your Used Book
          </h1>
          <p className="text-gray-500 text-xl mb-4">
            Submit a free classified ad for your used book.
          </p>
          <Link href="/how-it-works" className="flex items-center justify-center">
            <h2 className="text-red-500 hover:underline hover:text-blue-500">
              Learn How it Works
            </h2>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="border-2 mb-6" />
        <div className="pb-8">
          <BookForm
            register={register}
            control={control}
            errors={errors}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            uploadImages={uploadImages}
          />
        </div>
      </WrapperContainer>
    </div>
  );
};

export default BookSell;