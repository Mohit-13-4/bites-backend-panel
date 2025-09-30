interface StatCardProps {
  title: string;
  value: number;
}

export const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <h3 className="text-4xl font-bold text-foreground mb-2">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};
