import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-auto text-primary", className)}
      viewBox="0 0 168 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>AlgroAI.build Logo</title>
      <path
        d="M21.3333 0L32 6.15385V18.4615L21.3333 24.6154L10.6667 18.4615V6.15385L21.3333 0Z"
        fill="url(#logo-gradient)"
      />
      <path
        d="M10.6667 8.20513V20.5128L0 14.359V2L10.6667 8.20513Z"
        fill="url(#logo-gradient)"
      />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="12.3077"
          x2="32"
          y2="12.3077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#84F26C" />
          <stop offset="1" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <text
        x="40"
        y="23"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="22"
        fontWeight="bold"
        fill="white"
      >
        AlgroAI
        <tspan fill="hsl(var(--primary))">.build</tspan>
      </text>
    </svg>
  );
}
