"use client";

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({
  text = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px] animate-fadeIn">
      <div className="w-10 h-10 border-3 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="ml-4 text-slate-600 text-sm">{text}</p>
    </div>
  );
}
