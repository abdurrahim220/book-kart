import { bookContent } from "@/lib/constant/bookData";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";

const HowItWorksSection = () => {
  return (
    <div className="py-12 lg:py-16  space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        How it works
      </h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bookContent.map((item, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-amber-50 to-amber-100 border-none grid justify-items-center"
          >
            <CardHeader className="grid justify-items-center">
              <Badge className="w-fit mb-2">{item.step}</Badge>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={120}
                height={120}
                className="mx-auto"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
