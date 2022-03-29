import { UseFormRegisterReturn } from "react-hook-form";

type PropsType = {
  id: string
  labelName: string
  register: UseFormRegisterReturn
  optionLists: string[]
}
type ButtonPropsType = {
  disabled: boolean
}

export const TextInput = (props: PropsType) => {
  const { id, labelName, register} = props;
  return (
    <>
      <label htmlFor={id}>{labelName}</label>
      <input id={id} type="text" {...register}/>
    </>
  )
};

export const SelectBox = (props: PropsType) => {
  const { id, labelName, register, optionLists } = props;
  return (
    <>
      <label htmlFor={id}>{labelName}</label>
      <select id={id} {...register}>
        {optionLists.map((list) => [
          <option key={list} value={list}>{list}</option>
        ])}
      </select>
    </>
  )
};

export const SubmitButton = ({disabled}: ButtonPropsType) => {
  return (
    <button type='submit' disabled={disabled}>
      Click
    </button>
  )
}