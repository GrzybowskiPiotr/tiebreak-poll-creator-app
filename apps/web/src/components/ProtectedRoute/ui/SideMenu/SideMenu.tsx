import {Link} from "react-router-dom";
import type {menuItems} from "../UserMenu/UserMenu";
import style from "./SideMenu.module.css";
interface props {
  isOpen: boolean;
  menuItemsprops: menuItems[];
  onClose: () => void;
}
export function SideMenu({isOpen, menuItemsprops, onClose}: props) {
  return (
    <>
      <nav className={`${style.nav} ${isOpen && style.open}`}>
        <ul>
          {menuItemsprops.map((item) => {
            return (
              <li key={item.title}>
                <Link to={item.path} onClick={onClose}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
