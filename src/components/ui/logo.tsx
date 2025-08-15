import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-auto h-8", className)}
      viewBox="0 0 120 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="text-gradient" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="22"
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="url(#text-gradient)"
      >
        AlgroAi
      </text>
    </svg>
  );
}