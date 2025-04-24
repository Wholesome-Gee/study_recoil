import React from "react";
import { Categories, IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  function changeCategory(event: React.MouseEvent<HTMLButtonElement>) {
    setToDos((toDos) => {
      const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
      // Array.findIndex((item)=>조건식) = 조건식과 일치하는 요소의 index를 반환한다.  #6.14

      const newToDo = { text, id, category: event.currentTarget.name as IToDo["category"] };

      return [...toDos.slice(0, targetIndex), newToDo, ...toDos.slice(targetIndex + 1)];
      // Array.slice(index1,index2) = 배열의 index1부터 index2까지 있는 요소들을 제거 후 새로운 배열을 반환한다.  #6.15
    });
  }

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button onClick={changeCategory} name={Categories.TO_DO}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button onClick={changeCategory} name={Categories.DOING}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button onClick={changeCategory} name={Categories.DONE}>
          DONE
        </button>
      )}
    </li>
  );
}

export default ToDo;
