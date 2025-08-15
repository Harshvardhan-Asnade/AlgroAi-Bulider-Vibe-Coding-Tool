import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      width="150"
      height="40"
      viewBox="0 0 150 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_105_2)">
        <path
          d="M21.1396 15.3524L15.3418 18.5V24.793L21.1396 21.6492V15.3524Z"
          fill="url(#paint0_linear_105_2)"
        />
        <path
          d="M14.5615 11.2061L8.76379 14.35V20.6437L14.5615 17.4999V11.2061Z"
          fill="url(#paint1_linear_105_2)"
        />
        <path
          d="M21.9219 14.5702L16.1241 11.4264L21.9219 8.28259L27.7196 11.4264L21.9219 14.5702Z"
          fill="url(#paint2_linear_105_2)"
        />
        <path
          d="M28.498 15.3524V21.6492L34.2957 24.793V18.5L28.498 15.3524Z"
          fill="url(#paint3_linear_105_2)"
        />
        <path
          d="M21.9219 22.4314L16.1241 25.5752L21.9219 28.7191L27.7196 25.5752L21.9219 22.4314Z"
          fill="url(#paint4_linear_105_2)"
        />
        <path
          d="M35.0781 11.2061V17.4999L40.8759 14.35V8.05627L35.0781 11.2061Z"
          fill="url(#paint5_linear_105_2)"
        />
        <text
          fill="url(#paint6_linear_105_2)"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Space Grotesk"
          fontSize="20"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="48" y="26.5">AlgroAI.build</tspan>
        </text>
        <path
          d="M48 30H148"
          stroke="url(#paint7_linear_105_2)"
          strokeWidth="2"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_105_2"
          x1="15.3418"
          y1="20.0727"
          x2="21.1396"
          y2="20.0727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_105_2"
          x1="8.76379"
          y1="15.9249"
          x2="14.5615"
          y2="15.9249"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_105_2"
          x1="16.1241"
          y1="11.4264"
          x2="27.7196"
          y2="11.4264"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#6EE7B7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_105_2"
          x1="28.498"
          y1="20.0727"
          x2="34.2957"
          y2="20.0727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_105_2"
          x1="16.1241"
          y1="25.5752"
          x2="27.7196"
          y2="25.5752"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A7F3D0" />
          <stop offset="1" stopColor="#D1FAE5" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_105_2"
          x1="35.0781"
          y1="12.7781"
          x2="40.8759"
          y2="12.7781"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_105_2"
          x1="48"
          y1="25"
          x2="148"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#E5E7EB" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_105_2"
          x1="48"
          y1="31"
          x2="148"
          y2="31"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#A7F3D0" />
        </linearGradient>
        <clipPath id="clip0_105_2">
          <rect width="150" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
