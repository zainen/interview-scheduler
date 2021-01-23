import React from 'react';

import "components/Appointment/styles.scss"

import Header from "components/Appointment/header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'
const EDIT = 'EDIT'
const CONFIRM = 'CONFIRM'
const SAVING = 'SAVING'
const DELETING = 'DELETING'

export default function Appointment(props) {
  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  // console.log("as we click around", props)
  // console.log('index', props)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("name: ", name, "interviewer: ", interviewer)
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  const cancel = () => {
    transition(EMPTY);
  }
  const edit = () => {
    transition(EDIT)
  }
  const statusDelete = (id) => {
    transition(DELETING)
    props.onDelete(id)
    .then(() => transition(EMPTY))
  }
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && (
      <Empty onAdd={() => transition(CREATE)}/>
      )}
      {mode === SHOW && (
      <Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}
        onEdit={edit}
        onDelete={() => transition(CONFIRM)}
        />)}
      {mode === CREATE && (
      <Form 
        id={props.id}
        interview={props.interview}
        interviewers={props.dayInterviewers}
        onSave={save}
        onCancel={back}
      />
      )}
      {mode === CONFIRM && (
        <Confirm 
        onConfirm={() => statusDelete(props.id)}
        onCancel={back}/>
      )}
      {mode === SAVING && (
        <Status message={SAVING}/>
      )}
      {mode === EDIT && (
        <Form 
        id={props.id}
        interview={props.interview}
        interviewers={props.dayInterviewers}
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === DELETING && (
        <Status message={DELETING} />
      )}
    </article>
  )
}