import { atom } from "recoil";

// useForm에 타입하는방법 #6.8
// register로 등록된 form 요소들의 key를 적어주면 된다. #6.8
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
