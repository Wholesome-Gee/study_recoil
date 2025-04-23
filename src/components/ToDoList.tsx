import { useRecoilState, useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";
import { Categories, categoryState, toDoSelector } from "../atom";
import ToDo from "./ToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  // recoil selector도 atom처럼 useRecoilValue, useRecoilState를 통해 불러올 수 있다.  #6.16~#6.17
  /*
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {watch, formState: { errors }, setError } = useForm<IForm>({ defaultValues: {} });
  useRecoilState(atom)은 atom의 getter,setter를 반환한다.  #6.11
  watch('key') = 'key'요소의 변화를 관찰, watch()는 전체 form 관련 요소의 변화를 관찰  #6.6
  formState = 현재 from의 상태를 표현하는 객체 ( isDirty(form 입력값이 수정되었는지), isLoading, isSubmitted, errors ... ) #6.7
  useForm({defaultValues:{location:"서울"}}) = location input에 기본값 설정  #6.8
  setError = error를 의도적으로 발생  #6.9
  */

  function onInput(event: React.FormEvent<HTMLSelectElement>) {
    setCategory(event.currentTarget.value as Categories);
  }

  return (
    <div>
      <h1>오늘의 할일</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>할 일</option>
        <option value={Categories.DOING}>진행중</option>
        <option value={Categories.DONE}>완료</option>
      </select>
      <ToDoForm />
      {toDos?.map((toDo) => {
        return <ToDo key={toDo.id} {...toDo} />;
      })}
    </div>
  );
}
/* 
register('key', { 유효성검사 key : '유효성검사 value'})  #6.7
register('key', { required: true}) => register('key', { required: "에러메시지" })  #6.6
register('key', { minlength: { value: 10 , message: "에러메시지" }})  #6.6
register('key',{ pattern: { value: 정규표현식, message: "에러메시지"}})  #6.8
register('key',{ validate: (value)=> 조건식(false일 시 errorMessage 도출) message: "에러메시지"}})  #6.9
message는 formState.errors.key.message에 저장된다.  #6.8
{...toDos}는 toDos객체를 spread문법을 통해 한번에 props로 전달하는 방법  #6.12
*/
