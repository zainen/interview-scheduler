import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApplicationData() {

  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // 
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day});
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {  
      const [days, appointments, interviewers] = all;
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    });
  }, [])
  
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
      axios.get("/api/days")
      .then(days => {
        return setState(prev => ({...prev, days: days.data}))
      })
    })
  }
  const deleteAppointment = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    
    .then(() => {
      console.log(state.appointments[id].interview)
      setState(prev => ({...prev, appointments}))
      axios.get("/api/days")
      .then(days => {
        return setState(prev => ({...prev, days: days.data}))
      })
    })
  }

  // ~~~~~~~~~~~~~ to change to remove axios get after save and delete ~~~~~~~~~~~~~~
  // const spotsRemaining = (state) => { 
  //   return state.days.map(day => {
  //     const availableSpots = day.appointments.filter(id => (!state.appointments[id].interview)).length
  //     return day.availableSpots = availableSpots
  //   })
  //   // return setState(prev => ({...prev}))
  // }
  
  return { state, setState, setDay, bookInterview, deleteAppointment }
}




// ~~~~~~~~ the way to do it in direct return ~~~~~~~~~
// {...prev, 'appointments': {
//   ...prev.appointments,
//   [id]: {
//     ...prev.appointments[id],
//     'interview': null
//   }
// }}
