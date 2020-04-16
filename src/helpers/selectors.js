export function getAppointmentsForDay(state, day) {
  const getSpecificDay = state.days.filter(
    specificDay => specificDay.name === day
  );
  if (getSpecificDay.length === 0) {
    return [];
  }
  const appointmentsForDay = [];
  const appointmentList = getSpecificDay[0].appointments;
  appointmentList.forEach(appt => {
    for (const appointment in state.appointments) {
      if (appt === Number(appointment)) {
        appointmentsForDay.push(state.appointments[appointment]);
      }
    }
  });
  return appointmentsForDay;
}

// Return new object containing interview data if object contains interviewer
// Return null if there is no interview data
export function getInterview(state, interview) {
  if (!interview) return null;
  const { interviewer } = interview;
  const interviewerData = state.interviewers[interviewer];
  const interviewWithInterviewerInfo = {
    student: interview.student,
    interviewer: interviewerData,
  };
  return interviewWithInterviewerInfo;
}
