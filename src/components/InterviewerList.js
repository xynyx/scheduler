import React from "react";
import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  console.log(props)
  const { interviewers, onChange } = props;

  const interviewerList = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={(event) => onChange(interviewer.id)}
        selected={interviewer.id === props.value}
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
