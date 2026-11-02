import style from "./AppPreView.module.css";
import img from "/images/appPreview.png";
import desktopViewApp from "/images/VotingApp_desktopView.png";
export function AppPreView() {
  return (
    <div className={style.imgContainer}>
      <picture>
        <source media='(min-width: 992px)' srcSet={desktopViewApp} />
        <img src={img} alt='wygląd aplikacji' />
      </picture>
    </div>
  );
}
