import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const {
    id,
    time,
    interview,
    onEdit,
    onDelete,
    onSave,
    interviewers,
    bookInterview,
  } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    return bookInterview(id, interview);
  }

  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && (
          <Form
            // name={""}
            interviewers={interviewers}
            // interviewer={[]}
            onSave={save}
            onCancel={() => back()}
          />
        )}
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
