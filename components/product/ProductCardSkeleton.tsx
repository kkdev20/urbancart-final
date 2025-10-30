// components/product/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-300"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        
        {/* Rating Skeleton */}
        <div className="flex space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
          ))}
        </div>
        
        {/* Price & Button Skeleton */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}