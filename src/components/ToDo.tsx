import React from "react";
import { IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  function changeCategory(event: React.MouseEvent<HTMLButtonElement>) {
    const {
      currentTarget: { name },
    } = event;
    setToDos((toDos) => {
      const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = toDos[targetIndex];
      const newToDo = { text, id, category: name as IToDo["category"] };
      return [...toDos.slice(0, targetIndex), newToDo, ...toDos.slice(targetIndex + 1)];
    });
  }
  // Array.findIndex((item)=>조건식) = 조건식과 일치하는 요소의 index를 반환한다.  #6.14
  // Array.slice(startIndex,endIndex) = 배열의 startIndex부터 endIndex까지 있는 요소들을 제거 후 새로운 배열을 반환한다.  #6.15

  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={changeCategory} name="DOING">
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button onClick={changeCategory} name="TO_DO">
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button onClick={changeCategory} name="DONE">
          DONE
        </button>
      )}
    </li>
  );
}

export default ToDo;
