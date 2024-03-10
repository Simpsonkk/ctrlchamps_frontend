import {
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers';
import uuidv4 from 'src/utils/uuidv4';
import { format } from 'date-fns';

import { WorkExperience, useCreateWorkExperienceMutation } from 'src/redux/api/profileCompleteApi';
import { saveWorkExperiences } from 'src/redux/slices/workEperienceSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { ProfileExperience } from 'src/components/complete-profile-second/types';
import { DEFAULT_EXPERIENCE_VALUES } from 'src/components/complete-profile-second/work-form/constants';
import { useExperienceSelectOptions } from 'src/components/complete-profile-second/work-form/select-options';
import {
  ErrorMessage,
  StyledForm,
  StyledButton,
  ButtonWrapper,
} from 'src/components/complete-profile-second/work-form/styles';
import { useProfileExperienceSchema } from 'src/components/complete-profile-second/work-form/validation';
import { DATE_FORMAT, BACKEND_DATE_FORMAT, CURRENT_DAY } from 'src/constants';
import { useLocales } from 'src/locales';

type Props = {
  onClose: () => void;
  onSave: (workPlace: ProfileExperience) => void;
  onSuccess?: () => void;
  editingWorkPlaces: ProfileExperience | null;
};

export default function WorkForm({
  onClose,
  onSave,
  onSuccess,
  editingWorkPlaces,
}: Props): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const workPlaces = useTypedSelector((state) => state.workExperience.workExperiences);
  const [createWorkPlace] = useCreateWorkExperienceMutation();

  const profileExperienceSchema = useProfileExperienceSchema();
  const { qualifications } = useExperienceSelectOptions();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<ProfileExperience>({
    resolver: yupResolver(profileExperienceSchema),
    mode: 'onChange',
    defaultValues: editingWorkPlaces ?? DEFAULT_EXPERIENCE_VALUES,
  });

  const isEndDateDisabled = watch('isEndDateDisabled');

  useEffect(() => {
    if (isEndDateDisabled) {
      setValue('endDate', undefined);
      trigger('endDate');
    }
  }, [isEndDateDisabled, setValue, trigger]);

  const onSubmit: SubmitHandler<ProfileExperience> = async (values): Promise<void> => {
    const updatedWorkPlace: ProfileExperience = {
      ...values,
      startDate: format(values.startDate as Date, BACKEND_DATE_FORMAT),
      endDate: values.endDate ? format(values.endDate as Date, BACKEND_DATE_FORMAT) : undefined,
    };

    if (editingWorkPlaces && onSuccess) {
      onSave(updatedWorkPlace);
      onSuccess();
    } else {
      const updatedWorkPlaces: WorkExperience[] = [
        ...workPlaces,
        { ...updatedWorkPlace, id: uuidv4() },
      ];
      try {
        await createWorkPlace({
          workExperiences: updatedWorkPlaces,
        })
          .unwrap()
          .then(() => dispatch(saveWorkExperiences(updatedWorkPlaces)))
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
        <InputLabel htmlFor="workplace">
          {translate('completeProfileSecond.workPlaceLabel')}
        </InputLabel>
        <FilledInput {...register('workplace')} id="workplace" error={!!errors.workplace} />
        {errors?.workplace && <ErrorMessage>{errors.workplace?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="qualifications">
          {translate('completeProfileSecond.workTypeLabel')}
        </InputLabel>

        <Controller
          name="qualifications"
          control={control}
          render={({ field: { onChange, value } }): JSX.Element => (
            <Select
              value={value}
              onChange={onChange}
              label={translate('signUpThirdForm.placeholderCountry')}
              id="qualifications"
            >
              {qualifications.map((qualification) => (
                <MenuItem value={qualification.value} key={qualification.value}>
                  {qualification.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        {errors?.qualifications && <ErrorMessage>{errors.qualifications?.message}</ErrorMessage>}
      </FormControl>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth variant="filled">
          <Controller
            control={control}
            name="startDate"
            render={({ field }): JSX.Element => (
              <DatePicker
                {...field}
                label={translate('completeProfileSecond.startDateLabel')}
                maxDate={CURRENT_DAY}
                openTo="year"
                inputFormat={DATE_FORMAT}
                PopperProps={{
                  placement: 'top',
                }}
                renderInput={(params): JSX.Element => (
                  <TextField variant="filled" {...params} fullWidth error={!!errors.startDate} />
                )}
              />
            )}
          />
          {errors?.startDate && <ErrorMessage>{errors.startDate?.message}</ErrorMessage>}
        </FormControl>

        <FormControl fullWidth variant="filled">
          <Controller
            control={control}
            name="endDate"
            render={({ field }): JSX.Element => (
              <DatePicker
                {...field}
                label={translate('completeProfileSecond.endDateLabel')}
                inputFormat={DATE_FORMAT}
                maxDate={CURRENT_DAY}
                minDate={watch('startDate')}
                openTo="year"
                value={isEndDateDisabled ? null : field.value}
                onChange={(date): void => field.onChange(date)}
                disabled={isEndDateDisabled}
                PopperProps={{
                  placement: 'top',
                }}
                renderInput={(params): JSX.Element => (
                  <TextField variant="filled" {...params} fullWidth error={!!errors.endDate} />
                )}
              />
            )}
          />
          {errors?.endDate && <ErrorMessage>{errors.endDate?.message}</ErrorMessage>}
        </FormControl>
      </Stack>

      <Stack>
        <FormControlLabel
          control={<Checkbox {...register('isEndDateDisabled')} checked={isEndDateDisabled} />}
          label={translate('completeProfileSecond.checkboxLabel')}
          labelPlacement="end"
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
