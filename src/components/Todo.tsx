import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todoItems, setTodoItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoItems))
  })

  const handleClick = () => {
    setTodoItems((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  const handleDelete = (index: number)  => {
      setTodoItems((prev) => prev.filter((_, i) => i !== index))
  };

  return (
    <div className="flex  justify-center items-center min-h-screen">
      <div className="bg-[#B6CEB4] p-10 shadow-lg rounded-lg text-center min-h-[500px]">
        <h2 className="font-extrabold text-2xl tracking-wider">Task Planner</h2>
        <div>
          <input
            type="text"
            className="border-none outline-none bg-[#D9E9CF] mt-5 py-2 rounded-2xl px-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-red-500 outline-none px-4 py-2 rounded-2xl ml-5"
            onClick={handleClick}
          >
            Add
          </button>
        </div>

        <div className="mt-4">
          {todoItems.map((item, index) => (
            <ul
              className="flex flex-col gap-3 mt-4 w-full max-w-md mx-auto"
              key={index}
            >
              <li className="flex items-center justify-between bg-white shadow-md px-4 py-3 rounded-lg hover:shadow-lg transition">
                <div className="flex items-center gap-3 text-gray-800">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer"
                  />
                  <span className={`text-lg font-medium `}>{item}</span>
                </div>

          
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Todo;
