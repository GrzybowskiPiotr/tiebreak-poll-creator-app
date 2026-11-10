import {Link} from "react-router-dom";
import style from "./Logo.module.css";
export function Logo() {
  return (
    <Link className={style.container} to='/'>
      <div className={style.logo}>
        <span>
          <i className='fa-solid fa-check'></i>
        </span>
      </div>
      <p>tiebraek</p>
    </Link>
  );
}
