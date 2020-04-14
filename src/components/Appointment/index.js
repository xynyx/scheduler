import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { time } = props;
  return <article time={time} className="appointment"></article>;
}


/* We can use import Appointment from "components/Appointment"; to import a component from the src/components/Appoinment/index.js module. It is an alternative to import Appointment from "components/Appointment/Appointment";. */