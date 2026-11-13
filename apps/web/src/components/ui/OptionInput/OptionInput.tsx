import type {UseFormRegisterReturn} from "react-hook-form";
import style from "./OptionInput.module.css";
interface OptionInputProps {
  removeBattonClik: () => void;
  registration: UseFormRegisterReturn;
}

export function OptionInput({
  removeBattonClik,
  registration,
}: OptionInputProps) {
  return (
    <div className={style.optionInput}>
      <button
        type='button'
        aria-label='Drag option'
        className={style.dragButton}
      >
        <i className='fa-solid fa-grip-vertical'></i>
      </button>
      <input type='text' {...registration} />
      <button
        type='button'
        aria-label='Remove option'
        onClick={removeBattonClik}
      >
        <i className='fa-regular fa-circle-xmark'></i>
      </button>
    </div>
  );
}
