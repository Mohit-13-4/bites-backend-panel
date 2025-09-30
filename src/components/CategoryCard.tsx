import { Category } from "@/data/mockData";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-sm border border-border mb-3">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-medium text-foreground">{category.name}</span>
    </div>
  );
};
