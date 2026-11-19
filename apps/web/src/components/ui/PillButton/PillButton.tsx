import style from "./PillButton.module.css";

interface ComponentProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  onClickHandler?: () => void;
  isDisabled?: boolean;
  type?: React.ComponentProps<"button">["type"];
}

export function PillButton({
  onClickHandler,
  variant = "primary",
  className,
  children,
  type = "button",
  isDisabled = false,
}: ComponentProps) {
  return (
    <button
      className={`${style.button} ${className ?? ""} ${style[variant]}`}
      type={type}
      disabled={isDisabled}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}
