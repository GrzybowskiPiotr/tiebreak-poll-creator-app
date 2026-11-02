import {AppPreView} from "../../features/landing/components/AppPreView/AppPreView";
import {Hero} from "../../features/landing/components/Hero/Hero";
import {KeyFeatures} from "../../features/landing/components/KeyFeatures/KeyFeatures";
import style from "./Landing.module.css";
export function Landing() {
  return (
    <>
      <div className={style.heroAndAppPreviewContainer}>
        <Hero />
        <AppPreView />
      </div>
      <KeyFeatures />
    </>
  );
}
