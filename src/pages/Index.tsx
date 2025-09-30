import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { ReviewCard } from "@/components/ReviewCard";
import { reviews, categories, foodItems } from "@/data/mockData";
import { useState } from "react";

const Index = () => {
  const [reviewIndex, setReviewIndex] = useState(0);
  
  const totalCategories = categories.length;
  const totalFoodItems = foodItems.length;
  const totalPopularItems = foodItems.filter(item => item.isPopular).length;
  const totalReviews = reviews.length;

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Hi Samantha, Welcome Back To Seller Admin!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total categories" value={totalCategories} />
        <StatCard title="Total Reviews" value={totalReviews * 119} />
        <StatCard title="Total Food Items" value={totalFoodItems * 16} />
        <StatCard title="Total users Items" value={128} />
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Customer Review</h2>
            <p className="text-sm text-muted-foreground">Earn from consequently catallax</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`transition-opacity ${
                  index === reviewIndex ? "opacity-100" : "opacity-50"
                }`}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
