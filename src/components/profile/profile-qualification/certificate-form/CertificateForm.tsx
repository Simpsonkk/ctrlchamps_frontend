import { yupResolver } from '@hookform/resolvers/yup';
import {
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DEFAULT_PROFILE_QUALIFICATION_VALUES } from 'src/components/profile/profile-qualification/certificate-form/constants';
import {
  ErrorMessage,
  StyledForm,
  StyledButton,
  ButtonWrapper,
} from 'src/components/profile/profile-qualification/certificate-form/styles';
import { useProfileQualificationSchema } from 'src/components/profile/profile-qualification/certificate-form/validation';
import { ProfileQuality } from 'src/components/profile/profile-qualification/types';
import { useLocales } from 'src/locales';
import { BACKEND_DATE_FORMAT, CURRENT_DAY, DATE_FORMAT } from 'src/constants';
import { Certificate, profileApi } from 'src/redux/api/profileCompleteApi';
import { saveCertificates } from 'src/redux/slices/certificateSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import uuidv4 from 'src/utils/uuidv4';

type Props = {
  onClose: () => void;
  onSave: (certificate: ProfileQuality) => void;
  onSuccess?: () => void;
  editingCertificate: ProfileQuality | null;
};

export default function CertificateForm({
  onClose,
  onSave,
  onSuccess,
  editingCertificate,
}: Props): JSX.Element {
  const { translate } = useLocales();
  const certificates = useTypedSelector((state) => state.certificate.certificates);
  const dispatch = useAppDispatch();

  const [createCertificate] = profileApi.useCreateCertificateMutation();
  const profileQualificationSchema = useProfileQualificationSchema();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<ProfileQuality>({
    resolver: yupResolver(profileQualificationSchema),
    mode: 'onChange',
    defaultValues: editingCertificate ?? DEFAULT_PROFILE_QUALIFICATION_VALUES,
  });

  const isExpirationDateDisabled = watch('isExpirationDateDisabled');

  useEffect(() => {
    if (isExpirationDateDisabled) {
      setValue('expirationDate', undefined);
      trigger('expirationDate');
    }
  }, [isExpirationDateDisabled, setValue, trigger]);

  const onSubmit: SubmitHandler<ProfileQuality> = async (values): Promise<void> => {
    const updatedCertificate: ProfileQuality = {
      ...values,
      dateIssued: format(values.dateIssued as Date, BACKEND_DATE_FORMAT),
      expirationDate: values.expirationDate
        ? format(values.expirationDate as Date, BACKEND_DATE_FORMAT)
        : undefined,
    };

    if (editingCertificate && onSuccess) {
      onSave(updatedCertificate);
      onSuccess();
    } else {
      const updatedCertificates: Certificate[] = [
        ...certificates,
        { ...updatedCertificate, id: uuidv4() },
      ];
      try {
        await createCertificate({
          certificates: updatedCertificates,
        })
          .unwrap()
          .then(() => dispatch(saveCertificates(updatedCertificates)))
          .catch((error) => {
            throw new Error(error);
          })
          .finally(() => onClose());
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="name">
          {translate('profileQualification.placeholderCertificationName')}
        </InputLabel>
        <FilledInput {...register('name')} id="name" error={!!errors.name} />
        {errors?.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="certificateId">
          {translate('profileQualification.placeholderCertificationNumber')}
        </InputLabel>
        <FilledInput
          {...register('certificateId')}
          id="certificateId"
          error={!!errors.certificateId}
        />
        {errors?.certificateId && <ErrorMessage>{errors.certificateId?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="link">
          {translate('profileQualification.placeholderCertificationLink')}
        </InputLabel>
        <FilledInput {...register('link')} id="link" error={!!errors.link} />
        {errors?.link && <ErrorMessage>{errors.link?.message}</ErrorMessage>}
      </FormControl>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="dateIssued"
            render={({ field }): JSX.Element => (
              <DatePicker
                {...field}
                label={translate('profileQualification.placeholderStartDate')}
                maxDate={CURRENT_DAY}
                openTo="year"
                inputFormat={DATE_FORMAT}
                PopperProps={{
                  placement: 'top',
                }}
                renderInput={(params): JSX.Element => (
                  <TextField variant="filled" {...params} fullWidth error={!!errors.dateIssued} />
                )}
              />
            )}
          />
          {errors?.dateIssued && <ErrorMessage>{errors.dateIssued?.message}</ErrorMessage>}
        </FormControl>

        <FormControl fullWidth>
          <Controller
            control={control}
            name="expirationDate"
            render={({ field }): JSX.Element => (
              <DatePicker
                {...field}
                label={translate('profileQualification.placeholderExpirationDate')}
                inputFormat={DATE_FORMAT}
                minDate={CURRENT_DAY}
                openTo="year"
                value={isExpirationDateDisabled ? null : field.value}
                onChange={(date): void => field.onChange(date)}
                disabled={isExpirationDateDisabled}
                PopperProps={{
                  placement: 'top',
                }}
                renderInput={(params): JSX.Element => (
                  <TextField
                    variant="filled"
                    {...params}
                    fullWidth
                    error={!!errors.expirationDate}
                  />
                )}
              />
            )}
          />
          {errors?.expirationDate && <ErrorMessage>{errors.expirationDate?.message}</ErrorMessage>}
        </FormControl>
      </Stack>

      <Stack alignItems="end" spacing={1}>
        <FormControlLabel
          control={
            <Checkbox
              {...register('isExpirationDateDisabled')}
              checked={isExpirationDateDisabled}
            />
          }
          label={translate('profileQualification.placeholderCheckbox')}
          labelPlacement="start"
        />
      </Stack>
      <ButtonWrapper>
        <StyledButton type="submit" disabled={!isValid} variant="contained">
          {translate('profileQualification.save')}
        </StyledButton>
      </ButtonWrapper>
    </StyledForm>
  );
}
