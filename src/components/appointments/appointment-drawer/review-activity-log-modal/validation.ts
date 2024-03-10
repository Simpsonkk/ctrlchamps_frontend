import { MAX_CHARACTERS_LENGTH } from 'src/constants';
import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, object, string } from 'yup';

export type RejectReviewActivityLogModalFormValues = {
  reason: string;
};

export const useRejectReviewActivityLogModalSchema = (): ObjectSchema<
  RejectReviewActivityLogModalFormValues,
  AnyObject,
  {
    reason: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    reason: string()
      .trim()
      .required(translate('appointments_page.rejectReviewActivityLogModal.reasonRequired'))
      .min(1, translate('appointments_page.rejectReviewActivityLogModal.reasonRequired'))
      .max(
        MAX_CHARACTERS_LENGTH,
        translate('appointments_page.rejectReviewActivityLogModal.reasonMaxLength')
      ),
  });
};
