import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updatingItemText, setUpdatingItemText] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/item", {
        item: itemText,
      });
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/item/${id}`);
      const newList = listItems.filter((item) => item._id !== id);
      setListItems(newList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/items");
        setListItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);
  //update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/api/item/${isUpdating}`,
        { item: updatingItemText }
      );
      setUpdatingItemText("");
      setIsUpdating("");
      const updateIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updateItem = (listItems[updateIndex].item = updatingItemText);
    } catch (error) {
      console.log(error);
    }
  };

  //when update button clicked this func happen
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        type="text"
        className="update-new-item"
        placeholder="New Item"
        onChange={(e) => setUpdatingItemText(e.target.value)}
        value={updatingItemText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add Todo"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item, idx) => (
          <div key={idx} className="todo-item">
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
