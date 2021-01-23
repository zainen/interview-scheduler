
const getAppointmentsForDay = (state, day) => {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day)
  if (!filteredAppointments.length) {
    return filteredAppointments
  }
  return filteredAppointments[0].appointments.map(item => state.appointments[item])
}


const getInterviewer = (state, interview) => {
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

// const getInterviewersForDay = (state, day) => {
//   return state.days.forEach(dayEntry => {
//     if (dayEntry.name === day) {
//       return dayEntry.interviewers.map(interviewerID => {
//         return state.interviewers[interviewerID]
//       })
//     }
//   })
// }

// console.log(getInterviewersForDay(state, 'Monday'))


export { getAppointmentsForDay, getInterviewer, getInterviewersForDay }