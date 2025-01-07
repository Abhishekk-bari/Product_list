const SkeletonLoader: React.FC = () => (
    <div className="border rounded p-4 shadow-lg">
      <div className="w-full h-40 bg-gray-200 mb-4 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 w-1/2 rounded animate-pulse"></div>
    </div>
  );
  
  export default SkeletonLoader;
  