import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  function dayNumber(id) {
    const day = Math.floor(id / 5);
    if (id % 5 === 0) {
      return day - 1;
    }
    return day;
  }

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
      case SET_INTERVIEW: {
        const dayNum = dayNumber(action.id);
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview,
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        const daysCopy = [...state.days];
        const specificDayCopy = {
          ...state.days[dayNum],
          spots: remainingSpots(dayNum, daysCopy, appointments),
        };

        const days = daysCopy.map((day, index) => {
          if (index === dayNum) {
            return specificDayCopy;
          }
          return day;
        });

        return {
          ...state,
          appointments,
          days,
        };
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  // CRASHES WHEN NO INTERVIEWER IS SELECTED....

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
    ).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  }

  function cancelInterview(id) {
    return Promise.resolve(axios.delete(`/api/appointments/${id}`, id)).then(
      () => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      }
    );
  }
  
  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onopen = () => {
      ws.onmessage = event => {
        const interviewData = JSON.parse(event.data);
        const { id, interview, type } = interviewData;
        if (type === SET_INTERVIEW) {
          dispatch({ type: SET_INTERVIEW, id, interview });
        }
      };
    };
    return () => ws.close();
  }, []);

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
