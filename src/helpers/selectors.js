export function getAppointmentsForDay(state, day) {
  const getSpecificDay = state.days.filter(
    (specificDay) => specificDay.name === day
  );
  if (getSpecificDay.length === 0) {
    return [];
  }
  const appointmentsForDay = getSpecificDay[0].appointments;
  const appointmentList = appointmentsForDay.map((appt) => {
    for (const appointment in state.appointments) {
      if (appt === Number(appointment)) {
        return state.appointments[appointment];
      }
    }
  });
  return appointmentList;
}
