import { IconButton, List, ListItem, ListItemAvatar, Palette } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MonetizationOn from 'src/assets/icons/MonetizationOn';
import RightAction from 'src/assets/icons/RightAction';
import StarRateIcon from '@mui/icons-material/StarRate';
import { serializeCaregiverFilterStateToQueryString } from 'src/components/create-appointment-fourth/helpers';
import {
  useCaregiverFilter,
  useCreateAppointmentFourth,
} from 'src/components/create-appointment-fourth/hooks';
import {
  Background,
  CaregiverListContainer,
  IconsWrapper,
  StyledListItemText,
} from 'src/components/create-appointment-fourth/styles';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import { SMALL_AVATAR_SIZE } from 'src/constants';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import { useTypedSelector } from 'src/redux/store';
import { SECONDARY } from 'src/theme/colors';
import CreateAppointmentFourthDrawer from './CreateAppointmentFourthDrawer';
import CreateAppointmentFourthFilter from './CreateAppointmentFourthFilter';

interface CreateAppointmentFourthProps {
  onNext: () => void;
  onBack: () => void;
}

const EMPTY_RATING = '0.0';

export default function CreateAppointmentFourth({
  onNext,
  onBack,
}: CreateAppointmentFourthProps): JSX.Element {
  const { t: translate } = useTranslation();

  const appointment = useTypedSelector((state) => state.appointment);
  const seekerLocation = useTypedSelector((state) => state.location.location);

  const { handleDrawerClose, handleDrawerOpen, isDrawerOpen, selectedCaregiverId } =
    useCreateAppointmentFourth();
  const {
    caregiverFilter,
    handleLocationChange,
    handleServicesChange,
    handleRatingsChange,
    handleSwitchChange,
  } = useCaregiverFilter(appointment);

  const [getFilteredCaregivers, { data: filteredCaregivers }] =
    appointmentApi.useLazyGetFilteredCaregiversQuery();

  useEffect(() => {
    getFilteredCaregivers(serializeCaregiverFilterStateToQueryString(caregiverFilter, translate));
  }, [caregiverFilter, getFilteredCaregivers, translate]);

  return (
    <Background>
      <CreateAppointmentFourthFilter
        caregiverFilter={caregiverFilter}
        handleLocationChange={handleLocationChange}
        handleServicesChange={handleServicesChange}
        handleRatingsChange={handleRatingsChange}
        handleSwitchChange={handleSwitchChange}
        onBack={onBack}
      />

      <CaregiverListContainer>
        <List>
          {!!filteredCaregivers &&
            filteredCaregivers.map((caregiver) => (
              <ListItem
                key={caregiver.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="open-drawer"
                    onClick={(): void => handleDrawerOpen(caregiver.id)}
                  >
                    <RightAction />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <UserAvatar userId={caregiver.id} size={SMALL_AVATAR_SIZE} />
                </ListItemAvatar>

                <StyledListItemText
                  primary={`${caregiver.firstName} ${caregiver.lastName}`}
                  secondary={
                    <IconsWrapper>
                      <StarRateIcon
                        htmlColor={
                          caregiver.averageRating !== EMPTY_RATING ? SECONDARY.yellow : undefined
                        }
                      />
                      {caregiver.averageRating}
                      <MonetizationOn />
                      {translate('createAppointmentFourth.hourRate', {
                        rate: caregiver.hourlyRate,
                      })}
                    </IconsWrapper>
                  }
                />
              </ListItem>
            ))}
        </List>
      </CaregiverListContainer>
      {selectedCaregiverId && (
        <CreateAppointmentFourthDrawer
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          selectedCaregiverId={selectedCaregiverId}
          onNext={onNext}
          isSubmitDisabled={!seekerLocation}
        />
      )}
    </Background>
  );
}
