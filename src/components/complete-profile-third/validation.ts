import * as yup from 'yup';

export const servicesSchema = yup
  .object()
  .shape({
    PersonalCareAssistance: yup.boolean(),
    MedicationManagement: yup.boolean(),
    MobilitySupport: yup.boolean(),
    MealPreparation: yup.boolean(),
    HousekeepingAndLaundry: yup.boolean(),
    SocialAndRecreationalActivities: yup.boolean(),
  })
  .test('at-least-one-checked', '', (values) => {
    const {
      PersonalCareAssistance,
      MedicationManagement,
      MobilitySupport,
      MealPreparation,
      HousekeepingAndLaundry,
      SocialAndRecreationalActivities,
    } = values;

    return (
      PersonalCareAssistance ||
      MedicationManagement ||
      MobilitySupport ||
      MealPreparation ||
      HousekeepingAndLaundry ||
      SocialAndRecreationalActivities
    );
  });
