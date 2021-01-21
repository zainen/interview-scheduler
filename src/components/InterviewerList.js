import React, { useState } from "react"
import InterviewerListItem from "components/InterviewerListItem.js"

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer)
  const list = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.onChange}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>)
}