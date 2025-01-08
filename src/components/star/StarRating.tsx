interface StarRatingProps {
    rating: number; // rating out of 5
  }
  
  const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const filledStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 !== 0; // Half star condition
    const emptyStars = 5 - Math.ceil(rating); // Empty stars
  
    return (
      <div className="flex text-xl">
        {[...Array(filledStars)].map((_, index) => (
          <span key={`filled-${index}`} className="text-yellow-500">★</span>
        ))}
        {halfStar && <span className="text-yellow-500">☆</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-400">☆</span>
        ))}
      </div>
    );
  };
  
  export default StarRating;
  