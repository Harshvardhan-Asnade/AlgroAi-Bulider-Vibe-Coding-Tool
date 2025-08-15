import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-auto", className)}
      viewBox="0 0 450 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>AlgroAI.build Logo</title>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8EFF4E" />
          <stop offset="100%" stopColor="#25C913" />
        </linearGradient>
      </defs>
      
      {/* Icon */}
      <g transform="translate(10, 5) scale(0.9)">
        <path
          d="M94.6,88.3 L50.1,64.1 L50.1,15.8 L94.6,39.9 L94.6,88.3 Z M55.3,100 L100,75.4 L100,24.6 L55.3,0 L10.6,24.6 L10.6,75.4 L55.3,100 Z M5.3,88.3 L5.3,39.9 L49.9,15.8 L49.9,64.1 L5.3,88.3 Z"
          fill="url(#logo-gradient)"
        />
      </g>
      
      {/* Text */}
      <g transform="translate(130, 0)">
        <text
          x="0"
          y="65"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="50"
          fontWeight="bold"
          fill="hsl(var(--foreground))"
        >
          AlgroAI.build
        </text>
        <line 
          x1="202" y1="75" x2="318" y2="75" 
          stroke="url(#logo-gradient)" 
          strokeWidth="4" 
        />
      </g>
    </svg>
  );
}
