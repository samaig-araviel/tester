"use client";

interface ScreenTransitionProps {
  children: React.ReactNode;
}

export default function ScreenTransition({ children }: ScreenTransitionProps) {
  return (
    <div className="animate-[slideLeft_180ms_ease-out]">
      {children}
    </div>
  );
}
