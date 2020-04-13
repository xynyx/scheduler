import React from "react";

export default function DayListItems(props) {
  const { name, spots, selected, setDay } = props;
  return (
    /*  selected={selected} */
    <li onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining.</h3>
    </li>
  );
}
