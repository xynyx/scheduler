import React from "react";

const Empty = (props) => {
  const { onAdd } = props;
  return (
    <main className="appointment__add">
      <img
        onClick={onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
};

export default Empty;
