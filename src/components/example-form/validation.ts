import { Resolver } from 'react-hook-form';

export type FormValues = {
  firstName: string;
  lastName: string;
};

const resolver: Resolver<FormValues> = async (values) => ({
  values: values.firstName ? values : {},
  errors: !values.firstName
    ? {
        firstName: {
          type: 'required',
          message: 'This is required.',
        },
        lastName: {
          type: 'required',
          message: 'This is required.',
        },
      }
    : {},
});

export { resolver };
