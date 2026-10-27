import style from "./Hamburger.module.css";
interface props {
  handleClick: () => void;
  isOpen: boolean;
}

export function Hamburger({handleClick, isOpen}: props) {
  return (
    <div className={style.hamburder} onClick={handleClick}>
      <div
        className={`${style.burger} ${style.burger1} ${isOpen && style.open}`}
      ></div>
      <div
        className={`${style.burger} ${style.burger2} ${isOpen && style.open}`}
      ></div>
      <div
        className={`${style.burger} ${style.burger3} ${isOpen && style.open}`}
      ></div>
    </div>
  );
}
