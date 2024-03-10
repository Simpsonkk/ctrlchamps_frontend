import { yupResolver } from '@hookform/resolvers/yup';
import { FilledInput, FormControl, InputLabel, Slider } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  MAX_RATE,
  MIN_RATE,
  RATE_MARKS,
  RATE_STEP,
} from 'src/components/complete-profile-fifth/constants';
import {
  ErrorMessage,
  InputWrapper,
  StyledForm,
  Wrapper,
} from 'src/components/complete-profile-fifth/styles';
import {
  CompleteProfileFifthValues,
  useCompleteProfileFifthSchema,
} from 'src/components/complete-profile-fifth/validation';
import { useLocales } from 'src/locales';
import { useUpdateProfileMutation } from 'src/redux/api/profileCompleteApi';
import { saveRate } from 'src/redux/slices/rateSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import ProfileBtn from 'src/components/reusable/profile-btn/ProfileBtn';

interface IProps {
  onNext: () => void;
  onBack: () => void;
  onSuccess?: () => void;
}

export default function CompleteProfileFifth({ onNext, onBack, onSuccess }: IProps): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const completeProfileFifthSchema = useCompleteProfileFifthSchema();

  const initialRateValue = useTypedSelector((state) => state.hourlyRate.hourlyRate);

  const [updateHourlyRate] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompleteProfileFifthValues>({
    mode: 'onBlur',
    resolver: yupResolver(completeProfileFifthSchema),
    defaultValues: {
      hourlyRate: initialRateValue,
    },
  });

  const onSubmit: SubmitHandler<CompleteProfileFifthValues> = async (data) => {
    dispatch(saveRate(data.hourlyRate));

    try {
      await updateHourlyRate({
        updateProfileDto: { hourlyRate: data.hourlyRate },
      })
        .unwrap()
        .then(() => {
          if (onSuccess) {
            onSuccess();
          }
          onNext();
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="hourlyRate"
          control={control}
          render={({ field }): JSX.Element => (
            <Slider
              {...field}
              size="medium"
              onChange={(value): void => field.onChange(value)}
              aria-labelledby="input-slider"
              min={MIN_RATE}
              max={MAX_RATE}
              valueLabelDisplay="auto"
              marks={RATE_MARKS}
            />
          )}
        />
        <InputWrapper>
          <Controller
            name="hourlyRate"
            control={control}
            render={({ field }): JSX.Element => (
              <FormControl sx={{ width: '100%' }} variant="filled">
                <InputLabel htmlFor="email">
                  {translate('completeProfileFifth.placeholderRate')}
                </InputLabel>

                <FilledInput
                  {...field}
                  error={!!errors.hourlyRate}
                  onChange={(value): void => field.onChange(value)}
                  inputProps={{
                    step: RATE_STEP,
                    min: MIN_RATE,
                    max: MAX_RATE,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </FormControl>
            )}
          />
          {errors?.hourlyRate && (
            <ErrorMessage variant="caption">{errors.hourlyRate?.message}</ErrorMessage>
          )}
        </InputWrapper>
        <ProfileBtn
          nextText={translate('btn_next')}
          backText={translate('profileQualification.back')}
          disabled={!isValid}
          onBack={onBack}
        />
      </StyledForm>
    </Wrapper>
  );
}
