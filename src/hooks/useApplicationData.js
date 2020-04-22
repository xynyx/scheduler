import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

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
