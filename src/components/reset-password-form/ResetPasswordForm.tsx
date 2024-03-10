import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useLocales } from 'src/locales';
import { useResetPasswordMutation } from 'src/redux/api/authApi';

import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { FilledButton } from '../reusable/FilledButton';
import { Container, ErrorMessage, StyledForm } from './style';
import { FormValues, useResetPassword } from './validation';

export default function ResetPasswordForm({
  next,
  email,
}: {
  next: () => void;
  email: string;
}): JSX.Element {
  const { translate } = useLocales();
  const resetPassSchema = useResetPassword();

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(resetPassSchema),
    mode: 'onChange',
  });

  const showPassword = (): void => setIsPassVisible((visible) => !visible);
  const showConfirmPassword = (): void => setIsConfirmPassVisible((visible) => !visible);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword({ email, password: data.password }).unwrap();
      next();
    } catch (err) {
      if (err.data && err.data.message) {
        setError(err.data.message);

        return;
      }
      setError(translate('reset_password.errors.unexpected'));
    }
  });

  return (
    <Container>
      <StyledForm onSubmit={onSubmit} data-testid="reset-form">
        <FormControl variant="outlined">
          <OutlinedInput
            size="small"
            data-testid="password"
            placeholder={translate('reset_password.placeholder.pass')}
            {...register('password')}
            id="password"
            autoComplete="off"
            error={!!errors.password}
            type={isPassVisible ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={translate('reset_password.aria.toggle')}
                  onClick={showPassword}
                >
                  {isPassVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
        </FormControl>
        <FormControl variant="outlined">
          <OutlinedInput
            size="small"
            {...register('confirmPassword')}
            id="confirmPassword"
            data-testid="confirmPass"
            autoComplete="off"
            placeholder={translate('reset_password.placeholder.confirm_pass')}
            error={!!errors.confirmPassword}
            type={isConfirmPassVisible ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={translate('reset_password.aria.toggle')}
                  onClick={showConfirmPassword}
                >
                  {isConfirmPassVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.confirmPassword && (
            <ErrorMessage variant="caption">{errors.confirmPassword?.message}</ErrorMessage>
          )}
          <FilledButton
            type="submit"
            disabled={!isValid || isLoading || error !== null}
            sx={{ mt: 2 }}
            data-testid="reset btn"
          >
            {isLoading ? translate('loading') : translate('reset_password.title')}
          </FilledButton>
        </FormControl>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledForm>
    </Container>
  );
}
