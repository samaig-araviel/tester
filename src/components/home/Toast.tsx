"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  undoAction?: () => void;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, undoAction, visible, onClose }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 200);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, onClose]);

  if (!visible && !show) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-200 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-soft-navy text-white shadow-lg font-body text-[14px]">
        <span>{message}</span>
        {undoAction && (
          <button
            onClick={() => {
              undoAction();
              onClose();
            }}
            className="font-medium text-warm-teal-light hover:text-white transition-colors cursor-pointer"
          >
            Undo
          </button>
        )}
        <button
          onClick={onClose}
          className="ml-1 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
