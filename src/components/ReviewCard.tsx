import { Star } from "lucide-react";
import { Review } from "@/data/mockData";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border min-w-[320px]">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-foreground">{review.name}</h4>
          <p className="text-sm text-muted-foreground">{review.daysAgo} days ago</p>
        </div>
      </div>
      
      <div className="mb-4">
        <img
          src={review.imageUrl}
          alt="Food"
          className="w-full h-40 object-cover rounded-xl"
        />
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
        {review.comment}
      </p>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-foreground">
          {review.rating}.0
        </span>
      </div>
    </div>
  );
};
