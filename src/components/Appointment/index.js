import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
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
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteAppt() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && (
          <Form
            interviewers={interviewers}
            onSave={save}
            onCancel={() => back()}
          />
        )}
        {mode === EDIT && (
          <Form
            name={interview.student}
            interviewers={interviewers}
            interviewer={interview.interviewer.id}
            onSave={save}
            onCancel={() => back()}
          />
        )}
        {mode === SHOW && interview && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer.name}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === ERROR_SAVE && (
          <Error onClose={() => back()} message="Could not save appointment" />
        )}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === ERROR_DELETE && (
          <Error
            onClose={() => back()}
            message="Could not delete appointment"
          />
        )}
        {mode === CONFIRM && (
          <Confirm onConfirm={deleteAppt} onCancel={() => transition(SHOW)} />
        )}
      </article>
    </>
  );
}
