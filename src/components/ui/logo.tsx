import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative group text-2xl font-extrabold tracking-tight",
        className
      )}
    >
      <span className="animate-shine bg-[linear-gradient(110deg,hsl(var(--foreground))_30%,45%,55%,hsl(var(--foreground))_70%)] bg-[length:250%_100%] bg-clip-text text-transparent">
         Algro<span className="text-primary">Ai</span>
      </span>
    </div>
  );
}
