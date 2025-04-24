import React from "react";
import { Categories, IToDo, toDoState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ListBox = styled.li`
  border: 1px solid #f0f0f0;
  width: 300px;
  border-radius: 10px;
  padding: 16px;
  position: relative;
`;
const List = styled.p`
  text-align: center;
  margin-bottom: 16px;
`;
const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const Button = styled.button`
  background-color: rgba(366, 366, 366, 0.3);
  padding: 8px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgba(366, 366, 366, 0.7);
  }
`;
function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
  // Array.findIndex((item)=>조건식) = 조건식과 일치하는 요소의 index를 반환한다.  #6.14

  function changeCategory(event: React.MouseEvent<HTMLButtonElement>) {
    setToDos((toDos) => {
      const newToDo = { text, id, category: event.currentTarget.name as IToDo["category"] };

      return [...toDos.slice(0, targetIndex), newToDo, ...toDos.slice(targetIndex + 1)];
      // Array.slice(index1,index2) = 배열의 index1부터 index2까지 있는 요소들을 제거 후 새로운 배열을 반환한다.  #6.15
    });
  }

  // codeChallenge
  function deleteToDo(event: React.MouseEvent<HTMLButtonElement>) {
    /*
    ToDos배열에서 해당 toDo를 삭제한다.
    1. toDos를 불러온다.
    2. toDos에서 해당 toDo를 찾는다.
    3. splice를 이용해 제거한다.
    */
    setToDos((toDos) => {
      const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
      return [...toDos.slice(0, targetIndex), ...toDos.slice(targetIndex + 1)];
    });
  }

  return (
    <ListBox>
      <List>{text}</List>
      <ButtonBox>
        {category !== Categories.TO_DO && (
          <Button onClick={changeCategory} name={Categories.TO_DO}>
            할 일 ❤️
          </Button>
        )}
        {category !== Categories.DOING && (
          <Button onClick={changeCategory} name={Categories.DOING}>
            진행중 💛
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button onClick={changeCategory} name={Categories.DONE}>
            다했다 💚
          </Button>
        )}
        <Button onClick={deleteToDo}>삭제 🗑️</Button>
      </ButtonBox>
    </ListBox>
  );
}

export default ToDo;
