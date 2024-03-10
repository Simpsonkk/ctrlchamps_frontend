import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppointmentDebtStatus } from 'src/components/appointments/enums';
import ConfirmAppointment from 'src/components/confirm-appointment/ConfirmAppointment';
import CreateAppointmentFourth from 'src/components/create-appointment-fourth/CreateAppointmentFourth';
import AppointmentScheduling from 'src/components/create-appointment/AppointmentScheduling';
import AppointmentType from 'src/components/create-appointment/AppointmentType';
import HealthQuestionnaire from 'src/components/health-questionnaire';
import {
  CancelAppointmentModal,
  useCancelAppointmentModal,
} from 'src/components/modal-cancel-appointment';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { Step } from 'src/components/profile/profile-qualification/types';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import HorizontalStepper from 'src/components/reusable/horizontal-stepper/HorizontalStepper';
import { APPOINTMENT_STATUS, FIRST_STEP_INDEX, SECOND_STEP_INDEX, USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useGetAllAppointmentsQuery } from 'src/redux/api/appointmentApi';
import { ROUTES } from 'src/routes';
import { PRIMARY } from 'src/theme/colors';

export default function CreateAppointmentPage(): JSX.Element | null {
  const { translate } = useLocales();
  const router = useRouter();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(FIRST_STEP_INDEX);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const { modalOpen, setModalOpen, handleOpen } = useCancelAppointmentModal();

  const { data: appointments, isSuccess, isLoading, isFetching } = useGetAllAppointmentsQuery();

  if (isLoading || isFetching) {
    return null;
  }

  if (!appointments || !isSuccess) {
    router.push(ROUTES.home);

    return null;
  }

  const hasDebtAppointments = appointments.some(
    (appointment) =>
      appointment.debtStatus === AppointmentDebtStatus.NotAccrued ||
      appointment.status === APPOINTMENT_STATUS.Paused
  );

  if (hasDebtAppointments) {
    router.push(ROUTES.home);

    return null;
  }

  const handleNext = (): void => {
    setCompleted({ ...completed, [activeStepIndex]: true });
    setActiveStepIndex(activeStepIndex + SECOND_STEP_INDEX);
  };

  const handleBack = (): void => {
    if (activeStepIndex > FIRST_STEP_INDEX) {
      setActiveStepIndex(activeStepIndex - SECOND_STEP_INDEX);
    }
  };

  const STEPS: Step[] = [
    {
      label: translate('appointmentSteps.appointmentType'),
      component: <AppointmentType onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.scheduling'),
      component: <AppointmentScheduling onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.healthQuestioner'),
      component: <HealthQuestionnaire onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.findCaregiver'),
      component: <CreateAppointmentFourth onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.confirm'),
      component: <ConfirmAppointment onBack={handleBack} />,
    },
  ];

  const handleStep = (stepIndex: number) => () => {
    if (stepIndex === FIRST_STEP_INDEX || completed[stepIndex - SECOND_STEP_INDEX]) {
      setActiveStepIndex(stepIndex);
    }
  };

  const ActiveStepComponent = STEPS[activeStepIndex].component;

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.Seeker]}>
      <Head>
        <title>{translate('create_appointment.create')}</title>
      </Head>
      <FlowHeader
        text={translate('create_appointment.header_text')}
        iconType="close"
        callback={handleOpen}
      />
      <HorizontalStepper
        activeStep={activeStepIndex}
        completed={completed}
        onStep={handleStep}
        steps={STEPS}
        color={PRIMARY.light_main}
      />
      {ActiveStepComponent}
      <CancelAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </PrivateRoute>
  );
}
