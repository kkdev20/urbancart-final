// components/product/ProductDetailSkeleton.tsx
export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2 text-sm mb-6">
        <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded animate-pulse w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-1/4"></div>
          <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded animate-pulse w-32"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-4/6"></div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-12">
        <div className="flex space-x-4 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-300 rounded animate-pulse w-24"></div>
          ))}
        </div>
        <div className="h-32 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Related Products Skeleton */}
      <div>
        <div className="h-6 bg-gray-300 rounded animate-pulse w-48 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-300 rounded-lg aspect-[3/4] animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}