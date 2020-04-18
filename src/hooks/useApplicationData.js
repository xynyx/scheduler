import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_INTERVIEW:
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  const dayNumber = id => {
    const day = Math.floor(id / 5);
    if (id % 5 === 0) {
      return day - 1;
    }
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

  // const updatedDaysWithSpots = (daysCopy, day, appointments) => {
  //   const specificDayCopy = {
  //     ...state.days[day],
  //     spots: remainingSpots(day, daysCopy, appointments),
  //   };
  //   const days = daysCopy.map((day, index) => {
  //     if (index === day) {
  //       return specificDayCopy;
  //     }
  //     return day;
  //   });
  //   return days;
  // };

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
      dispatch({ type: SET_INTERVIEW, payload: { appointments, days } });
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

    return Promise.resolve(axios.delete(`/api/appointments/${id}`, id)).then(
      () => {
        dispatch({ type: SET_INTERVIEW, payload: { appointments, days } });
      }
    );
  }

  useEffect(() => {
    const connection = new WebSocket("ws://localhost:8001")
    console.log(connection.readyState)
    connection.onopen = (event) => {
      console.log(connection.readyState)
    }
  }, [])

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ])
      .then(all => {
        dispatch({
          type: SET_APPLICATION_DATA,
          payload: {
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          },
        });
      })
      .catch(e => e.stack);
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
