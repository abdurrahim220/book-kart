"use client";
import Breadcrumb from "@/components/features/Breadcrumb";
import WrapperContainer from "@/components/shared/WrapperContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { books } from "@/lib/constant/bookData";

import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle2,
  Contact2,
  Heart,
  Loader2,
  MapPin,
  ShoppingCart,
  User2,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import HowItWorksSection from "@/components/shared/HowItWorksSection";

const SingleBook = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const router = useRouter();

  // console.log(id)
  const singleBook = books.find((book) => book._id === id);

  // Add early return if book not found
  if (!singleBook) {
    return (
      <WrapperContainer>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Book not found</h1>
        </div>
      </WrapperContainer>
    );
  }
  const handleAddToCart = (productId: string) => {};
  const handleAddToWishlist = (productId: string) => {};

  const bookImage = singleBook?.images || [];

  const calculateDiscount = (price?: number, finalPrice?: number) => {
    if (price === undefined || finalPrice === undefined) {
      return 0;
    }
    return price > finalPrice
      ? Math.round(((price - finalPrice) / price) * 100)
      : 0;
  };

  const formDate = (dateString: Date) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  console.log(singleBook);
  return (
    <section className="min-h-screen py-8 lg:py-12 bg-gray-100">
      <WrapperContainer>
        <div className="">
          <Breadcrumb
            items={[
              {
                title: "Home",
                href: "/",
              },
              {
                title: "Books",
                href: "/books",
              },
              {
                title: singleBook?.title,
              },
            ]}
            className="mb-6"
          />

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="relative h-96 overflow-hidden rounded-lg border bg-white shadow-md">
                <Image
                  src={bookImage[selectedImage]}
                  alt={singleBook?.title || ""}
                  fill
                />
                {calculateDiscount(singleBook?.price, singleBook?.finalPrice) >
                  0 && (
                  <span className="absolute left-0 top-2 rounded-r-lg bg-red-500 px-2 py-1 text-xs font-medium text-white">
                    {calculateDiscount(
                      singleBook?.price,
                      singleBook?.finalPrice
                    )}
                    % off
                  </span>
                )}
              </div>
              <div className="flex gap-2 overflow-hidden">
                {bookImage.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${
                      selectedImage === index
                        ? "ring-2 ring-primary scale-105"
                        : "hover:scale-105"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${singleBook?.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* booking details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">{singleBook?.title}</h1>
                  <p>Posted {formDate(singleBook.createdAt)}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Button variant={"outline"}>Share</Button>
                  <Button
                    variant={"outline"}
                    onClick={() => handleAddToWishlist(singleBook?._id)}
                  >
                    <Heart className={`h-4 w-4 mr-1 fill-red-500`} />
                    <div className="hidden md:inline">Add</div>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex  items-baseline gap-2">
                  <span className="text-lg font-bold">
                    ${singleBook.finalPrice}
                  </span>
                  {singleBook.price > singleBook.finalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${singleBook.price}
                    </span>
                  )}
                  <Badge variant="secondary" className="text-green-700">
                    Shipping Available
                  </Badge>
                </div>
                <Button className="w-60 bg-blue-700">
                  {isAddToCart ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Adding to Cart....
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Buy Now
                    </>
                  )}
                </Button>

                <Card className="border border-gray-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Book Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="font-medium text-muted-foreground">
                        Subject/Title
                      </div>
                      <div>{singleBook.subject}</div>
                      <div className="font-medium text-muted-foreground">
                        Course
                      </div>
                      <div>{singleBook.classType}</div>
                      <div className="font-medium text-muted-foreground">
                        Category
                      </div>
                      <div>{singleBook.category}</div>
                      <div className="font-medium text-muted-foreground">
                        Author
                      </div>
                      <div>{singleBook.author}</div>
                      <div className="font-medium text-muted-foreground">
                        Edition
                      </div>
                      <div>{singleBook.edition}</div>
                      <div className="font-medium text-muted-foreground">
                        Condition
                      </div>
                      <div>{singleBook.condition}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{singleBook.description}</p>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Our Community</h3>
                  <p className="text-muted-foreground">
                    We&apos;re not just a marketplace, we&apos;re a community of
                    book lovers. Our members are passionate about reading and
                    sharing
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Sailer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                    <User2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex  flex-col">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">
                        {singleBook.seller.name}
                      </span>
                      <Badge variant={"outline"} className="text-green-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{singleBook.seller.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                    <Contact2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <p>{singleBook.seller.contact}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <HowItWorksSection/>
      </WrapperContainer>
    </section>
  );
};

export default SingleBook;
