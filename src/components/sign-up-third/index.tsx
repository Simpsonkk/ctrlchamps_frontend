import { yupResolver } from '@hookform/resolvers/yup';
import { FilledInput, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

import { useLocales } from 'src/locales';
import { saveAddressData } from 'src/redux/slices/addressSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { useSignUpThirdCountrySelectOptions } from './select-options';

import { ErrorMessage, NextButton, StyledForm } from './style';
import { SignUpThirdFormValues, useSignUpThirdSchema } from './validation';

interface SignUpThirdFormProps {
  onNext: () => void;
}

export default function SignUpThirdForm({ onNext }: SignUpThirdFormProps): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const signUpThirdSchema = useSignUpThirdSchema();
  const { countries } = useSignUpThirdCountrySelectOptions();
  const initialAddressValues = useTypedSelector((state) => state.address.addressData);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpThirdFormValues>({
    resolver: yupResolver(signUpThirdSchema),
    mode: 'onBlur',
    defaultValues: initialAddressValues,
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(saveAddressData(data));
    onNext();
  });

  return (
    <StyledForm onSubmit={onSubmit} data-testid="form">
      <FormControl variant="filled">
        <InputLabel htmlFor="country" data-testid="country-label">
          {translate('signUpThirdForm.placeholderCountry')}
        </InputLabel>

        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onChange={onChange}
              SelectDisplayProps={
                { 'data-testid': 'country-select' } as React.HTMLAttributes<HTMLDivElement>
              }
              label={translate('signUpThirdForm.placeholderCountry')}
              id="country"
            >
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        {errors?.country && (
          <ErrorMessage data-testid="country-error">{errors.country?.message}</ErrorMessage>
        )}
      </FormControl>

      <FormControl sx={{ width: '100%' }} variant="filled">
        <InputLabel htmlFor="state" data-testid="state-label">
          {translate('signUpThirdForm.placeholderState')}
        </InputLabel>
        <FilledInput
          inputProps={{ 'data-testid': 'state-input' } as React.HTMLAttributes<HTMLInputElement>}
          {...register('state')}
          id="state"
          error={!!errors.state}
        />
        {errors?.state && (
          <ErrorMessage data-testid="state-error">{errors.state?.message}</ErrorMessage>
        )}
      </FormControl>

      <FormControl sx={{ width: '100%' }} variant="filled">
        <InputLabel htmlFor="city" data-testid="city-label">
          {translate('signUpThirdForm.placeholderCity')}
        </InputLabel>
        <FilledInput
          {...register('city')}
          id="city"
          error={!!errors.city}
          inputProps={{ 'data-testid': 'city-input' } as React.HTMLAttributes<HTMLInputElement>}
        />
        {errors?.city && (
          <ErrorMessage variant="caption" data-testid="city-error">
            {errors.city?.message}
          </ErrorMessage>
        )}
      </FormControl>

      <FormControl sx={{ width: '100%' }} variant="filled">
        <InputLabel htmlFor="zipCode" data-testid="zipCode-label">
          {translate('signUpThirdForm.placeholderZipCode')}
        </InputLabel>
        <FilledInput
          {...register('zipCode')}
          id="zipCode"
          error={!!errors.zipCode}
          inputProps={{ 'data-testid': 'zipCode-input' } as React.HTMLAttributes<HTMLInputElement>}
        />
        {errors?.zipCode && (
          <ErrorMessage variant="caption" data-testid="zipCode-error">
            {errors.zipCode?.message}
          </ErrorMessage>
        )}
      </FormControl>

      <FormControl sx={{ width: '100%' }} variant="filled">
        <InputLabel htmlFor="address" data-testid="address-label">
          {translate('signUpThirdForm.placeholderAddress')}
        </InputLabel>
        <FilledInput
          {...register('address')}
          id="address"
          error={!!errors.address}
          inputProps={{ 'data-testid': 'address-input' } as React.HTMLAttributes<HTMLInputElement>}
        />
        {errors?.address && (
          <ErrorMessage variant="caption" data-testid="address-error">
            {errors.address?.message}
          </ErrorMessage>
        )}
      </FormControl>
      <NextButton variant="contained" disabled={!isValid} type="submit" data-testid="next-button">
        Next
      </NextButton>
    </StyledForm>
  );
}
