
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

const state = {
  day: 'Monday',
  days: [
    {"id":1,"name":"Monday","appointments":[1,2,3,4,5],"interviewers":[2,5,7,9,10],"spots":2},
    {"id":2,"name":"Tuesday","appointments":[6,7,8,9,10],"interviewers":[1,3,7,8,10],"spots":2},
    {"id":3,"name":"Wednesday","appointments":[11,12,13,14,15],"interviewers":[1,7,8,9,10],"spots":4},
    {"id":4,"name":"Thursday","appointments":[16,17,18,19,20],"interviewers":[2,3,5,6,10],"spots":4},
    {"id":5,"name":"Friday","appointments":[21,22,23,24,25],"interviewers":[2,4,8,9,10],"spots":3}
  ],
  appointments: {
    "1":{"id":1,"time":"12pm","interview":null},
    "2":{"id":2,"time":"1pm","interview":null},
    "3":{"id":3,"time":"2pm","interview":{"student":"Archie Cohen","interviewer":3}},
    "4":{"id":4,"time":"3pm","interview":{"student":"Chad Takahashi","interviewer":9}},
    "5":{"id":5,"time":"4pm","interview":{"student":"Jamal Jordan","interviewer":9}},
    "6":{"id":6,"time":"12pm","interview":null},
    "7":{"id":7,"time":"1pm","interview":null},
    "8":{"id":8,"time":"2pm","interview":{"student":"Leopold Silvers","interviewer":9}},
    "9":{"id":9,"time":"3pm","interview":{"student":"Liam Martinez","interviewer":2}},
    "10":{"id":10,"time":"4pm","interview":{"student":"Lydia Miller-Jones","interviewer":2}},
    "11":{"id":11,"time":"12pm","interview":null},
    "12":{"id":12,"time":"1pm","interview":null},
    "13":{"id":13,"time":"2pm","interview":null},
    "14":{"id":14,"time":"3pm","interview":null},
    "15":{"id":15,"time":"4pm","interview":{"student":"Maria Boucher","interviewer":5}},
    "16":{"id":16,"time":"12pm","interview":null},
    "17":{"id":17,"time":"1pm","interview":null},
    "18":{"id":18,"time":"2pm","interview":null},
    "19":{"id":19,"time":"3pm","interview":{"student":"Michael Chan-Montoya","interviewer":10}},
    "20":{"id":20,"time":"4pm","interview":null},
    "21":{"id":21,"time":"12pm","interview":null},
    "22":{"id":22,"time":"1pm","interview":{"student":"Richard Wong","interviewer":7}},
    "23":{"id":23,"time":"2pm","interview":null},
    "24":{"id":24,"time":"3pm","interview":{"student":"Yuko Smith","interviewer":7}},
    "25":{"id":25,"time":"4pm","interview":null}
},
  
  interviewers: {
    1: {id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"},
    2: {id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"},
    3: {id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png"},
    4: {id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg"},
    5: {id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg"},
    6: {id: 6, name: "Susan Reynolds", avatar: "https://i.imgur.com/TdOAdde.jpg"},
    7: {id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg"},
    8: {id: 8, name: "Viktor Jain", avatar: "https://i.imgur.com/iHq8K8Z.jpg"},
    9: {id: 9, name: "Lindsay Chu", avatar: "https://i.imgur.com/nPywAp1.jpg"},
    10: {id: 10, name: "Samantha Stanic", avatar: "https://i.imgur.com/okB9WKC.jpg"}
  }
};

// const state = {
//   days: {
//     1: {
//       id: 1, 
//       name: 'Monday',
//       appointments: [1,2,3,4,5],
//       interviewers: [2,3,4,6,10]
//     },
//     2: {
//       id: 2, 
//       name: 'Tuesday',
//       appoinments: [6,7,8,9,10],
//       interviewers: [4,5,7,9,10]
//     }
//   },
//   interviewers: {
//     1: {id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"},
//     2: {id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"},
//     3: {id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png"},
//     4: {id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg"},
//     5: {id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg"},
//     6: {id: 6, name: "Susan Reynolds", avatar: "https://i.imgur.com/TdOAdde.jpg"},
//     7: {id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg"},
//     8: {id: 8, name: "Viktor Jain", avatar: "https://i.imgur.com/iHq8K8Z.jpg"},
//     9: {id: 9, name: "Lindsay Chu", avatar: "https://i.imgur.com/nPywAp1.jpg"},
//     10: {id: 10, name: "Samantha Stanic", avatar: "https://i.imgur.com/okB9WKC.jpg"}
//   }
// }

test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(5);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments['6']);
  expect(second).toEqual(state.appointments['7']);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Saturday");
  expect(result.length).toEqual(0);
});



// test("getInterview returns an object with the interviewer data", () => {
//   const result = getInterview(state, state.appointments["5"].interview);
//   expect(result).toEqual(
//     expect.objectContaining({
//       interviewer: expect.objectContaining({
//         id: expect.any(Number),
//         name: expect.any(String),
//         avatar: expect.any(String)
//       })
//     })
//   );
// });

// test("getInterview returns null if no interview is booked", () => {
//   const result = getInterview(state, state.appointments["2"].interview);
//   expect(result).toBeNull();
// });
