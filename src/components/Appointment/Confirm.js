import React from 'react'

import Button from "../Button"

export default function (props) {
  const {onCancel, onConfirm} = props
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button onClick={onCancel} danger>Cancel</Button>
        <Button onClick={onConfirm} alt='danger-confirm' danger>Confirm</Button>
      </section>
    </main>
  )
}