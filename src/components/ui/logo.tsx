import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-2xl font-extrabold tracking-tight text-primary",
        className
      )}
    >
      Ai
    </div>
  );
}
