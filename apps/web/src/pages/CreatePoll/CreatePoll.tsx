import {DragDropProvider} from "@dnd-kit/react";
import {isSortable} from "@dnd-kit/react/sortable";
import {useFieldArray, useForm, useWatch, type Control} from "react-hook-form";
import {OptionInput} from "../../components/ui/OptionInput/OptionInput";
import {PillButton} from "../../components/ui/PillButton/PillButton";
import style from "./CreatePoll.module.css";

interface FormInputs {
  pollName: string;
  options: {name: string}[];
}

function TextAreaWatch({control}: {control: Control<FormInputs>}) {
  const pollName = useWatch({
    control,
    name: "pollName",
  });

  return pollName.length;
}
export function CreatePoll() {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormInputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      pollName: "New Poll",
      options: [{name: "pizza"}, {name: "burgers"}],
    },
  });

  const MAX_ITEMS = 10;
  const {fields, remove, append, move} = useFieldArray({
    name: "options",
    control,
    rules: {
      minLength: {value: 2, message: "Poll must have at least 2 options"},
      maxLength: {
        value: MAX_ITEMS,
        message: `Poll can have at most ${MAX_ITEMS} options`,
      },
    },
  });

  const inputValidator = (value: string) =>
    value.trim().length >= 3 || "Option must have at least 3 characters";

  const pollNameValidator = (value: string) =>
    value.trim().length >= 3 || "Poll name must have at least 3 characters";

  return (
    <div className={style.creatorContainer}>
      <h1>Make a new poll</h1>
      <h2>Get the crew togetther and let them decide.</h2>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className={style.card}>
          <h3>The question</h3>
          <label htmlFor='pollName'>
            What are we deciding?<span>*</span>
          </label>
          <textarea
            id='pollName'
            aria-invalid={errors.pollName ? true : false}
            {...register("pollName", {
              required: "Poll moust have a name",
              minLength: {
                value: 3,
                message: "Name must have at least 3 characters",
              },
              maxLength: {
                value: 120,
                message: "max title is 120 charaters long",
              },
              validate: pollNameValidator,
            })}
          />
          <p className={style.charactersLeft}>
            {<TextAreaWatch control={control} />}/120 characters
          </p>
          {errors.pollName && <p role='alert'>{errors.pollName.message}</p>}
        </div>
        <div className={style.card}>
          <h3>The options</h3>
          <DragDropProvider
            onDragEnd={(event) => {
              if (event.canceled) return;

              const {source} = event.operation;
              if (isSortable(source)) {
                const {initialIndex, index} = source;
                if (initialIndex === index) return;
                move(initialIndex, index);
              }
            }}
          >
            <ul className={style.optionsList}>
              {fields.map((field, index) => {
                return (
                  <OptionInput
                    index={index}
                    id={field.id}
                    key={field.id}
                    error={errors?.options?.[index]?.name?.message}
                    registration={register(`options.${index}.name`, {
                      required: "Option is required",
                      validate: inputValidator,
                    })}
                    removeBattonClik={() => remove(index)}
                  />
                );
              })}
            </ul>
          </DragDropProvider>
          {errors.options?.root?.message && (
            <p className={style.errorMessage} role='alert'>
              <span>
                <i className='fa-solid fa-circle-exclamation'></i>
              </span>
              {errors.options?.root?.message}
            </p>
          )}
          <PillButton
            onClickHandler={() => append({name: ""})}
            text={`+ Add an option ${fields.length}/${MAX_ITEMS}`}
            variant='outline'
            isDisabled={fields.length >= MAX_ITEMS}
          />
        </div>

        <button type='submit'>
          Create Poll{" "}
          <span>
            <i className='fa-solid fa-arrow-right'></i>
          </span>
        </button>
      </form>
    </div>
  );
}
