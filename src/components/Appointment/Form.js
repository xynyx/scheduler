import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel } = props;

  function reset() {
    setName("");
    document.getElementsByTagName('input')[0].value = "";
    return setInterviewer(null);
  }

  function cancel() {
    reset();
    return onCancel;
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>
            Cancel
          </Button>
          <Button onClick={() => onSave(name, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
