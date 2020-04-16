import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  console.log(props.interview)
  const { time, interview, onEdit, onDelete, onSave } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form name={""}interviewers={[]} interviewer={[]} onSave={onSave} onCancel={() => back()} />}
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
