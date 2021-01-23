
const getAppointmentsForDay = (state, day) => {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day)
  if (!filteredAppointments.length) {
    return filteredAppointments
  }
  return filteredAppointments[0].appointments.map(item => state.appointments[item])
}


const getInterview = (state, interview) => {
  if (!interview) return null
  const id = interview.interviewer
  const session = state.interviewers[id]
  interview.interviewer = session
  return interview
}



const getInterviewersForDay = (state, day) => {
  for (let key in state.days) {
    const obj = state.days[key]
    if (obj.name === day) {
      console.log(obj.interviewers)
      const list = obj.interviewers.map(id => {
        return state.interviewers[id]
      })
      return list
    }
  }
}


// console.log(getInterviewersForDay(state, 'Monday'))


export { getAppointmentsForDay, getInterview, getInterviewersForDay }