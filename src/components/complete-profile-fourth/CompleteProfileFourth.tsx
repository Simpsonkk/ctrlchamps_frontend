import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorText } from 'src/components/reusable';
import ProfileBtn from 'src/components/reusable/profile-btn/ProfileBtn';
import { AUTO_HIDEOUT_DELAY, weekDays } from 'src/constants';
import { availableTimeOptions } from './constants';
import useCompleteProfileFourth from './hooks';
import {
  BaseText,
  Container,
  SelectContainer,
  WeekSlot,
  WeekSlotContainer,
  Wrapper,
} from './styles';

interface IProps {
  onNext: () => void;
  onBack: () => void;
  onSuccess?: () => void;
}

export default function CompleteProfileFourth({ onNext, onBack, onSuccess }: IProps): JSX.Element {
  const { t: translate } = useTranslation();
  const {
    daySelected,
    chosenDays,
    availableFrom,
    availableTo,
    chooseDay,
    chooseFromTime,
    chooseToTime,
    defineAvailableDays,
    invalidTimeError,
    identicalTimeError,
    isButtonDisabled,
    serverError,
    setServerError,
  } = useCompleteProfileFourth({ onNext, onSuccess });

  return (
    <Wrapper>
      <Container>
        <BaseText>{translate('completeProfileFourth.specify_time')}</BaseText>
        <WeekSlotContainer>
          {weekDays.map((day) => (
            <WeekSlot
              key={day.value}
              className={chosenDays.find((el: string) => el === day.value) ? 'active' : ''}
              onClick={(): void => chooseDay(day.value)}
            >
              {day.abbr}
            </WeekSlot>
          ))}
        </WeekSlotContainer>
        <SelectContainer>
          <FormControl fullWidth variant="standard">
            <InputLabel>{translate('completeProfileFourth.from')}</InputLabel>
            <Select
              disabled={daySelected === null}
              value={availableFrom}
              onChange={(e): void => chooseFromTime(e.target.value)}
            >
              {availableTimeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel>{translate('completeProfileFourth.to')}</InputLabel>
            <Select
              disabled={daySelected === null}
              value={availableTo}
              onChange={(e): void => chooseToTime(e.target.value)}
            >
              {availableTimeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
        {invalidTimeError && (
          <ErrorText>{translate('completeProfileFourth.invalid_time')}</ErrorText>
        )}
        {identicalTimeError && (
          <ErrorText>{translate('completeProfileFourth.equal_time_error')}</ErrorText>
        )}
        <Snackbar
          open={serverError}
          autoHideDuration={AUTO_HIDEOUT_DELAY}
          onClose={(): void => setServerError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="error">{translate('unexpected_error')}</Alert>
        </Snackbar>
        <ProfileBtn
          nextText={translate('btn_next')}
          backText={translate('profileQualification.back')}
          onClick={defineAvailableDays}
          disabled={isButtonDisabled}
          onBack={onBack}
        />
      </Container>
    </Wrapper>
  );
}
