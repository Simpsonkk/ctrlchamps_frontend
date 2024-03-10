import { useMemo } from 'react';
import { parse, format } from 'date-fns';
import {
  FormControl,
  InputLabel,
  FilledInput,
  Stack,
  FormControlLabel,
  Input,
  TextField,
  Switch,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { DATE_FORMAT, USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { User, useUpdateUserMutation } from 'src/redux/api/userApi';
import { MAX_PHONE_CHARACTERS, MAX_BIRTH_DATE } from 'src/components/sign-up-second/constants';
import { PersonalInfo } from 'src/components/account-details/personal-info-modal/types';
import { StyledButton } from 'src/components/account-details/styles';

import { usePersonalInfoSchema } from './validation';
import { Container, FormBody, ErrorMessage, FormFooter } from './styles';

interface IProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PersonalInfoModal({ user, onClose, onSuccess }: IProps): JSX.Element {
  const { translate } = useLocales();

  const [updatePersonalInfo] = useUpdateUserMutation();

  const schema = usePersonalInfoSchema();

  const { firstName, lastName, dateOfBirth, phoneNumber, isOpenToSeekerHomeLiving } = user;

  const initialDateOfBirth = useMemo(
    () => (dateOfBirth ? parse(dateOfBirth, DATE_FORMAT, new Date()) : undefined),
    [dateOfBirth]
  );

  const defaultValues = {
    firstName,
    lastName,
    phoneNumber,
    isOpenToSeekerHomeLiving,
    dateOfBirth: initialDateOfBirth,
  };

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<PersonalInfo>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<PersonalInfo> = async (data) => {
    const formattedDate = format(data.dateOfBirth, DATE_FORMAT);

    try {
      await updatePersonalInfo({ id: user.id, ...data, dateOfBirth: formattedDate })
        .unwrap()
        .then(() => {
          onSuccess();
          onClose();
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBody>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="firstName">
                {translate('accountDetails.labels.firstName')}
              </InputLabel>
              <FilledInput {...register('firstName')} id="firstName" error={!!errors.firstName} />
              {errors?.firstName && <ErrorMessage>{errors.firstName?.message}</ErrorMessage>}
            </FormControl>
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="lastName">
                {translate('accountDetails.labels.lastName')}
              </InputLabel>
              <FilledInput {...register('lastName')} id="lastName" error={!!errors.lastName} />
              {errors?.lastName && <ErrorMessage>{errors.lastName?.message}</ErrorMessage>}
            </FormControl>
          </Stack>
          <FormControl sx={{ width: '100%' }} variant="filled">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }): JSX.Element => (
                <MuiTelInput
                  {...field}
                  onChange={(value: string): void => {
                    const currentValue = getValues('phoneNumber');
                    field.onChange(value);
                    if (value.slice(2, 3) === '0') {
                      field.onChange('');
                      setError('phoneNumber', {
                        type: 'manual',
                        message: `${translate('signUpSecondForm.phoneInvalid')}`,
                      });

                      return;
                    }
                    if (value.slice(2, 3) === '') {
                      field.onChange('');
                      setError('phoneNumber', {
                        type: 'manual',
                        message: `${translate('signUpSecondForm.phoneInvalid1')}`,
                      });

                      return;
                    }
                    if (value.length <= MAX_PHONE_CHARACTERS) {
                      field.onChange(value);
                      setValue('phoneNumber', value);

                      return;
                    }
                    if (value.length > MAX_PHONE_CHARACTERS) {
                      field.onChange(currentValue);
                      setError('phoneNumber', {
                        type: 'manual',
                        message: `${translate('signUpSecondForm.phoneLengthInvalid')}`,
                      });

                      return;
                    }
                    clearErrors('phoneNumber');
                  }}
                  variant="filled"
                  defaultCountry="US"
                  focusOnSelectCountry
                  disableFormatting
                  forceCallingCode
                  onlyCountries={['US', 'CA']}
                  error={fieldState.invalid}
                  inputRef={Input}
                  label={translate('signUpSecondForm.placeholderPhone')}
                />
              )}
            />
          </FormControl>
          {errors?.phoneNumber && <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>}

          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue={MAX_BIRTH_DATE}
            rules={{
              validate: (value) =>
                value <= MAX_BIRTH_DATE || translate('signUpSecondForm.birthDateMax'),
            }}
            render={({ field }): JSX.Element => (
              <DatePicker
                {...field}
                label={translate('signUpSecondForm.placeholderBirthDate')}
                inputFormat={DATE_FORMAT}
                maxDate={MAX_BIRTH_DATE}
                openTo="year"
                renderInput={(params): JSX.Element => (
                  <TextField variant="filled" {...params} fullWidth error={!!errors.dateOfBirth} />
                )}
              />
            )}
          />
          {errors?.dateOfBirth && <ErrorMessage>{errors.dateOfBirth?.message}</ErrorMessage>}

          {user.role === USER_ROLE.Caregiver && (
            <Controller
              control={control}
              name="isOpenToSeekerHomeLiving"
              render={({ field }): JSX.Element => (
                <FormControlLabel
                  control={
                    <Switch
                      value={field.value}
                      checked={field.value}
                      onChange={(date): void => field.onChange(date)}
                    />
                  }
                  label={translate('signUpSecondForm.placeholderIsOpen')}
                />
              )}
            />
          )}
        </FormBody>
        <FormFooter>
          <StyledButton type="submit" disabled={!isValid || !isDirty} variant="contained">
            {translate('accountDetails.personalInfoModal.saveButton')}
          </StyledButton>
        </FormFooter>
      </form>
    </Container>
  );
}
