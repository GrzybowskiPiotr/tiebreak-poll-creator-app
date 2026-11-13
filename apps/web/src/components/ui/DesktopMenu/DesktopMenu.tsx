import {authClient} from "../../../lib/auth-client";
import {LoggedUserMenu} from "../LoggedUserMenu/LoggedUserMenu";
import {PillButtonLink} from "../PillButtonLink/PillButtonLink";
import type {menuItems} from "../UserMenu/UserMenu";
import style from "./DesktopMenu.module.css";
interface DesktopMenuProps {
  menuItems: menuItems[];
}

export function DesktopMenu({menuItems}: DesktopMenuProps) {
  const {data: session} = authClient.useSession();

  return (
    <nav className={style.desktopNav}>
      {session ? (
        <LoggedUserMenu />
      ) : (
        <ul>
          {menuItems.map((item, i) => (
            <li key={item.title}>
              <PillButtonLink
                to={item.path}
                variant={i === menuItems.length - 1 ? "outline" : "primary"}
              >
                {item.title}
              </PillButtonLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
