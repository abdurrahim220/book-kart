"use client";
import Breadcrumb from "@/components/features/Breadcrumb";
import WrapperContainer from "@/components/shared/WrapperContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookDetails } from "@/lib/interface/types";
import { useGetProductByIdQuery } from "@/lib/store/features/productApi";
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
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HowItWorksSection from "@/components/shared/HowItWorksSection";
import { useAddToCartMutation } from "@/lib/store/features/cartApi";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/lib/store/features/wishlistApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/store/slice/cartSlice";

const SingleBook = () => {
  const { id } = useParams();
  // const router = useRouter();
  const [books, setBooks] = useState<BookDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const { data, isLoading } = useGetProductByIdQuery(id);
  const { isLoggedIn, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [addToCartMutation] = useAddToCartMutation();
  const [addToWishListMutation] = useAddToWishlistMutation();
  const [removeWishListMutation] = useRemoveFromWishlistMutation();

  const wishList = useAppSelector((state) => state.wishlist.items);

  useEffect(() => {
    if (data) {
      setBooks(data.data);
    }
  }, [data]);
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const singleBook = books;

  // console.log("singleBook:", singleBook);
  // console.log("books:", books);

  // Early return if no book data
  if (!singleBook) {
    return (
      <WrapperContainer>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Book not found</h1>
        </div>
      </WrapperContainer>
    );
  }

  // Placeholder functions
  const handleAddToCart = async () => {

    console.log(token)

    if (books) {
      setIsAddToCart(true);

      // console.log(books)

      try {
        const result = await addToCartMutation({
          productId: books._id,
          quantity: 1,
        }).unwrap();
        console.log(result)
        if (result.success && result.data) {
          dispatch(addToCart(result.data));

          toast.success(`${books.title} added to cart`);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        const errorMessage = error as { message: string };
        toast.error(errorMessage.message);
      }
      setIsAddToCart(false);
    }
  };
  const handleAddToWishlist = (productId: string) => {
    console.log(`Added ${productId} to wishlist`);
  };

  const bookImages = (singleBook.images || []).filter(
    (image): image is string => typeof image === "string"
  );

  // Calculate discount percentage
  const calculateDiscount = (price?: number, finalPrice?: number) => {
    if (
      price === undefined ||
      finalPrice === undefined ||
      price <= finalPrice
    ) {
      return 0;
    }
    return Math.round(((price - finalPrice) / price) * 100);
  };

  const formDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <section className="min-h-screen py-8 lg:py-12 bg-gray-100">
      <WrapperContainer>
        <Breadcrumb
          items={[
            { title: "Home", href: "/" },
            { title: "Books", href: "/books" },
            { title: singleBook.title },
          ]}
          className="mb-6"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative h-96 overflow-hidden rounded-lg border bg-white shadow-md">
              <Image
                src={
                  typeof bookImages[selectedImage] === "string"
                    ? bookImages[selectedImage]
                    : "/placeholder-image.jpg"
                }
                alt={singleBook.title || "Book Image"}
                fill
                className="object-cover"
              />
              {calculateDiscount(singleBook.price, singleBook.finalPrice) >
                0 && (
                <span className="absolute left-0 top-2 rounded-r-lg bg-red-500 px-2 py-1 text-xs font-medium text-white">
                  {calculateDiscount(singleBook.price, singleBook.finalPrice)}%
                  off
                </span>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {bookImages.map((image, index) => (
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
                    alt={`${singleBook.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Book Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{singleBook.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Posted {formDate(singleBook.createdAt)}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Button variant="outline">Share</Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    singleBook._id && handleAddToWishlist(singleBook._id)
                  }
                >
                  <Heart className="h-4 w-4 mr-1 fill-red-500" />
                  <span className="hidden md:inline">Add</span>
                </Button>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">
                ${singleBook.finalPrice}
              </span>
              {singleBook.price > (singleBook.finalPrice ?? 0) && (
                <span className="text-sm text-muted-foreground line-through">
                  ${singleBook.price}
                </span>
              )}
              <Badge variant="secondary" className="text-green-700">
                Shipping Available
              </Badge>
            </div>

            <Button
              className="w-60 bg-blue-700"
              onClick={() => handleAddToCart()}
              disabled={isAddToCart}
            >
              {isAddToCart ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Adding to Cart...
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

        {/* Description and Seller Details */}
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
                  sharing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Seller Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                  <User2 className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      {singleBook.seller.name}
                    </span>
                    <Badge variant="outline" className="text-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {singleBook.seller.location || "Location not provided"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                  <Contact2 className="h-6 w-6 text-blue-500" />
                </div>
                <p>{singleBook.seller.email || "Contact not provided"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <HowItWorksSection />
      </WrapperContainer>
    </section>
  );
};

export default SingleBook;
