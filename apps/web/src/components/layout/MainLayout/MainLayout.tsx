import {Outlet} from "react-router-dom";
import {Footer} from "../../ProtectedRoute/ui/Footer/Footer";
import {Header} from "../../ProtectedRoute/ui/Header/Header";
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
