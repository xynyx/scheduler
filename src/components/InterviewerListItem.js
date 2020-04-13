/* <li className="interviewers__item">
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  Sylvia Palmer
</li> */

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
