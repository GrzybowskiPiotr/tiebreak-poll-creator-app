import style from "./KeyFeatures.module.css";
import featIcon2 from "/images/LightningIcon.png";
import featIcon3 from "/images/LockIcon.png";
import featIcon1 from "/images/ShareIcon.png";
interface featureItem {
  icon: string;
  featureTile: string;
  featureDesc: string;
}

const featuresList: featureItem[] = [
  {
    icon: featIcon1,
    featureTile: "Share with anyone",
    featureDesc: "No account needed to vote.",
  },
  {
    icon: featIcon2,
    featureTile: "See results live",
    featureDesc: "Watch opinions come in.",
  },
  {
    icon: featIcon3,
    featureTile: "Your polls, your rules",
    featureDesc: "Create an account for full control.",
  },
];

export function KeyFeatures() {
  return (
    <div className={style.featuresContainer}>
      <ul>
        {featuresList.map((item) => (
          <li key={item.featureTile}>
            <div className={style.itemContainer}>
              <img src={item.icon} alt='' aria-hidden='true' />
              <div className={style.titleContainer}>
                <h2>{item.featureTile}</h2>
                <p>{item.featureDesc}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
