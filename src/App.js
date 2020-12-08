import React, { useReducer, useState } from "react";

// update state
// Difference between useState vs. useReducer
// useReducer allows for complex operations
function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
        todoCount: state.todoCount + 1
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed } : t
        ),
        todoCount: state.todoCount
      };
    default:
      return state;
  }
}

const App = () => {
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, {
    todos: [],
    todoCount: 0,
  });
  const [text, setText] = useState();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "add-todo", text: text });
          setText("");
        }}
      >
        <input
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <div>Number of ToDos: {todoCount}</div>
      {todos.map((t, idx) => (
        <div
          key={t.text}
          onClick={() => dispatch({ type: "toggle-todo", idx: idx })}
          style={{
            textDecoration: t.completed ? "line-through" : "",
          }}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
};

export default App;
