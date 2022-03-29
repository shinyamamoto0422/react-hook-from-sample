import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { TextInput, SubmitButton, SelectBox} from './common/index'

type ValueTypes = {
  name: string,
  introduction: string,
  department: 'product' | 'sales' | 'marketing' | ''
  programingLanguage: 'golang' | 'ruby' | 'javascript' | ''
}

const departmentList = ["", "product", "marketing", "sales"];
const programingList = ["", "Golang", "Ruby", "JavaScript"]

const SampleForm = () => {
  const { register, watch, handleSubmit, formState } = useForm<ValueTypes>({
    mode: 'onSubmit', // バリデーションが実行されるタイミング
    reValidateMode: 'onChange', //再度バリデーションを実行するタイミング
    defaultValues: { //初回レンダリング時のフォームのデフォルト値
      name: '',
      introduction: '',
      department: '',
      programingLanguage: ''
    }
  });

  const handleOnSubmit: SubmitHandler<ValueTypes> = (values) => {
    console.log(values);
  }

  const handleOnError: SubmitErrorHandler<ValueTypes> = (errors) => {
    console.log(errors);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit ,handleOnError)}>
        <div>
          {!!formState.errors.name && 
            <p>{formState.errors.name.message}</p>
          }
          <TextInput 
            id='name' 
            labelName='name' 
            register={register('name')} 
            optionLists={[]}/>
        </div>

        <div>
          <label htmlFor="introduction">Introduction</label>
          {!!formState.errors.introduction && 
            <p>{formState.errors.introduction.message}</p>
          }
          <textarea 
            id="introduction"
            {...register('introduction', {
              required: 'this is required filed',
              minLength: {
                value: 10,
                message: 'please enter at least 10 characters'
              }
            })}
          ></textarea>
        </div>

        <div>
          <label htmlFor="department">Department1</label>
          {!!formState.errors.department && 
            <p>{formState.errors.department.message}</p>
          }
          <SelectBox 
            id='department' 
            labelName='department' 
            register={register('department')} 
            optionLists={departmentList}
          />
        </div>
        
        <div>
          {watch('department') === 'product' && 
            <SelectBox 
              id="programing-language"
              labelName='programing-language'
              register={register('programingLanguage')}
              optionLists={programingList}
            />
          }
        </div>

        <SubmitButton disabled={!formState.isDirty || formState.isSubmitting}/>
      </form>
    </div>
  )
}

export default SampleForm;

