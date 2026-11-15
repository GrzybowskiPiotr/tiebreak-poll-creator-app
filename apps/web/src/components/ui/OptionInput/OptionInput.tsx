import {useSortable} from "@dnd-kit/react/sortable";
import type {UseFormRegisterReturn} from "react-hook-form";
import style from "./OptionInput.module.css";
interface OptionInputProps {
  removeBattonClik: () => void;
  registration: UseFormRegisterReturn;
  error?: string;
  id: string;
  index: number;
}

export function OptionInput({
  removeBattonClik,
  registration,
  error,
  id,
  index,
}: OptionInputProps) {
  const {ref, handleRef} = useSortable({id, index});

  return (
    <li ref={ref} id={`option-item${id}`}>
      <div className={style.optionInput}>
        <button
          type='button'
          aria-label='Drag option'
          className={style.dragButton}
          ref={handleRef}
        >
          <i className='fa-solid fa-grip-vertical'></i>
        </button>
        <input
          id={`option-${id}`}
          type='text'
          {...registration}
          aria-describedby={error ? `option-${id}-error` : undefined}
          aria-invalid={error ? true : false}
        />
        <button
          type='button'
          aria-label='Remove option'
          onClick={removeBattonClik}
        >
          <i className='fa-regular fa-circle-xmark'></i>
        </button>
      </div>
      {error && (
        <p
          className={style.errorMessage}
          role='alert'
          id={`option-${id}-error`}
        >
          <span>
            <i className='fa-solid fa-circle-exclamation'></i>
          </span>
          {error}
        </p>
      )}
    </li>
  );
}
