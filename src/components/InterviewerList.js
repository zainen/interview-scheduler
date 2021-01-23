import React, { useState } from "react"
import InterviewerListItem from "components/InterviewerListItem.js"

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  console.log("interviewer list: ", props.interviewer)
  const list = props.interviewers.map(mappedInterviewer => {
    console.log('mapped: ', mappedInterviewer.id)
    return (
      <InterviewerListItem
      key={mappedInterviewer.id}
      id={mappedInterviewer.id}
      name={mappedInterviewer.name}
      avatar={mappedInterviewer.avatar}
      selected={mappedInterviewer.id === props.interviewer}
      onChange={props.setInterviewer}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>)
}