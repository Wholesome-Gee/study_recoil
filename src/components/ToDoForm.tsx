import { useForm } from "react-hook-form"; // npm i react-hook-form
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";
import styled from "styled-components";
import { CiCirclePlus } from "react-icons/ci";

const Form = styled.form`
  width: 300px;
  margin: 0 auto;
  margin-bottom: 50px;
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 30px 8px 0;
  font-size: 16px;
  color: #f0f0f0;
`;
const Button = styled.button`
  width: 25px;
  height: 25px;
  font-size: 16px;
  border-radius: 50%;
  position: absolute;
  right: 0;
`;
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
      ...toDos,
      {
        text: data.toDo,
        id: Date.now(),
        category,
      },
    ]);
    setValue("toDo", "");
  }

  return (
    <Form onSubmit={handleSubmit(successSubmit)}>
      <Input {...register("toDo", { required: "할 일을 입력하세요." })} placeholder="할 일을 입력하세요." />
      <Button>+</Button>
    </Form>
  );
}

export default ToDoForm;
