import {DragDropProvider} from "@dnd-kit/react";
import {isSortable} from "@dnd-kit/react/sortable";
import {useFieldArray, useForm, useWatch, type Control} from "react-hook-form";
import {OptionInput} from "../../components/ui/OptionInput/OptionInput";
import {PillButton} from "../../components/ui/PillButton/PillButton";
import {PillButtonLink} from "../../components/ui/PillButtonLink/PillButtonLink";
import {sendPoll} from "../../features/polls/api/pollsApi";
import type {CreatePollPayload} from "../../features/polls/types/poll.types";
import style from "./CreatePoll.module.css";
interface FormInputs {
  pollName: string;
  options: {name: string}[];
  pollType: "single" | "multiple";
  closingDate: string;
  closingTime: string;
  suggestions: boolean;
}

function TextAreaWatch({control}: {control: Control<FormInputs>}) {
  const pollName = useWatch({
    control,
    name: "pollName",
  });

  return pollName.length;
}

const defaultDateAndTime = new Date();
defaultDateAndTime.setHours(defaultDateAndTime.getHours() + 1);

async function submitCallback(formData: FormInputs) {
  const closeAt = new Date(
    `${formData.closingDate}T${formData.closingTime}`,
  ).toISOString();

  const CreatePollPayload: CreatePollPayload = {
    title: formData.pollName,
    pollType: formData.pollType,
    options: formData.options,
    suggestionsEnabled: formData.suggestions,
    closeAt: closeAt,
  };
  const response = await sendPoll(CreatePollPayload);
  console.log(response.ok);
  console.log(response);
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
      pollType: "single",
      closingTime: `${defaultDateAndTime.getHours() == 23 ? "00" : defaultDateAndTime.getHours()}:${String(defaultDateAndTime.getMinutes()).padStart(2, "0")}`,
      closingDate: `${defaultDateAndTime.getFullYear()}-${String(defaultDateAndTime.getMonth() + 1).padStart(2, "0")}-${String(defaultDateAndTime.getDate()).padStart(2, "0")}`,
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

  const closeDateValidator = (closingTime: string, formValues: FormInputs) => {
    const closingDate = formValues.closingDate;

    const InputedDateAndTime = new Date(`${closingDate}T${closingTime}`);

    const NowDate = new Date();

    if (InputedDateAndTime < NowDate) {
      return "Date and time must be in future";
    }

    return true;
  };

  return (
    <div className={style.creatorContainer}>
      <h1>Make a new poll</h1>
      <h2>Get the crew togetther and let them decide.</h2>
      <form onSubmit={handleSubmit(submitCallback)}>
        <div className={style.card}>
          <h3 className={style.title}>The question</h3>
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
        <fieldset className={style.optionsGroup}>
          <legend className={style.title}>The options</legend>
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
            variant='outline'
            isDisabled={fields.length >= MAX_ITEMS}
          >{`+ Add an option ${fields.length}/${MAX_ITEMS}`}</PillButton>
        </fieldset>
        <fieldset className={`${style.optionsGroup} ${style.voteStyle}`}>
          <legend className={style.title}>How should your crew vote ?</legend>
          <label className={style.card} htmlFor='option1'>
            <input
              type='radio'
              id='option1'
              value='single'
              {...register("pollType")}
            />
            <div>
              <h3> Pick one</h3>
              <p>Vote for a single option</p>
            </div>
          </label>
          <label className={style.card} htmlFor='option2'>
            <input
              type='radio'
              id='option2'
              value='multiple'
              {...register("pollType")}
            />
            <div>
              <h3> Pick up to...</h3>
              <p>Let everyone choose up to N optons</p>
            </div>
          </label>
        </fieldset>
        <fieldset
          className={`${style.optionsGroup} ${style.voteColseDateTime}`}
        >
          <legend>When should voting close?</legend>
          <div className={`${style.inputContainer}`}>
            <label htmlFor='date'>
              Closing date<span>*</span>
            </label>
            <input
              type='date'
              id='date'
              {...register("closingDate", {
                required: true,
                deps: "closingTime",
              })}
              className={`${style.card}`}
            />
          </div>
          <div className={`${style.inputContainer}`}>
            <label htmlFor='time'>
              Closing time<span>*</span>
            </label>
            <input
              type='time'
              id='time'
              {...register("closingTime", {
                required: true,
                validate: closeDateValidator,
              })}
              className={`${style.card}`}
              aria-describedby={
                errors.closingTime ? "timeDateError" : undefined
              }
              aria-invalid={errors.closingTime ? true : false}
            />
          </div>
          {errors.closingTime && (
            <p id='timeDateError'>
              <span>
                <i className='fa-solid fa-circle-exclamation'></i>
              </span>{" "}
              {errors.closingTime.message}
            </p>
          )}
        </fieldset>
        {/* suggest options  */}
        <div className={style.card}>
          <h3 className={style.title}>Let the crew suggest options</h3>
          <div className={style.checkbox}>
            <p>
              Your crew can suggest ideas. <br />
              You decide what makes the ballot
            </p>
            <div>
              <label className={style.switch} htmlFor='checkbox'>
                <input
                  type='checkbox'
                  id='checkbox'
                  {...register("suggestions")}
                />
                <div className={`${style.slider} ${style.round}`}></div>
              </label>
            </div>
          </div>
        </div>
        {/* suggest option */}
        <div className={style.formButtonsContainer}>
          <PillButtonLink
            to='/polls'
            variant='outline'
            className={style.cancel}
          >
            Cancel
          </PillButtonLink>
          <PillButton isDisabled={false} type='submit'>
            Create Poll{" "}
            <span>
              <i className='fa-solid fa-arrow-right'></i>
            </span>
          </PillButton>
        </div>
      </form>
    </div>
  );
}
