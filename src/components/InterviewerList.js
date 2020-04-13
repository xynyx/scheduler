import React from "react";
import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const interviewerList = interviewers.map((person) => {
    return (
      <InterviewerListItem
        key={interviewer}
        name={person.name}
        avatar={person.avatar}
        setInterviewer={setInterviewer}
        selected={person.id === interviewer}
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
