import { useRecoilState, useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";
import { Categories, categoryState, toDoSelector } from "../atom";
import ToDo from "./ToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilValue() = recoil에 등록된 atom/selector를 가져온다.  #6.2
  const [category, setCategory] = useRecoilState(categoryState);
  //useRecoilState()는 atom/selector의 getter,setter를 반환한다.  #6.11

  function changeCategory(event: React.FormEvent<HTMLSelectElement>) {
    setCategory(event.currentTarget.value as Categories);
  }

  return (
    <div>
      <h1>오늘의 할일</h1>
      <hr />
      <select value={category} onInput={changeCategory}>
        <option value={Categories.TO_DO}>할 일</option>
        <option value={Categories.DOING}>진행중</option>
        <option value={Categories.DONE}>완료</option>
      </select>
      <ToDoForm />
      <ul>
        {toDos?.map((toDo) => {
          return <ToDo key={toDo.id} {...toDo} />;
          // {...toDo} toDo객체를 spread문법을 통해 props로 전달  #6.12
        })}
      </ul>
    </div>
  );
}
