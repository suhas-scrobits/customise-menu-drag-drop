import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./App.css";
import MenuItem from "./components/MenuItem";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [menuArr, setMenuArr] = useState([
    {
      label: "name",
      value: "paneer masala",
      id: "1a4a",
    },
    { label: "description", value: "testy", id: "2a4a" },
    {
      label: "image",
      value:
        "https://www.whiskaffair.com/wp-content/uploads/2020/08/Dhaba-Style-Paneer-Masala-2-3.jpg",
      id: "3a4a",
    },
  ]);
  const [newMenu, setNewMenu] = useState("");
  const [menuCard, setMenuCard] = useState([
    { label: "chef", value: "suhas", id: "4a4a" },
  ]);

  function handleClick() {
    setMenuArr((prev) => [...prev]);
  }

  function handleDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add,
      active = menuArr,
      added = menuCard;

    if (source.droppableId === "menuItems") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = added[source.index];
      added.splice(source.index, 1);
    }

    if (destination.droppableId === "menuItems") {
      active.splice(destination.index, 0, add);
    } else {
      added.splice(destination.index, 0, add);
    }

    setMenuCard(added);
    setMenuArr(active);
  }

  function handleSave(id, newValue, setEdit) {
    setMenuCard((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, value: newValue };
        } else {
          return item;
        }
      });
    });
    setEdit(false);
  }

  const renderData = (menuCard) =>
    menuCard.map((item) => {
      switch (item.label) {
        case "name":
          return (
            <div key={item.id}>
              <p className="text-green-500 text-center fond-bold text-3xl">
                {item.value}
              </p>
            </div>
          );
        case "description":
          return (
            <div key={item.id}>
              <p className="text-center fond-bold text-3xl">{item.value}</p>
            </div>
          );
        case "image":
          return (
            <div key={item.id}>
              <img src={item.value} alt={item.label} />
            </div>
          );
        case "chef":
          return (
            <div key={item.id}>
              <p className="text-center fond-bold text-3xl">{item.value}</p>
            </div>
          );
        default:
          return null;
      }
    });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="text-center ">
        <button
          onClick={handleClick}
          className="bg-gray-700 px-4 py-2 my-2 rounded text-white"
        >
          save
        </button>

        <div className="flex border border-solid border-black">
          <Droppable droppableId="menuItems">
            {(provided, snapshot) => (
              <div
                className={`w-1/3 border-r border-solid border-black ${
                  snapshot.isDraggingOver ? "bg-blue-100" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {menuArr?.map((menu, i) => (
                  <MenuItem
                    menu={menu}
                    key={menu.id}
                    index={i}
                    save={handleSave}
                    editItem={false}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="menuCardItems">
            {(provided, snapshot) => (
              <div
                className={`w-1/3  ${
                  snapshot.isDraggingOver ? "bg-red-100" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {menuCard.map((menuItem, i) => (
                  <MenuItem
                    menu={menuItem}
                    key={menuItem.id}
                    index={i}
                    save={handleSave}
                    editItem={true}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="w-1/3 border-l border-solid border-black">
            {renderData(menuCard)}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
