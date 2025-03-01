// src/components/ShareButton.tsx
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Adjust based on your UI library
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

interface ShareButtonProps {
  url?: string; // Optional: Pass a custom URL to share
  title?: string; // Optional: Pass a custom title for sharing
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const router = useRouter();

  // Construct the share URL
  const shareUrl =
    url ||
    (typeof window !== "undefined"
      ? `${window.location.origin}${router.asPath}`
      : `http://localhost:3000/${router.asPath}`);
  const shareTitle = title || "Check out this on Book Kart!";

  // Function to copy the URL to the clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden md:inline">Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-sm mb-2">Share</h4>
          <div className="flex gap-2">
            {/* Facebook Share */}
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            {/* Twitter Share */}
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            {/* WhatsApp Share */}
            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            {/* Copy Link */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              className="h-8 w-8"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
