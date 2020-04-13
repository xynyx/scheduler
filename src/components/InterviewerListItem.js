import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  const imageClass = classNames("interviewers__item-image");

  return (
    <li onClick={() => setInterviewer(name)} className={interviewerClass}>
      <img className={imageClass} src={avatar} alt={name} />
      {selected ? name : null}
    </li>
  );
}
