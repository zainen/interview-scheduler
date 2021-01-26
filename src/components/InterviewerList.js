import React, { useState } from "react"
import InterviewerListItem from "components/InterviewerListItem.js"
import PropTypes from 'prop-types'

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const list = props.interviewers.map(mappedInterviewer => {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};