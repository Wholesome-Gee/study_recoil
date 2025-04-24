import { useRecoilState, useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";
import { Categories, categoryState, toDoSelector } from "../atom";
import ToDo from "./ToDo";
import styled from "styled-components";

const Project = styled.div`
  width: 1000px;
  margin: 50px auto;
  border: 1px solid #f0f0f0;
  color: #f0f0f0;
`;
const Main = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CategoryBox = styled(Main)`
  padding: 50px 0 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    font-size: 24px;
    margin-right: 24px;
  }
`;
const SelectBox = styled.div`
  position: relative;
  width: 200px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  select::-ms-expand {
    display: none;
  }
  select {
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    font-size: 16px;
    color: #f0f0f0;
    outline: 0 none;
    padding: 0 10px;
    position: relative;
    z-index: 3; // select가 위로 올라와야 함
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  option {
    background: #3c3c3c;
    color: #f0f0f0;
    font-size: 16px;
  }
  span > img {
    width: 16px;
    position: absolute;
    top: 12px;
    right: 10px;
    z-index: 1;
    transition: all 0.2s linear;
  }
`;
const Header = styled.h1`
  padding: 32px 48px;
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid #f0f0f0;
`;
const ListsBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilValue() = recoil에 등록된 atom/selector를 가져온다.  #6.2
  const [category, setCategory] = useRecoilState(categoryState);
  //useRecoilState()는 atom/selector의 getter,setter를 반환한다.  #6.11

  function changeCategory(event: React.FormEvent<HTMLSelectElement>) {
    setCategory(event.currentTarget.value as Categories);
  }

  return (
    <Project>
      <Header>오늘 뭐하지? ☺️</Header>
      <Main>
        <CategoryBox>
          <p>카테고리: </p>
          <SelectBox>
            <select value={category} onInput={changeCategory}>
              <option value={Categories.TO_DO}>할 일 ❤️</option>
              <option value={Categories.DOING}>진행중 💛</option>
              <option value={Categories.DONE}>다했다 💚</option>
            </select>
            <span>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9E12r992ZyyaXCztO51HzUlvp_bhZTdpMXA&s" alt="화살표" />
            </span>
          </SelectBox>
        </CategoryBox>
        <ToDoForm />
        <ListsBox>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
            // {...toDo} toDo객체를 spread문법을 통해 props로 전달  #6.12
          ))}
        </ListsBox>
      </Main>
    </Project>
  );
}
