import React from "react";
import Button from "components/Button";
import classNames from "classnames";

const Confirm = (props) => {
  const { onConfirm, onCancel } = props;

  // Useful or necessary?
  const appointmentClass = classNames({
    "appointment__card appointment__card--confirm": <main></main>,
  });
  return (
    <main className={appointmentClass}>
      <h1 className="text--semi-bold">Are you sure you want to delete?</h1>
      <section className="appointment__actions">
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
        <Button onClick={onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
};

export default Confirm;
