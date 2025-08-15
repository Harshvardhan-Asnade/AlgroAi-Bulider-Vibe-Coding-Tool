import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shine-sweep text-shine text-2xl font-extrabold tracking-tight",
        className
      )}
    >
      AlgroAi
    </div>
  );
}
