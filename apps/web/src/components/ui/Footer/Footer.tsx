import style from "./Footer.module.css";
export function Footer() {
  return (
    <footer className={style.footer}>
      <p>
        App created by{" "}
        <a
          href='https://www.frontendmentor.io/profile/GrzybowskiPiotr'
          rel='noopener'
          target='_balnk'
        >
          GrzybowskiPiotr
        </a>
      </p>
    </footer>
  );
}
