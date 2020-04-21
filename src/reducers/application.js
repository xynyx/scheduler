export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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
