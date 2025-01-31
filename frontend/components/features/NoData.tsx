import Image from "next/image";
import React from "react";

interface NoDataProps {
  message: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
  buttonText: string;
}

const NoData: React.FC<NoDataProps> = ({
  message,
  imageUrl,
  description,
  onClick,
  buttonText = "Try Again",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white overflow-hidden space-y-6 mx-auto">
      <div className="relative w-60 md:w-80">
        <Image
          src={imageUrl}
          alt="No Data"
          width={320}
          height={320}
          className="shadow-md hover:shadow-lg transition duration-300"
        />
      </div>
      <div className="text-center max-w-md space-y-2">
        <p
          className="text-2xl font-bold text-gray-600
             tracking-wide"
        >
          {message}
        </p>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
      {onClick && (
        <button
          className="bg-blue-500/30 hover:bg-blue-700/30 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default NoData;
