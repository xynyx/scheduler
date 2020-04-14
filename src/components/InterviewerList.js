import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, onChange } = props;

  const interviewerList = interviewers.map((value) => {
    return (
      <InterviewerListItem
        key={value.id}
        name={value.name}
        avatar={value.avatar}
        onChange={(event) => onChange(value.id)}
        selected={value.id === props.value}
      />
    );
  });
  return (
    <>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{interviewerList}</ul>
      </section>
    </>
  );
}
