import React from 'react';
import "components/Appointment/styles.scss"

export default function Appointment(props) {
  const {time} = props;
  return (
    <article time={time} className="appointment"></article>
  )
}