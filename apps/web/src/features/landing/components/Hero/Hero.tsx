import {PillButtonLink} from "../../../../components/ui/PillButtonLink/PillButtonLink";
import style from "./Hero.module.css";
import rays from "/images/yellowRays.png";
export function Hero() {
  return (
    <div className={style.container}>
      <p>make decisions together</p>
      <div className={style.heroTextConteiner}>
        <h1>Can’t decide? Let your people pick.</h1>
        <img src={rays} />
      </div>
      <p>
        Create a poll, share the link, and let everyone have a say. Fast,
        simple, and fun.
      </p>
      <div className={style.linkContaner}>
        <PillButtonLink to='/polls/' variant='primary'>
          Create your own poll
          <span>
            <i className='fa-solid fa-arrow-right'></i>
          </span>
        </PillButtonLink>
        <PillButtonLink to='/polls/user:guest' variant='outline'>
          Try as guest
        </PillButtonLink>
      </div>
    </div>
  );
}
