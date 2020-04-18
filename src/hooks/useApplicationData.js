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
    const day = Math.floor(id / 5);
    if (day === 5) return 4;
    return day;
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

  const updatedDaysWithSpots = (daysCopy, day, appointments) => {
    const specificDayCopy = {
      ...state.days[day],
      spots: remainingSpots(day, daysCopy, appointments),
    };
    const days = daysCopy.map((day, index) => {
      if (index === day) {
        return specificDayCopy;
      }
      return day;
    });
    return days;
  };

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

    const daysCopy = [...state.days];
    const specificDayCopy = {
      ...state.days[dayNumber(id)],
      spots: remainingSpots(dayNumber(id), daysCopy, appointments),
    };
    const days = daysCopy.map((day, index) => {
      if (index === dayNumber(id)) {
        return specificDayCopy;
      }
      return day;
    });

    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
    ).then(() => {
      setState({ ...state, appointments, days });
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

    const daysCopy = [...state.days];
    const specificDayCopy = {
      ...state.days[dayNumber(id)],
      spots: remainingSpots(dayNumber(id), daysCopy, appointments),
    };
    const days = daysCopy.map((day, index) => {
      if (index === dayNumber(id)) {
        return specificDayCopy;
      }
      return day;
    });

    // const days = updatedDaysWithSpots(daysCopy, dayNumber(id), appointments);
    // console.log(days);

    return Promise.resolve(axios.delete(`/api/appointments/${id}`, id)).then(
      () => {
        setState({ ...state, appointments, days });
      }
    );
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
