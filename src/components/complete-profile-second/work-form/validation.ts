import { ObjectSchema, boolean, date, object, string } from 'yup';
import { MAX_CHARACTERS_LENGTH, CURRENT_DAY, DATE_FORMAT, ONE_DAY } from 'src/constants';
import { useLocales } from 'src/locales';
import { CompleteProfileSecondValues } from 'src/components/complete-profile-second/types';
import { isAfter, isBefore, isValid, parse } from 'date-fns';

export const useProfileExperienceSchema = (): ObjectSchema<CompleteProfileSecondValues> => {
  const { translate } = useLocales();

  return object({
    workplace: string()
      .trim()
      .required(translate('completeProfileSecond.errors.workPlaceRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('completeProfileSecond.errors.workPlaceLength')),
    qualifications: string()
      .trim()
      .required(translate('completeProfileSecond.errors.workTypeRequired')),
    startDate: date()
      .required(translate('completeProfileSecond.errors.startDateRequired'))
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string') {
          const parsedDate = parse(originalValue, DATE_FORMAT, CURRENT_DAY);

          return isValid(parsedDate);
        }

        return value;
      })
      .typeError(translate('completeProfileSecond.errors.invalidDateFormat'))
      .test(
        'is-future-date',
        translate('completeProfileSecond.errors.startDateMax'),
        (value) => !isAfter(value, CURRENT_DAY)
      ),

    isEndDateDisabled: boolean().required(),
    endDate: date().when('isEndDateDisabled', {
      is: false,
      then: (schema) =>
        schema
          .required(translate('completeProfileSecond.errors.endDateRequired'))
          .test(
            'is-after-startDate',
            translate('completeProfileSecond.errors.endDateCannotBeBeforeStartDate'),
            (value, context) => {
              const { startDate } = context.parent;

              return !startDate || isBefore(startDate - ONE_DAY, value);
            }
          )
          .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
              const parsedDate = parse(originalValue, DATE_FORMAT, CURRENT_DAY);

              return isValid(parsedDate);
            }

            return value;
          })
          .typeError(translate('completeProfileSecond.errors.invalidDateFormat'))
          .max(CURRENT_DAY, translate('completeProfileSecond.errors.endDateMax')),
      otherwise: (schema) => schema.notRequired(),
    }),
  }) as ObjectSchema<CompleteProfileSecondValues>;
};
