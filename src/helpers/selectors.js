export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = state.days.filter(
    (specificDay) => specificDay.name === day
  );
  if (appointmentsForDay.length === 0) {
    return appointmentsForDay;
  }
  const specificAppointments = appointmentsForDay[0].appointments.map(
    (appt) => {
      for (const appointment in state.appointments) {
        if (appt === Number(appointment)) {
          return state.appointments[appointment];
        }
      }
    }
  );
  return specificAppointments;
}
