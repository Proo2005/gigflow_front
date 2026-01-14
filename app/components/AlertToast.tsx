"use client";

import { useEffect } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertToastProps {
  message: string;
  type?: AlertType;
  onClose: () => void;
  duration?: number;
}

const typeStyles: Record<AlertType, string> = {
  success: "bg-green-500 text-black",
  error: "bg-red-500 text-black",
  info: "bg-blue-500 text-white",
  warning: "bg-yellow-400 text-black",
};

export default function AlertToast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: AlertToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-slide-in">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg font-medium ${typeStyles[type]}`}
      >
        {message}
      </div>
    </div>
  );
}
