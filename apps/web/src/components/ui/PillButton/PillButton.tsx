import style from "./PillButton.module.css";

interface ComponentProps {
  text: string;
  variant?: "primary" | "outline";
  className?: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
}

export function PillButton({
  onClickHandler,
  variant = "primary",
  className,
  text,
  isDisabled = false,
}: ComponentProps) {
  return (
    <button
      className={`${style.button} ${className ?? ""} ${style[variant]}`}
      type='button'
      disabled={isDisabled}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
}
