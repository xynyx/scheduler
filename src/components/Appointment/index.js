import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  const { time, interview } = props;
  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {interview ? (
          <Show student={interview.student} interviewer={interview.interviewer.name} />
        ) : (
          <Empty />
        )}
      </article>
    </>
  );
}

/* We can use import Appointment from "components/Appointment"; to import a component from the src/components/Appoinment/index.js module. It is an alternative to import Appointment from "components/Appointment/Appointment";. */
