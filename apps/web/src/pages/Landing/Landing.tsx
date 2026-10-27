import {AppPreView} from "../../features/landing/components/AppPreView/AppPreView";
import {Hero} from "../../features/landing/components/Hero/Hero";
import {KeyFeatures} from "../../features/landing/components/KeyFeatures/KeyFeatures";

export function Landing() {
  return (
    <>
      <Hero />
      <AppPreView />
      <KeyFeatures />
    </>
  );
}
