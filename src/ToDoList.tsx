import { useForm } from "react-hook-form"; // npm i react-hook-form

// useForm에 타입하는방법 #6.8
// register로 등록된 form 요소들의 key를 적어주면 된다. #6.8

interface IForm {
  toDo: string;
}

export default function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({ defaultValues: {} });
  // register = form 관련 요소를 react-hook-form에 등록  #6.6
  // watch('key') = 'key'요소의 변화를 관찰, watch()는 전체 form 관련 요소의 변화를 관찰  #6.6
  // handleSubmit = form이 submit되었을 때 유효성검사 진행 & 새로고침 X  #6.7
  //                또한, 2개 콜백함수를 parameter를 받음 ( 유효성검사 성공시(필수),실패시(옵션) )  #6.7
  // formState = 현재 from의 상태를 표현하는 객체 ( isDirty(form 입력값이 수정되었는지), isLoading, isSubmitted, errors ... ) #6.7
  // useForm({defaultValues:{location:"서울"}}) = location input에 기본값 설정  #6.8
  // setError = error를 의도적으로 발생  #6.9
  // setValue = input 값을 변경  #6.10

  function successSubmit(data: IForm) {
    console.log("data.toDo =", data.toDo);
    setValue("toDo", "");
  }
  // setError('input key', errorMessage, { shouldFocus:true는 focus를 input에 다시 되돌려놓는다. })  #6.9
  // setValue('input key', value) = input key의 값을 value로 바꾼다  #6.10

  return (
    <div>
      <form onSubmit={handleSubmit(successSubmit)}>
        <input {...register("toDo", { required: "할 일을 입력하세요." })} placeholder="할 일을 입력하세요." />
        <button>추가</button>
      </form>
    </div>
  );
}
/* 
register('key', { 유효성검사 key : '유효성검사 value'})  #6.7
register('key', { required: true}) => register('key', { required: "에러메시지" })  #6.6
register('key', { minlength: { value: 10 , message: "에러메시지" }})  #6.6
register('key',{ pattern: { value: 정규표현식, message: "에러메시지"}})  #6.8
register('key',{ validate: (value)=> 조건식(false일 시 errorMessage 도출) message: "에러메시지"}})  #6.9
message는 formState.errors.key.message에 저장된다.  #6.8
*/
