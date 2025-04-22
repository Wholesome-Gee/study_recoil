/* Nomadcorder React 마스터클래스 #6.0~#6.9 내용 */

import { useForm } from "react-hook-form"; // npm i react-hook-form

// useForm에 타입하는방법 #6.8
// register로 등록된 form 요소들의 key를 적어주면 된다. #6.8

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password1: string;
  password2: string;
  location: string;
}

export default function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ defaultValues: { location: "서울" } });
  // register = form 관련 요소를 react-hook-form에 등록  #6.6
  // watch('key') = 'key'요소의 변화를 관찰, watch()는 전체 form 관련 요소의 변화를 관찰  #6.6
  // handleSubmit = form이 submit되었을 때 유효성검사 진행 & 새로고침 X  #6.7
  //                또한, 2개 콜백함수를 parameter를 받음 ( 유효성검사 성공시(필수),실패시(옵션) )  #6.7
  // formState = 현재 from의 상태를 표현하는 객체 ( isDirty(form 입력값이 수정되었는지), isLoading, isSubmitted, errors ... ) #6.7
  // useForm({defaultValues:{location:"서울"}}) = location input에 기본값 설정  #6.8
  // setError = error를 의도적으로 발생  #6.9

  function successSubmit(data: IForm) {
    if (data.password1 !== data.password2) {
      setError("password2", { message: "비밀번호가 일치하지 않습니다." }, { shouldFocus: true });
    }
    // setError('extraError', { message: "서버와 연결이 끊겼습니다."})
  }
  // setError('input key', errorMessage, { shouldFocus:true는 focus를 input에 다시 되돌려놓는다. })  #6.9

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(successSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <input {...register("email", { required: "Naver Email을 입력하세요.", pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "Naver Email 형식이 아닙니다." } })} placeholder="Naver Email을 입력하세요." />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: "이름을 입력하세요." })} placeholder="이름을 입력하세요." />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "성을 입력하세요.", validate: (value) => (value.includes("fuck") ? "사용할 수 없는 단어입니다." : true) })} placeholder="성을 입력하세요." />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("userName", {
            required: "닉네임을 입력하세요.",
            validate: {
              fuck: (value) => (value.includes("fuck") ? "사용할 수 없는 단어가 포함되었습니다." : true),
              shit: (value) => (value.includes("shit") ? "사용할 수 없는 단어가 포함되었습니다." : true),
            },
          })}
          placeholder="닉네임을 입력하세요."
        />
        <span>{errors?.userName?.message}</span>
        <input {...register("password1", { required: "비밀번호를 입력하세요.", minLength: { value: 8, message: "비밀번호는 8자리 이상 입력하세요." } })} placeholder="비밀번호를 입력하세요." />
        <span>{errors?.password1?.message}</span>
        <input {...register("password2", { required: "비밀번호를 재입력하세요.", minLength: { value: 8, message: "비밀번호는 8자리 이상 입력하세요." } })} placeholder="비밀번호를 재입력하세요." />
        <span>{errors?.password2?.message}</span>
        <input {...register("location")} placeholder="주소를 입력하세요." />
        <span>{errors?.password2?.message}</span>
        {/* <span>{errors?.extraError?.message}</span> */}
        <button>등록</button>
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
