import { atom } from "recoil";

// recoil에 변수(atom)을 설정하는 방법  #6.2
export const isDarkAtom = atom({ key: "isDark", default: false });
