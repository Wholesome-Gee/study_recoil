import { atom, selector } from "recoil";

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

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
// selector는 atom을 가져와서 output을 변형시킬 수 있다.  #6.16
// get 함수는 options라는 parameter를 갖고 있으며, 그 안의 get함수를 사용하여 atom을 가져올 수 있다.  #6.16
// Array.filter((item)=>조건식) = 조건식을 만족하는 배열의 요소들을 배열로 반환한다.
