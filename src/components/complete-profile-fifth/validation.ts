import { AnyObject, ObjectSchema, object, number } from 'yup';
import { useLocales } from 'src/locales';
import { MAX_RATE } from 'src/components/complete-profile-fifth/constants';

export type CompleteProfileFifthValues = {
  hourlyRate: number;
};

export const useCompleteProfileFifthSchema = (): ObjectSchema<
  CompleteProfileFifthValues,
  AnyObject,
  {
    hourlyRate: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    hourlyRate: number()
      .min(1, translate('completeProfileFifth.minRateError'))
      .max(MAX_RATE, translate('completeProfileFifth.maxRateError'))
      .required(translate('completeProfileFifth.rateRequired')),
  });
};
