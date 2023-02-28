import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

function MenuItem({ menu, index, save, editItem }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(menu.value);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <Draggable draggableId={menu.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`bg-yellow-400 w-full mb-4 p-2 rounded-full ${
            snapshot.isDragging ? "shadow-2xl" : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <span>
              <label htmlFor="">{menu.label}</label>
              <input value={value} onChange={handleChange} />{" "}
              <span onClick={() => save(menu.id, value, setEdit)}>save</span>
            </span>
          ) : (
            <span>
              {editItem ? (
                <span>
                  {value} <span onClick={() => setEdit(true)}>edit</span>
                </span>
              ) : (
                <span>
                  {menu.label}
                  {menu.html && menu.html}
                </span>
              )}
            </span>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default MenuItem;
