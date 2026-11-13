import style from "./FormContainer.module.css";

interface props {
  children: React.ReactNode;
}

export function FormContainer({children}: props) {
  return <div className={style.formContainer}>{children}</div>;
}
