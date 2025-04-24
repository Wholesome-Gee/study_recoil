import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist({
  key: "recoil-persist", // 로컬 저장소에 데이터를 저장하는 데 사용됩니다.
  storage: localStorage, // 데이터를 저장하는 데 사용할 저장소
  converter: JSON, // 저장소에서 값이 직렬화/역직렬화되는 방식을 구성합니다.
  // https://www.npmjs.com/package/recoil-persist 참고
});

// TS enum = 반복되는 string을 type할 때 쓰면 좋다.  #6.18
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  // enum의 값은 기본적으로 number(0,1,2...)이지만, string값을 지정할 수 있다.  #6.18
}

export interface IToDo {
  // 해당 interface는 'ToDoForm.tsx'의 useForm()에 type되며, register로 등록된 form 관련 요소들의 key를 적어준다.  #6.8
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
// [ {text:"1번",id:1,category:"TO_DO"}, {text:"2번",id:2,category:"DOING"}, {text:"3번",id:3,category:"DONE"} ]

export const categoryState = atom({
  key: "category",
  default: Categories.TO_DO,
  // enum Categories의 TO_DO의 값을 사용  = "TO_DO"
});

export const toDoSelector = selector({
  // selector는 atom을 가져와서 get 메서드를 통해 output을 custom할 수 있다.  #6.16
  key: "toDoSelector",
  get: ({ get }) => {
    // get 메서드는 options parameter를 갖고 있으며, options 내부의 get함수를 사용하여 atom을 가져올 수 있다.  #6.16
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
    // Array.filter((item)=>조건식) = 조건식을 만족하는 배열의 요소들을 배열로 반환한다.
  },
});
