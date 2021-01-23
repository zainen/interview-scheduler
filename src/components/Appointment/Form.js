import React, { useState } from 'react'

import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form (props) {
  const [name, setName] = useState(props.interview && props.interview.student ? props.interview.student : "")
  const [interviewer, setInterviewer] = useState(props.interview && props.interview.interviewer ? props.interview.interviewer : null)
  
  const reset = () => {
    setName('')
    setInterviewer(null)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name='name'
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => {
              setName(event.target.value);
            }}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer}
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}