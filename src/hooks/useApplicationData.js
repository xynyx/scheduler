import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  const dayNumber = id => {
    return Math.floor(id / 5);
  };

  function remainingSpots(day, dayCopy, appointments) {
    const appointmentIDArray = dayCopy[day].appointments;

    let numberOfSpotsLeft = 0;
    appointmentIDArray.forEach(appointment => {
      if (appointments[appointment].interview === null) {
        numberOfSpotsLeft++;
      }
    });
    return numberOfSpotsLeft;
  }

  // CRASHES WHEN NO INTERVIEWER IS SELECTED....

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const specificDayCopy = {
      ...state.days[dayNumber(id)],
      spots: state.days[dayNumber(id)].spots - 1,
    };

    const dayCopy = {
      ...state.days,
      [dayNumber(id)]: specificDayCopy,
    };

    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
    ).then(() => {
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const specificDayCopy = {
      ...state.days[dayNumber(id)],
      spots: state.days[dayNumber(id)].spots + 1,
    };
    // console.log(dayNumber(id))
    //     console.log(appointments)

    const dayCopy = {
      ...state.days,
      [dayNumber(id)]: specificDayCopy,
    };

    console.log(remainingSpots(dayNumber(id), dayCopy, appointments));

    // console.log(appointments)
    //     console.log("DAYS", state.days)
    //     console.log("COPY", dayCopy)
    // APPOINTMENT ARRAY (1 - 5)
    // console.log("COPY", dayCopy[dayNumber(id)].appointments)

    return Promise.resolve(
      axios.delete(`/api/appointments/${id}`, id)
    ).then(() => setState({ ...state, appointments }));
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch(e => e.stack);
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
