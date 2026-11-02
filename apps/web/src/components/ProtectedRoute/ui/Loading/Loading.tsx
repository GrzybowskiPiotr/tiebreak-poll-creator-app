import {OrbitProgress} from "react-loading-indicators";
import style from "./Loading.module.css";
interface loadingProps {
  loading_title: string;
}

export function Loading({loading_title}: loadingProps) {
  return (
    <div className={style.loadingContainer}>
      <OrbitProgress
        variant='spokes'
        color='#ed5b17'
        size='medium'
        text={loading_title}
        textColor=''
      />
    </div>
  );
}
