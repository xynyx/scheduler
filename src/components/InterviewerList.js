import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default function InterviewerList(props) {
  const { interviewers, onChange } = props;

  const interviewerList = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={event => onChange(interviewer.id)}
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
