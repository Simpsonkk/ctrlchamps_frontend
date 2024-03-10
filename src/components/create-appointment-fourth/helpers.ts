import { CaregiverFilterState } from 'src/components/create-appointment-fourth/types';
import { APPOINTMENT_TYPE } from 'src/constants';
import { AppointmentI } from 'src/redux/slices/appointmentSlice';

export const getCaregiverFilterInitialState = (
  appointment: AppointmentI
): CaregiverFilterState => ({
  isOpenToSeekerHomeLiving: true,
  isShowAvailableCaregivers: true,
  location: {
    address: '',
    city: '',
    country: '',
    state: '',
    utcOffset: 0,
    zipCode: '',
    latLng: '',
  },
  services: [
    { label: 'personalCare', checked: false },
    { label: 'medicationManagement', checked: false },
    { label: 'mobilitySupport', checked: false },
    { label: 'mealPreparation', checked: false },
    { label: 'housekeeping', checked: false },
    { label: 'socialActivities', checked: false },
  ],
  startDate:
    appointment.appointmentType === APPOINTMENT_TYPE.Recurring
      ? (appointment.recurringDate.startDate as Date)
      : (appointment.oneTimeDate.startTime as Date),
  endDate:
    appointment.appointmentType === APPOINTMENT_TYPE.Recurring
      ? (appointment.recurringDate.endDate as Date)
      : (appointment.oneTimeDate.endTime as Date),
  weekdays:
    appointment.appointmentType === APPOINTMENT_TYPE.Recurring
      ? appointment.recurringDate.weekDays
      : null,
  ratings: [
    { label: '1', checked: false },
    { label: '2', checked: false },
    { label: '3', checked: false },
    { label: '4', checked: false },
    { label: '5', checked: false },
  ],
});

export const serializeCaregiverFilterStateToQueryString = (
  filterState: CaregiverFilterState,
  translate: (translate: string) => string
): URLSearchParams => {
  const services = filterState.services
    .filter((service) => service.checked)
    .map((service) => translate(translate(`createAppointmentFourth.services.${service.label}`)));
  const { weekdays } = filterState;

  const ratings = filterState.ratings
    .filter((rating) => rating.checked)
    .map((rating) => rating.label);

  const dataToSerialize = {
    isOpenToSeekerHomeLiving: filterState.isOpenToSeekerHomeLiving,
    isShowAvailableCaregivers: filterState.isShowAvailableCaregivers,
    ...filterState.location,
    utcOffset: filterState.location.utcOffset.toString(),
    startDate: filterState.startDate.toISOString(),
    endDate: filterState.endDate.toISOString(),
  };

  const searchParams = Object.entries(dataToSerialize).reduce((params, [key, value]) => {
    params.append(key, value as string);

    return params;
  }, new URLSearchParams());
  services.forEach((item) => searchParams.append('services', item));
  ratings.forEach((item) => searchParams.append('ratings', item));
  if (weekdays) {
    weekdays.forEach((item) => searchParams.append('weekdays', item));
  }

  return searchParams;
};
