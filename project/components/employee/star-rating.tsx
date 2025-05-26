import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  const stars = [];
  
  for (let i = 1; i <= max; i++) {
    const fillClass = i <= rating 
      ? "fill-yellow-500 text-yellow-500" 
      : "fill-none text-gray-300 dark:text-gray-600";
      
    stars.push(
      <Star 
        key={i} 
        size={16} 
        className={`${fillClass}`} 
      />
    );
  }
  
  let ratingText = "";
  let ratingColor = "";
  
  switch(rating) {
    case 1:
      ratingText = "Poor";
      ratingColor = "text-red-500";
      break;
    case 2:
      ratingText = "Below Average";
      ratingColor = "text-orange-500";
      break;
    case 3:
      ratingText = "Average";
      ratingColor = "text-yellow-500";
      break;
    case 4:
      ratingText = "Good";
      ratingColor = "text-green-500";
      break;
    case 5:
      ratingText = "Excellent";
      ratingColor = "text-emerald-500";
      break;
    default:
      ratingText = "Unrated";
      ratingColor = "text-gray-500";
  }
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className={`text-xs ml-1 ${ratingColor}`}>{ratingText}</span>
    </div>
  );
}