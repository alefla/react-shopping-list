import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", style: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("hello");
    if (!item) {
      showAlert(true, "Please enter the item", "red");
    } else if (item && isEditing) {
      setList(
        list.map((x) => {
          if (x.id === editID) {
            return { ...x, title: item };
          }
          return x;
        })
      );
      setItem("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success edit, value is change", "green");
    } else {
      showAlert(true, "new item is added", "green");
      const newItem = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItem]);
      setItem("");
    }
  };

  const showAlert = (show = false, msg = "", style = "") => {
    setAlert({ show, msg, style });
  };
  const clearList = () => {
    //ideally add yes or not btns in alert and without settimeout
    showAlert(true, "List is empty", "red");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "You are deleting an item", "red");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setItem(specificItem.title); //to show on input box the current value
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit}>
        <h1>Shopping List</h1>
        <p>React CRUD with Local Storage(not focus on UI/styling)</p>
        <div className="alert-container">
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="name of the item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="button-lg" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="list-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />

          <button className="clear-btn button-lg" onClick={clearList}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
// <button className="clear-btn button-lg" onClick={() => setList([]) without create function
