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

  function bookInterview(id, interview, showMode, errorMode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments });
        showMode();
      })
      .catch(() => errorMode());
  }

  function cancelInterview(id, showMode, errorMode) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .delete(`/api/appointments/${id}`, id)
      .then(() => {
        setState({ ...state, appointments });
        showMode();
      })
      .catch(() => errorMode());
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
