import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, array, object } from 'yup';

export type ActivityLogModalFormValues = {
  tasks: string[];
};

export const useActivityLogModalSchema = (): ObjectSchema<
  ActivityLogModalFormValues,
  AnyObject,
  {
    tasks: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    tasks: array().required().min(1, translate('appointments_page.activityLogModal.tasksRequired')),
  });
};
