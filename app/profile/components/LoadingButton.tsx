// app/profile/components/LoadingButton.tsx
import { ReactNode } from "react";
import { LoadingSpinnerIcon } from "../../components/icons";

interface LoadingButtonProps {
  loading: boolean;
  loadingText: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export default function LoadingButton({
  loading,
  loadingText,
  children,
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: LoadingButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} className={className}>
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinnerIcon className="mr-3 -ml-1 h-4 w-4 animate-spin text-current" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
