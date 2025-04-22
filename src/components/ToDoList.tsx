import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";
import { toDoState } from "../atom";
import ToDo from "./ToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  /*
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {watch, formState: { errors }, setError } = useForm<IForm>({ defaultValues: {} });
  useRecoilState(atom)은 atom의 getter,setter를 반환한다.  #6.11
  watch('key') = 'key'요소의 변화를 관찰, watch()는 전체 form 관련 요소의 변화를 관찰  #6.6
  formState = 현재 from의 상태를 표현하는 객체 ( isDirty(form 입력값이 수정되었는지), isLoading, isSubmitted, errors ... ) #6.7
  useForm({defaultValues:{location:"서울"}}) = location input에 기본값 설정  #6.8
  setError = error를 의도적으로 발생  #6.9
  */
  return (
    <div>
      <h1>오늘의 할일</h1>
      <hr />
      <ToDoForm />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
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
