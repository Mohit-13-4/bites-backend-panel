import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { categories } from "@/data/mockData";
import { toast } from "sonner";

const AddInventory = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!itemName || !category || !price) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Item added successfully!");
    navigate("/inventory");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate("/inventory")}
        className="mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back home
      </Button>

      <h1 className="text-3xl font-bold text-foreground mb-8">Add New Inventory</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="itemName" className="text-foreground mb-2 block">
              Item name :
            </Label>
            <Input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="rounded-xl"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-foreground mb-2 block">
              Category :
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price" className="text-foreground mb-2 block">
              Price :
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl"
              placeholder="$0.00"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="popular"
              checked={isPopular}
              onCheckedChange={(checked) => setIsPopular(checked as boolean)}
            />
            <Label htmlFor="popular" className="text-foreground cursor-pointer">
              popular :
            </Label>
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl min-h-[120px]"
              placeholder="Enter item description"
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground mb-4 block">Upload Image</Label>
          <div className="relative">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <label className="flex items-center justify-center w-full h-80 bg-muted rounded-2xl border-2 border-dashed border-border cursor-pointer hover:bg-muted/80 transition-colors">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Click to upload image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 rounded-xl"
      >
        Upload
      </Button>
    </div>
  );
};

export default AddInventory;
