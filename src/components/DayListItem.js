import React from "react";
import "components/DayListItem.scss";
const classNames = require("classnames");

export default function DayListItems(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining.</h3>
    </li>
  );
}
