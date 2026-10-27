import {useEffect, useRef, useState} from "react";
import {Hamburger} from "../Hamburger/Hamburger";
import {SideMenu} from "../SideMenu/SideMenu";
export interface menuItems {
  title: string;
  path: string;
}

const menuItems: menuItems[] = [
  {title: "Sign In", path: "/signin"},
  {title: "Sign Up", path: "/signup"},
  {title: "Try It", path: "/signin"},
];

export function UserMenu() {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  function onClickHandler() {
    setOpen((open) => !open);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef}>
      <Hamburger handleClick={onClickHandler} isOpen={open} />
      <SideMenu
        isOpen={open}
        menuItemsprops={menuItems}
        onClose={handleClose}
      />
    </div>
  );
}
