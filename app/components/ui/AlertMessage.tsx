// app/components/ui/AlertMessage.tsx
import { CheckIconFilled, ErrorIcon } from "../icons";

interface AlertMessageProps {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
}

export default function AlertMessage({ type, message, onDismiss }: AlertMessageProps) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`rounded-2xl mb-6 p-5 ring-1 ${
        isSuccess ? "bg-emerald-50 ring-emerald-200/50" : "bg-red-50 ring-red-200/50"
      }`}
    >
      <div className="flex items-center">
        <div className="shrink-0">
          {isSuccess ? (
            <CheckIconFilled className="h-5 w-5 text-emerald-400" size={20} />
          ) : (
            <ErrorIcon className="h-5 w-5 text-red-400" size={20} />
          )}
        </div>
        <p className={`ml-3 flex-1 text-sm font-medium ${isSuccess ? "text-emerald-800" : "text-red-800"}`}>
          {message}
        </p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`ml-3 text-sm font-medium ${
              isSuccess ? "text-emerald-600 hover:text-emerald-800" : "text-red-600 hover:text-red-800"
            } transition-colors`}
            aria-label="Schließen"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
