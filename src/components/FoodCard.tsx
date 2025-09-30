import { Button } from "@/components/ui/button";
import { FoodItem } from "@/data/mockData";

interface FoodCardProps {
  item: FoodItem;
  onEdit?: (id: number) => void;
}

export const FoodCard = ({ item, onEdit }: FoodCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-44 object-cover rounded-xl mb-4"
      />
      
      <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
        {item.description}
      </p>
      
      <div className="flex items-center justify-between">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item.id)}
            className="text-muted-foreground hover:text-foreground"
          >
            Edit Info
          </Button>
        )}
        <span className="text-lg font-bold text-primary ml-auto">
          ${item.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
