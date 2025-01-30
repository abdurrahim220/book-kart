import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginateProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Paginate = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  loading,
}: PaginateProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't show pagination if there's only 1 page
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      }
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-left");
      }
    }

    // Main page range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-right");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center my-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={currentPage === 1 || loading}
              className={
                currentPage === 1 || loading
                  ? "opacity-50 cursor-not-allowed"
                  : undefined
              }
              onClick={() =>
                !loading && currentPage > 1 && onPageChange(currentPage - 1)
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => {
            if (typeof page === "string") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === currentPage}
                  className={loading ? "cursor-wait" : undefined}
                  onClick={() => !loading && onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              aria-disabled={currentPage === totalPages || loading}
              className={
                currentPage === totalPages || loading
                  ? "opacity-50 cursor-not-allowed"
                  : undefined
              }
              onClick={() =>
                !loading &&
                currentPage < totalPages &&
                onPageChange(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginate;
