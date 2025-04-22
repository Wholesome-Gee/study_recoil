import { useForm } from "react-hook-form"; // npm i react-hook-form

export default function ToDoList() {
  const { register, watch, handleSubmit, formState } = useForm();
  // react-hook-form의 useForm()의 register는 해당 form 요소를 react-hook-form에 등록해주는 함수다.  #6.6
  // 또한, 2개의 parameter를 받으며 form 요소의 식별자(필수), 유효성검사를 위한 객체(옵션)를 parameter로 받는다.  #6.7
  // react-hook-form의 useForm()의 watch는 react-hook-form에 등록된 form 요소들의 변화를 추적하는 함수다.  #6.6
  // react-hook-form의 useForm()의 handleSubmit은 form이 submit되었을 때 유효성검사를 해주며, 새로고침도 막아주는 기능이 있다.  #6.7
  // 또한, 2개의 parameter를 받으며 유효성검사에 성공했을 때의 콜백함수(필수), 유효성검사에 실패했을 떄의 콜백함수(옵션)을 parameter로 받는다.  #6.7
  // react-hook-form의 useForm()의 formState는 현재 from의 상태를 표현하는 객체이며, isDirty(form 입력값이 수정되었는지), isLoading, isSubmitted, errors 등의 기능을 갖고있다. #6.7
  function successSubmit(data: any) {
    console.log(data);
  }
  console.log(formState.errors);
  // console.log(watch());

  return (
    <div>
      <form onSubmit={handleSubmit(successSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <input {...register("email", { required: "Email을 입력하세요." })} placeholder="Email을 입력하세요." />
        <input {...register("firstName", { required: "이름을 입력하세요." })} placeholder="이름을 입력하세요." />
        <input {...register("lastName", { required: "성을 입력하세요." })} placeholder="성을 입력하세요." />
        <input {...register("userName", { required: "닉네임을 입력하세요." })} placeholder="닉네임을 입력하세요." />
        <input {...register("password1", { required: "비밀번호를 입력하세요.", minLength: { value: 8, message: "비밀번호는 8자리 이상 입력하세요." } })} placeholder="비밀번호를 입력하세요." />
        <input {...register("password2", { required: "비밀번호를 재입력하세요.", minLength: { value: 8, message: "비밀번호는 8자리 이상 입력하세요." } })} placeholder="비밀번호를 재입력하세요." />
        <button>등록</button>
      </form>
    </div>
  );
}
/* 
register()는 첫번쨰 parameter로 form 관련 요소의 식별자를 받고,
두번쨰 parameter로 유효성검사에 대한 객체를 받는다.
register()의 유효성검사에서 required에 text를 적으면, formState에 의하여 유효성검사 실패 시 text가 message로 출력된다.
register()의 유효성검사에서 minLength:{value:8,message:"~~~"}를 적으면, formState에 의하여 유효성검사 실패 시 ~~~가 message로 출력된다.
*/
