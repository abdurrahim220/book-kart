import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  title: string | undefined;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="text-primary hover:underline transition-colors"
            >
              {item.title}
            </Link>
          ) : (
            <span className="text-foreground line-clamp-1">{item.title}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="h-4 w-4" />}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
