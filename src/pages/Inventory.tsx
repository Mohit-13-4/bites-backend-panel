import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/CategoryCard";
import { FoodCard } from "@/components/FoodCard";
import { categories, foodItems } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();
  const popularItems = foodItems.filter(item => item.isPopular);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
        <Button
          onClick={() => navigate("/inventory/add")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          Add new
        </Button>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-6">All Categories</h2>
        <div className="flex gap-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-6">Most popular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onEdit={(id) => navigate(`/inventory/edit/${id}`)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-6">All foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onEdit={(id) => navigate(`/inventory/edit/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
