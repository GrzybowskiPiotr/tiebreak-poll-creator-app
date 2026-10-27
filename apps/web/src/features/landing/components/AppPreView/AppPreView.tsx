// do zastanwowienia się czy nie podwać przez props obrazka odpowiedniego dla danego widoku - mobile/tablet/desktop
import style from "./AppPreView.module.css";
import img from "/images/appPreview.png";
export function AppPreView() {
  return (
    <div className={style.imgContainer}>
      <img src={img} alt='app preview of aplication' />
    </div>
  );
}
