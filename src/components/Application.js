import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";

import DayList from "./DayList"
import Appointment from "components/Appointment/index"
import { useVisualMode } from "../hooks/useVisualMode"


import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Jeff",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Max",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Mark",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   }
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // 
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${appointment.id}`, appointment)
      .then(()=> {
        setState(prev => ({...prev, appointments}));
      })
  }
  const deleteAppointment = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState(prev => ({...prev}))
    })
  }

  const dayInterviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={state.interviewers}
        dayInterviewers={dayInterviewers}
        bookInterview={bookInterview}
        onDelete={deleteAppointment}
      />
    )
  })
  const setDay = day => setState({...state, day})
  useEffect(() => {
    Promise.all([
      axios.get("/api/days/"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {  
      const [days, appointments, interviewers] = all;
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    });
  }, [])
  // console.log(`outside: ` ,state)
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key={'last'} time={'5pm'} />
      </section>

    </main>
  );
}
