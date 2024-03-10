import { yupResolver } from '@hookform/resolvers/yup';
import {
  FilledInput,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Switch,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { MuiTelInput } from 'mui-tel-input';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { MAX_BIRTH_DATE, MAX_PHONE_CHARACTERS } from 'src/components/sign-up-second/constants';
import { CURRENT_DAY, DATE_FORMAT, USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { savePersonalDetails } from 'src/redux/slices/personalDetailsSlice';
import { useAppDispatch } from 'src/redux/store';

import { useSignUpSecond } from 'src/components/sign-up-second/hooks';
import {
  ErrorMessage,
  InputWrapper,
  NextButton,
  StyledForm,
} from 'src/components/sign-up-second/styles';
import {
  SignUpSecondValues,
  useSignUpSecondSchema,
} from 'src/components/sign-up-second/validation';
import { UserRole } from 'src/redux/slices/userSlice';

interface IProps {
  role: UserRole;
  onNext: () => void;
}
function SignUpSecond({ role, onNext }: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const signUpSecondSchema = useSignUpSecondSchema(role);
  const { defaultValues, onAccountCheck } = useSignUpSecond(onNext);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignUpSecondValues>({
    resolver: yupResolver(signUpSecondSchema),
    mode: 'onChange',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SignUpSecondValues> = async (data): Promise<void> => {
    const { email, phoneNumber, dateOfBirth } = data;
    const formattedDate = format(dateOfBirth, DATE_FORMAT);
    dispatch(
      savePersonalDetails({
        ...data,
        dateOfBirth: formattedDate,
      })
    );
    onAccountCheck({ email, phoneNumber }, setError);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="firstName">
            {translate('signUpSecondForm.placeholderFirstName')}
          </InputLabel>
          <FilledInput
            {...register('firstName')}
            id="firstName"
            error={!!errors.firstName}
            type="text"
          />
        </FormControl>
        {errors?.firstName && (
          <ErrorMessage variant="caption">{errors.firstName?.message}</ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="lastName">
            {translate('signUpSecondForm.placeholderLastName')}
          </InputLabel>
          <FilledInput
            {...register('lastName')}
            id="lastName"
            error={!!errors.lastName}
            type="text"
          />
        </FormControl>
        {errors?.lastName && (
          <ErrorMessage variant="caption">{errors.lastName?.message}</ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="email">{translate('signUpSecondForm.placeholderEmail')}</InputLabel>
          <FilledInput {...register('email')} id="email" error={!!errors.email} type="email" />
        </FormControl>
        {errors?.email && <ErrorMessage variant="caption">{errors.email?.message}</ErrorMessage>}
      </InputWrapper>
      <InputWrapper>
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
        {errors?.phoneNumber && (
          <ErrorMessage variant="caption">{errors.phoneNumber?.message}</ErrorMessage>
        )}
      </InputWrapper>

      <InputWrapper>
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue={MAX_BIRTH_DATE}
          render={({ field }): JSX.Element => (
            <DatePicker
              {...field}
              label={translate('signUpSecondForm.placeholderBirthDate')}
              inputFormat={DATE_FORMAT}
              maxDate={role === USER_ROLE.Caregiver ? MAX_BIRTH_DATE : CURRENT_DAY}
              openTo="year"
              renderInput={(params): JSX.Element => (
                <TextField variant="filled" {...params} fullWidth error={!!errors.dateOfBirth} />
              )}
            />
          )}
        />
        {errors?.dateOfBirth && (
          <ErrorMessage variant="caption">{errors.dateOfBirth?.message}</ErrorMessage>
        )}
      </InputWrapper>

      {role === USER_ROLE.Caregiver && (
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
      <NextButton variant="contained" type="submit" disabled={!isValid}>
        Next
      </NextButton>
    </StyledForm>
  );
}
export default SignUpSecond;
