"use client";
import WrapperContainer from "@/components/shared/WrapperContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { filters } from "@/lib/constant/bookData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Paginate from "@/components/features/Pagination";
import NoData from "@/components/features/NoData";
import { useRouter } from "next/navigation";
import BookLoader from "@/lib/constant/BookLoader";
import Breadcrumb from "@/components/features/Breadcrumb";
import { useGetProductsQuery } from "@/lib/store/features/productApi";
import { BookDetails } from "@/lib/interface/types";

const Books = () => {
  // State management for filters
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedClassType, setSelectedClassType] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const router = useRouter();

  // Fetch products using RTK Query
  const { data: apiResponse = {}, isLoading, isError, error } = useGetProductsQuery({});
  const [books, setBooks] = useState<BookDetails[]>([]);

  useEffect(() => {
    if (apiResponse.success) {
      setBooks(apiResponse.data || []); // Fallback to empty array if no data
    }
  }, [apiResponse]);

  console.log("Books:", books);
  console.log("API Response:", apiResponse);
  console.log("Loading:", isLoading);
  console.log("Error:", error);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const toggleFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case "condition":
        setSelectedCondition((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "classType":
        setSelectedClassType((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "category":
        setSelectedCategory((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  const filteredAndSortedBooks = books
    .filter((book) => {
      const conditionMatch =
        selectedCondition.length > 0
          ? selectedCondition.includes(book.condition)
          : true;
      const classTypeMatch =
        selectedClassType.length > 0
          ? selectedClassType.includes(book.classType)
          : true;
      const categoryMatch =
        selectedCategory.length > 0
          ? selectedCategory.includes(book.category)
          : true;
      return conditionMatch && classTypeMatch && categoryMatch;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "price-low":
          return (a.finalPrice ?? 0) - (b.finalPrice ?? 0);
        case "price-high":
          return (b.finalPrice ?? 0) - (a.finalPrice ?? 0);
        default:
          return 0;
      }
    });

  const paginatedBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const calculateDiscount = (price: number, finalPrice: number) => {
    return price > finalPrice
      ? Math.round(((price - finalPrice) / price) * 100)
      : 0;
  };

  const formDate = (dateString: string | Date) => {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    return isNaN(date.getTime()) ? "Unknown date" : formatDistanceToNow(date, { addSuffix: true });
  };

  // Early return for loading state
  if (isLoading) {
    return (
      <WrapperContainer>
        <div className="min-h-screen flex items-center justify-center">
          <BookLoader />
        </div>
      </WrapperContainer>
    );
  }

  // Early return for error state
  if (isError) {
    return (
      <WrapperContainer>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">
            Error: {error?.status} - {error?.data?.message || "Failed to load books"}
          </h1>
        </div>
      </WrapperContainer>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <WrapperContainer>
        <div>
          <Breadcrumb
            items={[
              { title: "Home", href: "/" },
              { title: "Books" },
            ]}
            className="mb-6"
          />
          <h1 className="mb-8 text-3xl font-bold">
            Find from over 1000s of used books
          </h1>
          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            <div className="space-y-6">
              <Accordion type="multiple" className="bg-white p-6 rounded-lg">
                {Object.entries(filters).map(([key, values]) => (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger className="text-lg font-semibold text-blue-500">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-2 space-y-2">
                        {values.map((value, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox
                              id={value}
                              checked={
                                key === "condition"
                                  ? selectedCondition.includes(value)
                                  : key === "classType"
                                  ? selectedClassType.includes(value)
                                  : selectedCategory.includes(value)
                              }
                              onCheckedChange={() => toggleFilter(key, value)}
                            />
                            <label
                              htmlFor={value}
                              className="text-sm font-medium leading-none"
                            >
                              {value}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>Buy Second Hand Books, Used Books Online in Bangladesh</div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedBooks.length > 0 ? (
                  paginatedBooks.map((book) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 1, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="group relative overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-2xl text-white">
                        <CardContent className="p-0">
                          <Link href={`/books/${book._id}`}>
                            <div className="relative">
                              <Image
                                src={book.images[0] || "/placeholder-image.jpg"}
                                alt={book.title as string}
                                width={400}
                                height={300}
                                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute left-0 top-0 z-10 flex flex-col gap-2 p-2">
                                {book.price !== undefined && book.finalPrice !== undefined && calculateDiscount(book.price, book.finalPrice) > 0 && (
                                  <Badge className="bg-orange-600/90 text-white hover:bg-orange-700">
                                    {calculateDiscount(book.price, book.finalPrice)}% Off
                                  </Badge>
                                )}
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-0 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
                              >
                                <Heart className="h-6 w-6 text-red-500" />
                              </Button>
                            </div>
                            <div className="p-4 space-y-2">
                              <div className="flex items-start justify-between">
                                <h1 className="text-lg font-semibold text-orange-500 line-clamp-2">
                                  {book.title}
                                </h1>
                              </div>
                              <p className="text-sm text-zinc-400">{book.author}</p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-black">
                                  ${book.finalPrice}
                                </span>
                                {book.price > (book.finalPrice ?? 0) && (
                                  <span className="text-sm text-zinc-500 line-through">
                                    ${book.price}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center justify-between text-xs text-zinc-400">
                                <span>{formDate(book.createdAt)}</span>
                                <span>{book.condition}</span>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
                        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <NoData
                    imageUrl="/images/no-book.jpg"
                    message="No books available."
                    description="It looks like there are no books matching your filters. Try adjusting your search or sell your own books!"
                    onClick={() => router.push("/book-sell")}
                    buttonText="Sell Your First Book"
                  />
                )}
              </div>
              <Paginate
                totalItems={filteredAndSortedBooks.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                loading={isLoading} // Pass isLoading to Paginate
              />
            </div>
          </div>
        </div>
      </WrapperContainer>
    </div>
  );
};

export default Books;