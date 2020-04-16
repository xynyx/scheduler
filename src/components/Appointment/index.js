import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { time, interview, onAdd, onEdit, onDelete } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer.name}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </article>
    </>
  );
}

/* We can use import Appointment from "components/Appointment"; to import a component from the src/components/Appoinment/index.js module. It is an alternative to import Appointment from "components/Appointment/Appointment";. */
