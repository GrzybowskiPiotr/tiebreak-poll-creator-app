import {Link, useNavigate} from "react-router-dom";
import {authClient} from "../../../lib/auth-client";
import {PillButtonLink} from "../PillButtonLink/PillButtonLink";
import style from "./LoggedUserMenu.module.css";

function DestopMenu({logOutHandler}) {
  return (
    <ul className={`${style.navContainer} ${style.desktop}`}>
      <li>
        <ul>
          <li onClick={logOutHandler}>
            <PillButtonLink to='/' variant='outline'>
              Sign out
            </PillButtonLink>
          </li>
        </ul>
      </li>
      <li>
        <ul>
          <li>
            <PillButtonLink to='/polls/new' variant='outline'>
              + New poll
            </PillButtonLink>
          </li>
          <li>
            <PillButtonLink to='/polls/'>Closed</PillButtonLink>
          </li>
          <li>
            <PillButtonLink to='/polls/'>My polls</PillButtonLink>
          </li>
        </ul>
      </li>
    </ul>
  );
}

interface links {
  to: string;
  name: string;
  onClickHandler: () => void;
}

function MobileMenu({onClickH, logOutHandler}) {
  const linkList: links[] = [
    {
      to: "/polls/new",
      name: "+ New poll",
      onClickHandler: onClickH,
    },
    {
      to: "/polls",
      name: "My Polls",
      onClickHandler: onClickH,
    },
    {
      to: "/polls",
      name: "Closed",
      onClickHandler: onClickH,
    },
  ];
  return (
    <ul className={`${style.navContainer} ${style.mobile}`}>
      {linkList.map((i) => {
        return (
          <li key={i.name}>
            <Link to={i.to} onClick={i.onClickHandler}>
              {i.name}
            </Link>
          </li>
        );
      })}
      <li onClick={logOutHandler}>
        <Link to='/' onClick={onClickH}>
          Sign out
        </Link>
      </li>
    </ul>
  );
}

export function LoggedUserMenu({onClickH}) {
  const navigate = useNavigate();

  async function logOutHandler() {
    await authClient.signOut();
    navigate("/");
  }

  return (
    <>
      <MobileMenu logOutHandler={logOutHandler} onClickH={onClickH} />
      <DestopMenu logOutHandler={logOutHandler} />
    </>
  );
}
