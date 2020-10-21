import { useContext } from "react";
import { TodosContext } from "../contexts/todos-context";

export default function Todo({ todo }) {
  const { updateTodo, deleteTodo } = useContext(TodosContext);
  const handleToggleCompleted = async () => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };

  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        name="completed"
        type="checkbox"
        checked={todo.fields.completed}
        onChange={handleToggleCompleted}
        className="mr-2 form-checkbox h-5 w-5"
      />
      <span
        className={`flex-1 text-gray-800 ${
          todo.fields.completed ? "line-through" : ""
        }`}
      >
        {todo.fields.description}
      </span>
      <button
        type="button"
        className="rounded-full h-16 w-16 hover:bg-indigo-400 focus:outline-none flex items-center justify-center"
        onClick={() => deleteTodo(todo.id)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => deleteTodo(todo.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </li>
  );
}
