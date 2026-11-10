import {useForm, useWatch, type Control} from "react-hook-form";
import style from "./CreatePoll.module.css";

interface FormInputs {
  pollName: string;
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
    defaultValues: {pollName: "New Poll"},
  });

  return (
    <div className={style.creatorContainer}>
      <h1>Make a new poll</h1>
      <h2>Get the crew togetther and let them decide.</h2>
      <form onSubmit={handleSubmit(console.log)}>
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
              minLength: {value: 2, message: "Name must have adlist 2 letters"},
              maxLength: {
                value: 120,
                message: "max title is 120 charaters long",
              },
            })}
          />
          <p className={style.charactersLeft}>
            {<TextAreaWatch control={control} />}/120 characters
          </p>
          {errors.pollName && <p role='alert'>{errors.pollName.message}</p>}
        </div>
        <div className={style.card}>
          <h3>The options</h3>
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
