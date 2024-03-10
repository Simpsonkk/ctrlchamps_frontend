import { ObjectSchema, boolean, date, object, string } from 'yup';
import { isBefore, isValid, parse, isAfter, isToday } from 'date-fns';

import { ProfileQualityFormValues } from 'src/components/profile/profile-qualification/types';
import {
  CURRENT_DAY,
  DATE_FORMAT,
  MAX_CHARACTERS_LENGTH,
  ONE_DAY,
  URL_PATTERN,
} from 'src/constants';
import { useLocales } from 'src/locales';

export const useProfileQualificationSchema = (): ObjectSchema<ProfileQualityFormValues> => {
  const { translate } = useLocales();

  return object({
    name: string()
      .trim()
      .required(translate('profileQualification.certificationNameRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationNameMaxLength')),
    certificateId: string()
      .trim()
      .required(translate('profileQualification.certificationNumberRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationNumberMaxLength')),
    link: string()
      .trim()
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationLinkMaxLength'))
      .test(
        'is-url-valid',
        translate('profileQualification.certificationLinkInvalidUrl'),
        (value) => {
          if (!value) return true;

          return URL_PATTERN.test(value);
        }
      ),
    dateIssued: date()
      .required(translate('profileQualification.startDateRequired'))
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string') {
          const parsedDate = parse(originalValue, DATE_FORMAT, CURRENT_DAY);

          return isValid(parsedDate);
        }

        return value;
      })
      .typeError(translate('profileQualification.invalidDateFormat'))
      .test(
        'is-future-date',
        translate('profileQualification.startDateCannotBeInFuture'),
        (value) => !isAfter(value, CURRENT_DAY)
      ),
    isExpirationDateDisabled: boolean().required(),
    expirationDate: date().when('isExpirationDateDisabled', {
      is: false,
      then: (schema) =>
        schema
          .required(translate('profileQualification.expirationDateRequired'))
          .test(
            'is-after-dateIssued',
            translate('profileQualification.expirationDateCannotBeBeforeStartDate'),
            (value, context) => {
              const { dateIssued } = context.parent;

              return !dateIssued || isBefore(dateIssued - ONE_DAY, value);
            }
          )
          .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
              const parsedDate = parse(originalValue, DATE_FORMAT, CURRENT_DAY);

              return isValid(parsedDate);
            }

            return value;
          })
          .typeError(translate('profileQualification.invalidDateFormat'))
          .test(
            'is-after-yesterday',
            translate('profileQualification.expirationDateCannotBeBeforeToday'),
            (value) => isToday(value) || isAfter(value, CURRENT_DAY)
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
  }) as ObjectSchema<ProfileQualityFormValues>;
};
