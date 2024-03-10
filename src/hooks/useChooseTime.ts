import { Dispatch, SetStateAction, useState } from 'react';
import { calculateEndTime } from 'src/utils/calculateTimeDifference';

type SetTimeAction = Dispatch<SetStateAction<string>>;
type ReturnType = {
  chooseStartTime: (value: string) => void;
  chooseEndTime: (value: string) => void;
};

export default function useChooseTime(
  selectTimeOptions: string[],
  setStartTime: SetTimeAction,
  setEndTime: SetTimeAction,
  intervalIndex: number
): ReturnType {
  const [startTimeChosen, setStartTimeChosen] = useState<boolean>(false);

  const chooseStartTime = (value: string): void => {
    const calculatedDifference = calculateEndTime(selectTimeOptions, value, intervalIndex);
    setStartTime(value);
    if (!startTimeChosen) setEndTime(selectTimeOptions[calculatedDifference]);
    setStartTimeChosen(true);
  };

  const chooseEndTime = (value: string): void => setEndTime(value);

  return { chooseStartTime, chooseEndTime };
}
