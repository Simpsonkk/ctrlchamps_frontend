import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SignatureIcon from 'src/assets/icons/SignatureIcon';
import { PRIMARY, SECONDARY, TEXT_COLOR } from 'src/theme/colors';

enum IconColor {
  main = 'main',
  navy = 'navy',
  red = 'red',
  yellow = 'yellow',
}

const firstItemIndex = 1;

const colorMap = {
  main: PRIMARY.main,
  navy: PRIMARY.navy,
  red: SECONDARY.error,
  yellow: TEXT_COLOR.pending,
};

const ICON_TYPE = {
  sign: { icon: SignatureIcon, color: IconColor.main },
  signOff: { icon: SignatureIcon, color: IconColor.red },
  acceptVA: { icon: ContactEmergencyIcon, color: IconColor.navy },
  acceptAppointment: { icon: HowToRegIcon, color: IconColor.main },
  rejectVA: { icon: ContactEmergencyIcon, color: IconColor.red },
  rejectAppointment: { icon: PersonRemoveIcon, color: IconColor.red },
  pausedAppointment: { icon: PersonRemoveIcon, color: IconColor.yellow },
};

const NOTIFICATION_STATUS = {
  REQUESTED_APPOINTMENT: {
    text: 'notifications.requestedAppointment',
    icon: ICON_TYPE.acceptAppointment,
  },
  REJECTED_APPOINTMENT: {
    text: 'notifications.rejectedAppointment',
    icon: ICON_TYPE.rejectAppointment,
  },
  REQUEST_ACCEPTED: {
    text: 'notifications.requestAccepted',
    icon: ICON_TYPE.acceptAppointment,
  },
  REQUEST_REJECTED: {
    text: 'notifications.requestRejected',
    icon: ICON_TYPE.rejectAppointment,
  },
  ACCEPTED_VA: {
    text: 'notifications.acceptedVA',
    icon: ICON_TYPE.acceptVA,
  },
  REJECTED_VA: {
    text: 'notifications.rejectedVA',
    icon: ICON_TYPE.rejectVA,
  },
  RESCHEDULE_VA: {
    text: 'notifications.rescheduleVA',
    icon: ICON_TYPE.acceptVA,
  },
  REQUESTED_VA: {
    text: 'notifications.requestedVA',
    icon: ICON_TYPE.acceptAppointment,
  },
  FIVE_MIN_BEFORE_VA: {
    text: 'notifications.fiveMinBeforeVA',
    icon: ICON_TYPE.acceptAppointment,
  },
  SIGN_OFF: {
    text: 'notifications.signOff',
    icon: ICON_TYPE.sign,
  },
  ACTIVITY_LOG_REQUEST: {
    text: 'notifications.activityLogRequest',
    icon: ICON_TYPE.sign,
  },
  ACTIVITY_LOG_REVIEW: {
    text: 'notifications.activityLogReview',
    icon: ICON_TYPE.sign,
  },
  ACTIVITY_LOG_APPROVED: { text: 'notifications.activityLogApproved', icon: ICON_TYPE.sign },
  ACTIVITY_LOG_REJECTED: { text: 'notifications.activityLogRejected', icon: ICON_TYPE.signOff },
  INSUFFICIENT_FIRST_HOUR_PAYMENT: {
    text: 'notifications.insufficientFirstHourPayment',
    icon: ICON_TYPE.rejectAppointment,
  },
  PAUSED_APPOINTMENT: {
    text: 'notifications.pausedAppointment',
    icon: ICON_TYPE.pausedAppointment,
  },
  RESUME_APPOINTMENT: {
    text: 'notifications.resumeAppointment',
    icon: ICON_TYPE.acceptAppointment,
  },
};

export { ICON_TYPE, IconColor, NOTIFICATION_STATUS, colorMap, firstItemIndex };
