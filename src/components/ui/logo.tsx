import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/Screenshot_20250815_175130-removebg-preview.png"
        alt="AlgroAI.build Logo"
        width={180}
        height={60}
        priority
      />
    </div>
  );
}
