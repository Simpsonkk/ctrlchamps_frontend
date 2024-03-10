import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@mui/icons-material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Button, FilledInput, FormControl, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';

import {
  AVI_FORMAT,
  DEFAULT_BIO_VALUES,
  MOV_FORMAT,
  MP4_FORMAT,
} from 'src/components/profile/bio/constants';
import {
  ErrorMessage,
  MediaWrapper,
  NotAllowIcon,
  StyledForm,
  StyledFormControl,
  StyledIconButton,
  StyledVideo,
  VideocamIcon,
} from 'src/components/profile/bio/styles';
import { BioFormValues } from 'src/components/profile/bio/types';
import { useBioFormSchema } from 'src/components/profile/bio/validation';
import ProfileBtn from 'src/components/reusable/profile-btn/ProfileBtn';
import { useLocales } from 'src/locales';
import { useUpdateProfileMutation, useUploadFileMutation } from 'src/redux/api/profileCompleteApi';
import { setToken } from 'src/redux/slices/tokenSlice';
import { useAppDispatch } from 'src/redux/store';
import { ROUTES } from 'src/routes';

interface IProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export function Bio({ onBack, onSuccess }: IProps): JSX.Element {
  const [videoPreviewURL, setVideoPreviewURL] = useState<string>('');
  const [uploadVideoMutation] = useUploadFileMutation();
  const [updateDescription] = useUpdateProfileMutation();

  const { translate } = useLocales();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const bioFormSchema = useBioFormSchema();

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isValid },
  } = useForm<BioFormValues>({
    resolver: yupResolver(bioFormSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_BIO_VALUES,
  });

  const video = watch('video');

  const onSubmit: SubmitHandler<BioFormValues> = async (data) => {
    try {
      if (data.video) {
        await uploadVideoMutation({
          file: data.video,
        });
      }
      await updateDescription({
        updateProfileDto: { description: data.description },
      })
        .unwrap()

        .then((response) => {
          if (response.token) {
            dispatch(setToken(response.token));
          }
          if (onSuccess) {
            onSuccess();
          }
          router.push(ROUTES.home);
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<BioFormValues, 'video'>
  ): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      field.onChange(file);
      setVideoPreviewURL(URL.createObjectURL(file));
    }
  };

  const onDeleteVideo = (): void => {
    resetField('video');
    URL.revokeObjectURL(videoPreviewURL);
    setVideoPreviewURL('');
  };

  const renderVideoPreview = (videoFormat?: string): JSX.Element => {
    switch (videoFormat) {
      case AVI_FORMAT:
        return <VideocamIcon />;
      case MP4_FORMAT:
      case MOV_FORMAT:
        return <StyledVideo src={videoPreviewURL} />;
      default:
        return <NotAllowIcon color="error" />;
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="certificationName">
          {translate('profileBio.fewFactsAboutYou')}
        </InputLabel>
        <Controller
          name="description"
          control={control}
          render={({ field }): ReactElement => (
            <FilledInput {...field} multiline maxRows={4} error={!!errors.description} />
          )}
        />
        {errors?.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
      </FormControl>

      {videoPreviewURL && (
        <MediaWrapper>
          {renderVideoPreview(video?.type)}
          <StyledIconButton onClick={onDeleteVideo} size="small" edge="start" color="inherit">
            <Close />
          </StyledIconButton>
        </MediaWrapper>
      )}

      {errors?.video && <ErrorMessage>{errors.video?.message}</ErrorMessage>}

      <StyledFormControl fullWidth variant="filled">
        {!video && (
          <Controller
            name="video"
            control={control}
            render={({ field }): ReactElement => (
              <Button
                component="label"
                variant="outlined"
                startIcon={<VideocamOutlinedIcon fontSize="large" />}
              >
                {translate('profileBio.addVideo')}
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e): void => onFileChange(e, field)}
                  hidden
                />
              </Button>
            )}
          />
        )}
      </StyledFormControl>

      <ProfileBtn
        nextText={translate('profileBio.submit')}
        backText={translate('profileQualification.back')}
        disabled={!isValid}
        onBack={onBack}
      />
    </StyledForm>
  );
}
