import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative group text-2xl font-extrabold tracking-tight",
        className
      )}
    >
      <span className="text-primary">Algro</span>
      <span className="text-foreground">Ai</span>
      <span className="absolute -inset-1 block transform-gpu rounded-lg bg-gradient-to-r from-primary to-accent opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:blur-md" />
      <span className="absolute inset-0 block h-full w-full transform-gpu rounded-lg bg-gradient-to-r from-primary to-accent opacity-0 transition-all duration-500 group-hover:opacity-25" />
    </div>
  );
}
