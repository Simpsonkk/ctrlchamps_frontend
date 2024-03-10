import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  Stack,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { Controller, useForm } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import {
  Cylinder,
  MainWrapper,
  ManagementWrapper,
  PageName,
} from 'src/components/admin-management/styles';
import UpdateSuccess from 'src/components/reusable/update-success/UpdateSuccess';

import { AUTO_HIDEOUT_DELAY, DATE_FORMAT, DISPLAY_TIME_FORMAT } from 'src/constants';
import { Admin } from 'src/redux/api/adminPanelAPI';
import { getISODateWithoutUTC } from 'src/utils/getISODateWithoutUTC';

import { DEFAULT_ADMIN_FORM_VALUES } from './constants';
import { validatePhoneNumber } from './helpers';
import { useAdminForm } from './hooks';
import {
  ErrorMessage,
  StyledButton,
  StyledFormControl,
  StyledFormTitle,
  StyledLastSave,
  StyledSaveButton,
} from './styles';
import { AdminFormValues } from './types';
import { useAdminFormSchema } from './validation';

interface AdminFormProps {
  selectedAdmin?: Admin;
  onSubmit: (data: AdminFormValues) => void;
}

function AdminForm({ selectedAdmin, onSubmit }: AdminFormProps): JSX.Element | null {
  const { t: translate } = useTranslation();

  const isEditingExistingAdmin = !!selectedAdmin;

  const adminFormSchema = useAdminFormSchema(isEditingExistingAdmin);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid, isDirty, touchedFields },
  } = useForm<AdminFormValues>({
    resolver: yupResolver(adminFormSchema),
    mode: 'onBlur',
    defaultValues: selectedAdmin ?? DEFAULT_ADMIN_FORM_VALUES,
  });

  const {
    handleArrowBackClick,
    handleClickShowPassword,
    handleCopyClick,
    copiedText,
    resetCopiedText,
    handleGeneratePasswordClick,
    handleSubmitClick,
    showPassword,
    isPasswordRegenerated,
    setIsPasswordRegenerated,
  } = useAdminForm({
    onSubmit,
    setValue,
    getValues,
    trigger,
    setError,
    isEditingExistingAdmin,
    touchedFields,
    adminId: selectedAdmin?.id,
  });

  return (
    <MainWrapper>
      <StyledFormTitle>
        <ArrowBackIcon onClick={handleArrowBackClick} cursor="pointer" />
        {translate('adminManagement.title')}
      </StyledFormTitle>
      <ManagementWrapper>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <PageName>
            <Cylinder />
            {isEditingExistingAdmin
              ? translate('adminManagement.adminForm.editAdminTitle')
              : translate('adminManagement.adminForm.createAdminTitle')}
          </PageName>
        </Stack>
        <Stack>
          <form onSubmit={handleSubmit(handleSubmitClick)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="firstName">
                    {translate('adminManagement.adminForm.firstName')}
                  </InputLabel>
                  <FilledInput
                    {...register('firstName')}
                    id="firstName"
                    error={!!errors.firstName}
                  />
                  {errors?.firstName && <ErrorMessage>{errors.firstName?.message}</ErrorMessage>}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="lastName">
                    {translate('adminManagement.adminForm.lastName')}
                  </InputLabel>
                  <FilledInput {...register('lastName')} id="lastName" error={!!errors.lastName} />
                  {errors?.lastName && <ErrorMessage>{errors.lastName?.message}</ErrorMessage>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="email">
                    {translate('adminManagement.adminForm.email')}
                  </InputLabel>
                  <FilledInput
                    {...register('email')}
                    id="email"
                    error={!!errors.email}
                    disabled={isEditingExistingAdmin}
                  />
                  {errors?.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled fullWidth variant="filled">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field, fieldState }): JSX.Element => (
                      <MuiTelInput
                        {...field}
                        onChange={(value): void =>
                          validatePhoneNumber({
                            clearErrors,
                            field,
                            getValues,
                            setError,
                            setValue,
                            translate,
                            value,
                          })
                        }
                        variant="filled"
                        defaultCountry="US"
                        focusOnSelectCountry
                        disableFormatting
                        forceCallingCode
                        onlyCountries={['US', 'CA']}
                        error={fieldState.invalid}
                        inputRef={Input}
                        label={translate('adminManagement.adminForm.phoneNumber')}
                      />
                    )}
                  />
                </FormControl>
                {errors?.phoneNumber && (
                  <ErrorMessage variant="caption">{errors.phoneNumber?.message}</ErrorMessage>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControl disabled fullWidth variant="filled">
                  <InputLabel disabled htmlFor="role">
                    {translate('adminManagement.adminForm.role')}
                  </InputLabel>
                  <FilledInput value={getValues('role')} id="role" error={!!errors.role} disabled />
                  {errors?.role && <ErrorMessage>{errors.role?.message}</ErrorMessage>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <StyledFormControl fullWidth variant="filled">
                  <InputLabel htmlFor="password">
                    {translate('adminManagement.adminForm.password')}
                  </InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }): JSX.Element => (
                      <FilledInput
                        {...field}
                        error={!!errors.password}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors?.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
                </StyledFormControl>
                <Grid container spacing={2}>
                  <Grid item xs={8} md={8} lg={6} xl={4}>
                    <StyledButton
                      fullWidth
                      variant="contained"
                      onClick={handleGeneratePasswordClick}
                    >
                      {isEditingExistingAdmin
                        ? translate('adminManagement.adminForm.regeneratePassword')
                        : translate('adminManagement.adminForm.generatePassword')}
                    </StyledButton>
                  </Grid>
                  <Grid item xs={3}>
                    <StyledButton variant="contained" onClick={handleCopyClick}>
                      {translate('adminManagement.adminForm.copy')}
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <StyledLastSave>
                  {isEditingExistingAdmin &&
                    translate('adminManagement.adminForm.lastSaved', {
                      date: format(
                        parseISO(getISODateWithoutUTC(selectedAdmin.updatedAt)),
                        `${DATE_FORMAT} ${DISPLAY_TIME_FORMAT}`
                      ),
                    })}
                </StyledLastSave>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="end">
                <Grid container spacing={2} display="flex" justifyContent="end">
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      onClick={handleArrowBackClick}
                    >
                      {translate('adminManagement.adminForm.discard')}
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <StyledSaveButton
                      fullWidth
                      variant="contained"
                      disabled={!isValid || !isDirty || !!Object.keys(errors).length}
                      type="submit"
                    >
                      {translate('adminManagement.adminForm.save')}
                    </StyledSaveButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </ManagementWrapper>
      <Snackbar
        open={!!copiedText}
        autoHideDuration={AUTO_HIDEOUT_DELAY}
        onClose={resetCopiedText}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">{translate('adminManagement.adminForm.passwordWasCopied')}</Alert>
      </Snackbar>
      <UpdateSuccess
        dataUpdated={isPasswordRegenerated}
        setDataUpdated={setIsPasswordRegenerated}
        message={translate('adminManagement.adminForm.passwordWasRegenerated')}
      />
    </MainWrapper>
  );
}

export default AdminForm;
