import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'src/components/reusable/modal/Modal';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import {
  ButtonWrapper,
  CaregiverInfo,
  CaregiverName,
  ErrorMessage,
  RatingWrapper,
  StyledFormControl,
  StyledRating,
  StyledButton,
  SubTitle,
  UserRole,
  StyledForm,
} from 'src/components/review-modal/styles';
import { SMALL_AVATAR_SIZE } from 'src/constants';
import { useLocales } from 'src/locales';
import { SECONDARY } from 'src/theme/colors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReviewFormValues, useReviewSchema } from 'src/components/review-modal/validation';
import { DEFAULT_REVIEW_VALUES } from 'src/components/review-modal/constants';
import { useCreateReviewMutation } from 'src/redux/api/reviewsApi';

type Props = {
  isReviewCaregiverModalActive: boolean;
  setIsReviewCaregiverModalActive: Dispatch<SetStateAction<boolean>>;
  caregiverId: string;
  caregiverInfoId: string;
  caregiverName: string;
  refetchCaregiverInfo: () => void;
};

export default function ReviewModal({
  isReviewCaregiverModalActive,
  setIsReviewCaregiverModalActive,
  caregiverId,
  caregiverInfoId,
  caregiverName,
  refetchCaregiverInfo,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const [createReview] = useCreateReviewMutation();

  const reviewSchema = useReviewSchema();

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<ReviewFormValues>({
    resolver: yupResolver(reviewSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_REVIEW_VALUES,
  });

  const { name, ref } = register('rating');

  const handleReviewCaregiverModal = (): void => {
    reset();
    setIsReviewCaregiverModalActive(!isReviewCaregiverModalActive);
  };

  const handleRatingChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ): void => {
    setValue(name, value);
    trigger(name);
  };

  const onSubmit: SubmitHandler<ReviewFormValues> = async (review) => {
    try {
      await createReview({ caregiverInfoId, ...review }).unwrap();
      handleReviewCaregiverModal();
      refetchCaregiverInfo();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Modal
      title={translate('caregiverReview.title')}
      isActive={isReviewCaregiverModalActive}
      onClose={handleReviewCaregiverModal}
      backgroundColor={SECONDARY.drawer_background}
    >
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <CaregiverInfo>
          <UserRole>Caregiver</UserRole>
          <Stack direction="row" alignItems="center">
            <UserAvatar userId={caregiverId} size={SMALL_AVATAR_SIZE} />
            <CaregiverName>{caregiverName}</CaregiverName>
          </Stack>
        </CaregiverInfo>

        <SubTitle>{translate('caregiverReview.rate')}</SubTitle>
        <RatingWrapper>
          <StyledRating name={name} onChange={handleRatingChange} ref={ref} size="large" />
        </RatingWrapper>

        <SubTitle>{translate('caregiverReview.shareExperience')}</SubTitle>
        <StyledFormControl variant="filled">
          <TextField
            {...register('review')}
            label={translate('caregiverReview.reviewPlaceholder')}
            error={!!errors.review}
            variant="standard"
            fullWidth
            size="small"
            type="text"
          />
        </StyledFormControl>

        {errors?.review && <ErrorMessage variant="caption">{errors.review?.message}</ErrorMessage>}

        <ButtonWrapper>
          <StyledButton disabled={!isValid} variant="contained" type="submit">
            {translate('caregiverReview.leaveReview')}
          </StyledButton>
        </ButtonWrapper>
      </StyledForm>
    </Modal>
  );
}
