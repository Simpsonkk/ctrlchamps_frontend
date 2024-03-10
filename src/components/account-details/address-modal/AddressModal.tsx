import { FormControl, InputLabel, FilledInput, Select, MenuItem } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLocales } from 'src/locales';
import { User, useUpdateUserMutation } from 'src/redux/api/userApi';
import {
  SignUpThirdFormValues,
  useSignUpThirdSchema,
} from 'src/components/sign-up-third/validation';
import { useSignUpThirdCountrySelectOptions } from 'src/components/sign-up-third/select-options';
import { StyledButton } from 'src/components/account-details/styles';
import {
  Container,
  FormBody,
  ErrorMessage,
  FormFooter,
} from 'src/components/account-details/personal-info-modal/styles';

interface IProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddressModal({ user, onClose, onSuccess }: IProps): JSX.Element {
  const { translate } = useLocales();

  const [updateAddress] = useUpdateUserMutation();
  const { countries } = useSignUpThirdCountrySelectOptions();
  const schema = useSignUpThirdSchema();

  const { country, state, city, zipCode, address } = user;

  const defaultValues = {
    country,
    state,
    city,
    zipCode,
    address,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpThirdFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SignUpThirdFormValues> = async (data) => {
    try {
      await updateAddress({ id: user.id, ...data })
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
          <FormControl variant="filled">
            <InputLabel htmlFor="country">{translate('accountDetails.labels.country')}</InputLabel>

            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Select value={value} onChange={onChange} id="country">
                  {countries.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            {errors?.country && <ErrorMessage>{errors.country?.message}</ErrorMessage>}
          </FormControl>

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="state">{translate('accountDetails.labels.state')}</InputLabel>
            <FilledInput {...register('state')} id="state" error={!!errors.state} />
            {errors?.state && <ErrorMessage>{errors.state?.message}</ErrorMessage>}
          </FormControl>

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="city">{translate('accountDetails.labels.city')}</InputLabel>
            <FilledInput {...register('city')} id="city" error={!!errors.city} />
            {errors?.city && <ErrorMessage>{errors.city?.message}</ErrorMessage>}
          </FormControl>

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="zipCode">{translate('accountDetails.labels.zip')}</InputLabel>
            <FilledInput {...register('zipCode')} id="zipCode" error={!!errors.zipCode} />
            {errors?.zipCode && <ErrorMessage>{errors.zipCode?.message}</ErrorMessage>}
          </FormControl>

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="address">{translate('accountDetails.labels.street')}</InputLabel>
            <FilledInput {...register('address')} id="address" error={!!errors.address} />
            {errors?.address && <ErrorMessage>{errors.address?.message}</ErrorMessage>}
          </FormControl>
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
