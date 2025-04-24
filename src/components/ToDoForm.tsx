import { useForm } from "react-hook-form"; // npm i react-hook-form
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

interface IForm {
  toDo: string;
}

function ToDoForm() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  // useSetRecoilState()는 recoil에 등록된 atom을 변경하는 함수를 반환  #6.3

  function successSubmit(data: IForm) {
    // handleSubmit()의 콜백함수는 data를 parameter로 갖고, data는 register로 등록된 input이 들어있다.  #6.7
    // console.log("✔️ success", data);  →  { inputKey: "inputValue", inputKey2: "inputValue2"... }
    setToDos((toDos) => [
      {
        text: data.toDo,
        id: Date.now(),
        category,
      },
      ...toDos,
    ]);
    setValue("toDo", "");
  }

  return (
    <form onSubmit={handleSubmit(successSubmit)}>
      <input {...register("toDo", { required: "할 일을 입력하세요." })} placeholder="할 일을 입력하세요." />
      <button>추가</button>
    </form>
  );
}

export default ToDoForm;
