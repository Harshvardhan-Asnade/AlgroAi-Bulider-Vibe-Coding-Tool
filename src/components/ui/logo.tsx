import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-2xl font-extrabold tracking-tight",
        "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
        className
      )}
    >
      Algro<span className="text-foreground">Ai</span>
    </div>
  );
}
