
const getAppointmentsForDay = (state, day) => {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day)
  if (!filteredAppointments.length) {
    return filteredAppointments
  }
  return filteredAppointments[0].appointments.map(item => state.appointments[item])
}


const getInterviewersForDay = (state, day) => {
  for (let key in state.days) {
    const obj = state.days[key]
    if (obj.name === day) {
      const list = obj.interviewers.map(id => {
        return state.interviewers[id]
      })
      return list
    }
  }
}

export { getAppointmentsForDay, getInterviewersForDay }