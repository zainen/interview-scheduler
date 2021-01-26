import React, { useState } from 'react'

import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form (props) {
  const [error, setError] = useState("")
  const [name, setName] = useState(props.name || '')
  const [interviewer, setInterviewer] = useState(props.interview && props.interview.interviewer ? props.interview.interviewer : null)
  const reset = () => {
    setName('')
    setInterviewer(null)
  }
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError('')
    props.onSave(name, interviewer);
  }
  const cancel = () => {
    // setError('')
    reset()
    props.onCancel()
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer}
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel}>Cancel</Button>
          <Button onClick={() => validate(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}