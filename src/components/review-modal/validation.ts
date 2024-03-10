import { ObjectSchema, number, object, string } from 'yup';

import { useLocales } from 'src/locales';
import { MAX_REVIEW_LENGTH } from 'src/components/review-modal/constants';

export type ReviewFormValues = {
  rating: number | null;
  review?: string;
};

export const useReviewSchema = (): ObjectSchema<ReviewFormValues> => {
  const { translate } = useLocales();

  return object({
    rating: number().required(),
    review: string()
      .trim()
      .max(MAX_REVIEW_LENGTH, translate('caregiverReview.reviewMaxLengthError')),
  });
};
