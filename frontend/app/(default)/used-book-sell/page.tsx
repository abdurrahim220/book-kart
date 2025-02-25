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
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [addProducts] = useAddProductMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookDetails>({
    defaultValues: {
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFile = Array.from(files);
      const currentFiles = watch("images") || [];
      setUploadImages((prevImage) => [
        ...prevImage,
        ...newFile.map((file) => URL.createObjectURL(file)),
      ]);
      setValue("images", [
        ...currentFiles,
        ...newFile.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentFiles = watch("images") || [];
    setUploadImages((prevImage) => prevImage.filter((_, i) => i !== index));
    setValue(
      "images",
      currentFiles.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: BookDetails) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, value as string);
        }
      });
      if (Array.isArray(data.images && data.images.length > 0)) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }
      const response = await addProducts(formData).unwrap();
      if (response.data.success) {
        router.push(`/books/${response.data._id}`);
        toast.success(`response.data.message`);
        reset();
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
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
          <Link href="/how-it-works">
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
