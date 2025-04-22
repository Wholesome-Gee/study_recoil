import React from "react";
import { IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  function changeCategory(event: React.MouseEvent<HTMLButtonElement>) {
    const { currentTarget: name } = event;
  }
  return (
    <li>
      <span>{text}</span>
      <button onClick={changeCategory} name="DOING">
        Doing
      </button>
      <button onClick={changeCategory} name="TO_DO">
        To Do
      </button>
      <button onClick={changeCategory} name="DONE">
        Done
      </button>
    </li>
  );
}

export default ToDo;
