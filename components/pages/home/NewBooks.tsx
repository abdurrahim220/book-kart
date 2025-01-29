"use client";
import ButtonLink from "@/components/shared/ButtonLink";
import WrapperContainer from "@/components/shared/WrapperContainer";
import { Card, CardContent } from "@/components/ui/card";
import { books } from "@/lib/constant/bookData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NewBooks = () => {
  const [currentBookSlider, setCurrentBookSlider] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const totalSlides = Math.ceil(books.length / slidesPerView);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) setSlidesPerView(1);
      else if (screenWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBookSlider((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentBookSlider((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentBookSlider((prev) => (prev + 1) % totalSlides);
  };

  const calculateDiscount = (price: number, finalPrice: number) => {
    return price > finalPrice
      ? Math.round(((price - finalPrice) / price) * 100)
      : 0;
  };

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <WrapperContainer>
        <div className="mb-8 lg:mb-10">
          <h2 className="text-3xl text-center font-bold text-gray-900">
            Newly Added Books
          </h2>
        </div>

        <div className="relative my-8">
          {books.length > 0 ? (
            <>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentBookSlider * 100}%)`,
                  }}
                >
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <div key={index} className="flex-none w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                        {books
                          .slice(
                            index * slidesPerView,
                            index * slidesPerView + slidesPerView
                          )
                          .map((book) => (
                            <div key={book._id} className="w-full">
                              <Card className="relative h-full">
                                <CardContent className="p-4 h-full">
                                  <Link
                                    href={`/books/${book._id}`}
                                    className="h-full flex flex-col"
                                  >
                                    <div className="relative flex-1">
                                      <Image
                                        src={book.images[0]}
                                        alt={book.title}
                                        width={400}
                                        height={600}
                                        className="mb-4 h-48 w-full object-cover rounded-md"
                                      />
                                      {calculateDiscount(
                                        book.price,
                                        book.finalPrice
                                      ) > 0 && (
                                        <span className="absolute left-0 top-2 rounded-r-lg bg-red-500 px-2 py-1 text-xs font-medium text-white">
                                          {calculateDiscount(
                                            book.price,
                                            book.finalPrice
                                          )}
                                          % off
                                        </span>
                                      )}
                                    </div>
                                    <h3 className="mb-2 line-clamp-2 text-sm font-medium">
                                      {book.title}
                                    </h3>
                                    <div className="flex items-center justify-between mt-auto">
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold">
                                          ${book.finalPrice}
                                        </span>
                                        {book.price > book.finalPrice && (
                                          <span className="text-sm text-muted-foreground line-through">
                                            ${book.price}
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-xs text-zinc-400">
                                        {book.condition}
                                      </span>
                                    </div>
                                  </Link>
                                </CardContent>
                              </Card>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Navigation Dots */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBookSlider(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentBookSlider
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No books available
            </div>
          )}
        </div>

        <div className="text-center mt-8 lg:mt-10">
          <ButtonLink title="Explore New Books" />
        </div>
      </WrapperContainer>
    </section>
  );
};

export default NewBooks;
