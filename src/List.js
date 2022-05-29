import React from "react";

const List = ({ list, removeItem, editItem }) => {
  return (
    <div>
      {list.map((item) => {
        const { id, title } = item;
        console.log(id);
        return (
          <article
            key={id}
            style={{
              display: "flex",
              marginTop: "1rem",
              justifyContent: "center",
            }}
          >
            <p>{title}</p>
            <div>
              <button type="button" onClick={() => editItem(id)}>
                edit
              </button>
              <button
                type="button"
                style={{ marginLeft: ".5rem", color: "red" }}
                onClick={() => removeItem(id)}
              >
                delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
