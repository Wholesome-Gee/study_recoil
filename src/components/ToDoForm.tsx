import { useForm } from "react-hook-form"; // npm i react-hook-form
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

interface IForm {
  toDo: string;
}

function ToDoForm() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  /*
    register = form 관련 요소를 react-hook-form에 등록  #6.6
    handleSubmit = form이 submit되었을 때 유효성검사 진행 & 새로고침 X, 2개 콜백함수를 parameter를 받음 ( 유효성검사 성공시(필수),실패시(옵션) )  #6.7
    setValue = input 값을 변경  #6.10
    */
  const setToDos = useSetRecoilState(toDoState);

  function successSubmit(data: IForm) {
    // console.log("✔️ success", data);
    setToDos((current) => [
      {
        text: data.toDo,
        id: Date.now(),
        category: "TO_DO",
      },
      ...current,
    ]);
    setValue("toDo", "");
  }
  // setError('input key', errorMessage, { shouldFocus:true는 focus를 input에 다시 되돌려놓는다. })  #6.9
  // setValue('input key', value) = input key의 값을 value로 바꾼다  #6.10

  return (
    <form onSubmit={handleSubmit(successSubmit)}>
      <input {...register("toDo", { required: "할 일을 입력하세요." })} placeholder="할 일을 입력하세요." />
      <button>추가</button>
    </form>
  );
}

export default ToDoForm;
