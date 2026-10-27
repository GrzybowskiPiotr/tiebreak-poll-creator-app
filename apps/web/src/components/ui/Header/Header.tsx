import {Logo} from "../Logo/Logo";
import {UserMenu} from "../UserMenu/UserMenu";
import style from "./Header.module.css";
export function Header() {
  return (
    <header className={style.header}>
      <Logo />
      <UserMenu />
    </header>
  );
}
