import { useLocales } from 'src/locales';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import { setSelectedCaregiver } from 'src/redux/slices/caregiverSlice';
import { useAppDispatch } from 'src/redux/store';

import { NextButton } from 'src/components/reusable/appointment-btn/styles';
import CaregiverDrawer from 'src/components/reusable/drawer/caregiver-drawer/CaregiverDrawer';
import { InfoIcon } from 'src/theme/overrides/CustomIcons';
import { LocationMessage } from './places-autocomplete/styles';
import { StyledModalFooter } from './styles';

interface CreateAppointmentFourthDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedCaregiverId: string;
  onNext?: () => void;
  isSubmitDisabled: boolean;
}

export default function CreateAppointmentFourthDrawer({
  open,
  onClose,
  selectedCaregiverId,
  onNext,
  isSubmitDisabled,
}: CreateAppointmentFourthDrawerProps): JSX.Element | null {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const { data: selectedCaregiver, isLoading } =
    appointmentApi.useGetCaregiverDetailsQuery(selectedCaregiverId);

  if (isLoading) return null;
  if (!selectedCaregiver) return null;

  const handleBookClick = (): void => {
    dispatch(setSelectedCaregiver(selectedCaregiver));
    if (onNext) onNext();
  };

  return (
    <CaregiverDrawer
      caregiverId={selectedCaregiverId}
      footer={
        onNext && (
          <StyledModalFooter>
            <NextButton
              onClick={handleBookClick}
              variant="contained"
              type="submit"
              fullWidth
              disabled={isSubmitDisabled}
            >
              {translate('createAppointmentFourth.bookAppointment')}
            </NextButton>
            {isSubmitDisabled && (
              <LocationMessage>
                <InfoIcon color="primary" />
                {translate('createAppointmentFourth.toBookAnAppointmentFirstlyChooseYourLocation')}
              </LocationMessage>
            )}
          </StyledModalFooter>
        )
      }
      onClose={onClose}
      open={open}
    />
  );
}
