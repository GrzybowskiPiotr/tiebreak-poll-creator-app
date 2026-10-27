import {Outlet} from "react-router-dom";
import {Footer} from "../../ui/Footer/Footer";
import {Header} from "../../ui/Header/Header";
import style from "./MainLayout.module.css";
export function MainLayout() {
  return (
    <div className={style.appContainer}>
      <Header />
      <main className={style.outletContener}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
