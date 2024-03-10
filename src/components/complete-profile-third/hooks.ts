import { useUpdateProfileMutation } from 'src/redux/api/profileCompleteApi';
import { SPLIT_SEPARATOR, JOIN_SEPARATOR } from 'src/components/complete-profile-third/constants';
import { ReturnType } from 'src/components/complete-profile-third/types';

interface Data {
  [key: string]: boolean;
}

export function useCompleteProfileThird(onNext: () => void): ReturnType {
  const [updateServices] = useUpdateProfileMutation();

  const onUpdateServices = async (data: Data): Promise<void> => {
    const resultArray: string[] = [];
    const trueKeys = Object.keys(data).filter((elem) => data[elem] === true);
    trueKeys.forEach((element) => {
      const newElement = element.split(SPLIT_SEPARATOR).join(JOIN_SEPARATOR);
      resultArray.push(newElement);
    });

    try {
      await updateServices({
        updateProfileDto: { services: resultArray },
      })
        .unwrap()
        .then(() => onNext());
    } catch (error) {
      throw new Error(error);
    }
  };

  return { onUpdateServices };
}
