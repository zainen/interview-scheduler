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
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'

export default function Appointment(props) {
  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  const cancel = () => {
    transition(EMPTY);
  }
  const edit = () => {
    transition(EDIT)
  }
  const statusDelete = (id) => {
    transition(DELETING, true)
    props.onDelete(id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  }

  const interviewer = props.interview ? props.interviewers[props.interview.interviewer] : null
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && (
      <Empty onAdd={() => transition(CREATE)}/>
      )}
      {mode === SHOW && (
      <Show 
        student={props.interview.student} 
        interviewer={interviewer}
        onEdit={edit}
        onDelete={() => transition(CONFIRM)}
        />)}
      {mode === CREATE && (
      <Form 
        id={props.id}
        interview={props.interview}
        interviewers={props.dayInterviewers}
        onSave={save}
        onCancel={cancel}
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
        name={props.interview.student}
        interview={props.interview}
        interviewers={props.dayInterviewers}
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === DELETING && (
        <Status message={DELETING} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={ERROR_SAVE} onClose={() => transition(SHOW, true)} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={ERROR_DELETE} onClose={() => transition(SHOW, true)} />
      )}
    </article>
  )
}