import React, { useState } from "react";

export default function ToDoList() {
  const [toDo, setToDo] = useState("");

  function onChange(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  }
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(toDo);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} placeholder="오늘의 할 일은?" />
        <button>등록</button>
      </form>
    </div>
  );
}
