import { useForm } from "react-hook-form"; // npm i react-hook-form

export default function ToDoList() {
  const { register, watch } = useForm();
  // react-hook-form의 useForm()의 register는 해당 form 요소를 react-hook-form에 등록해주는 함수다.  #6.6
  // react-hook-form의 useForm()의 watch는 react-hook-form에 등록된 form 요소들의 변화를 추적하는 함수다.  #6.6

  console.log(watch());

  return (
    <div>
      <form>
        <input {...register("email")} placeholder="Email을 입력하세요." />
        <input {...register("firstName")} placeholder="이름을 입력하세요." />
        <input {...register("lastName")} placeholder="성을 입력하세요." />
        <input {...register("userName")} placeholder="닉네임을 입력하세요." />
        <input {...register("password1")} placeholder="비밀번호를 입력하세요." />
        <input {...register("password2")} placeholder="비밀번호를 재입력하세요." />
        <button>등록</button>
      </form>
    </div>
  );
}
