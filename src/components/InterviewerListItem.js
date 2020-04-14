import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, onChange } = props;
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  const imageClass = classNames("interviewers__item-image");

  return (
    <li onClick={onChange} className={interviewerClass}>
      <img className={imageClass} src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
