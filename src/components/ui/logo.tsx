import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-2xl font-extrabold tracking-tight",
        className
      )}
    >
      <span className="text-primary">Algro</span>
      <span className="text-foreground">Ai</span>
    </div>
  );
}
