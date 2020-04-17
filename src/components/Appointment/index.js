import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
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
    cancelInterview,
  } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };

    bookInterview(id, interview, () => transition(SHOW));
  }

  function deleteAppt() {
    transition(DELETING);
    cancelInterview(id, () => transition(EMPTY));
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
            onDelete={deleteAppt}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
      </article>
    </>
  );
}
