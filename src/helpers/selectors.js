export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = state.days.filter((specificDay) => {
    specificDay.name === day;
  })
}

/*   function selectUserByName(state, name) {
    const filteredNames = state.users.filter((user) => user.name === name);
    return filteredNames;
  } */
