import {Link} from "react-router-dom";
import style from "./PillButtonLink.module.css";

interface ComponentProps {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

export function PillButtonLink({
  to,
  variant = "primary",
  className,
  children,
}: ComponentProps) {
  return (
    <Link
      className={`${style.button} ${className ?? ""} ${style[variant]}`}
      to={to}
    >
      {children}
    </Link>
  );
}
