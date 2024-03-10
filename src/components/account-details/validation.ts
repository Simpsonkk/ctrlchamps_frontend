import { ObjectSchema, mixed, object } from 'yup';

import { useLocales } from 'src/locales';
import { ALLOWED_PHOTO_FORMATS, MAX_FILE_SIZE_BYTES } from './constants';
import { AvatarValues } from './types';

export const useAvatarSchema = (): ObjectSchema<AvatarValues> => {
  const { translate } = useLocales();

  return object({
    avatar: mixed<File>()
      .test(
        'fileFormat',
        translate('accountDetails.fileFormatError'),
        (value) => !value || (value instanceof File && ALLOWED_PHOTO_FORMATS.includes(value.type))
      )
      .test(
        'fileSize',
        translate('accountDetails.fileSizeError'),
        (value) => !value || (value instanceof File && value.size <= MAX_FILE_SIZE_BYTES)
      ),
  });
};
