import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Demo</h1>
        <p className="text-sm text-muted-foreground">Food Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-muted"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-muted"
            }`
          }
        >
          <Package className="w-5 h-5" />
          <span>Inventory Management</span>
        </NavLink>
      </nav>
    </aside>
  );
};
