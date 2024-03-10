import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ToggleButtonGroupStyled,
  ToggleButtonStyled,
} from 'src/components/health-questionnaire/styles';
import { useLocales } from 'src/locales';
import { RootState } from 'src/redux/rootReducer';
import { selectActivity } from 'src/redux/slices/healthQuestionnaireSlice';

type Activity = {
  id: string;
  name: string;
};

type SecondStepItemProps = {
  questions: Activity[];
  options: string[];
  onCompletion: (status: boolean) => void;
};

const SecondStepItem = ({ questions, options, onCompletion }: SecondStepItemProps): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const selectedActivities = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedActivities
  );
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(
    selectedActivities.reduce((acc: { [key: string]: string }, activity) => {
      acc[activity.id] = activity.answer;

      return acc;
    }, {})
  );

  const handleOptionSelect = (activity: Activity, option: string | null): void => {
    if (option !== null) {
      const updatedSelectedOptions = {
        ...selectedOptions,
        [activity.id]: translate(option),
      };

      setSelectedOptions(updatedSelectedOptions);

      const seekerActivities = Object.entries(updatedSelectedOptions)
        .filter(([activityId, answer]) => answer !== undefined)
        .map(([activityId, answer]) => ({
          id: activityId,
          answer,
        }));

      dispatch(selectActivity({ activities: seekerActivities }));
    }
  };

  useEffect(() => {
    const allQuestionsAnswered = questions.every((activity) => selectedOptions[activity.id]);
    onCompletion(allQuestionsAnswered);
  }, [selectedOptions, questions, onCompletion]);

  return (
    <div>
      {questions.map((activity) => (
        <div key={activity.id}>
          <Typography variant="body2" fontWeight="bold">
            {translate(activity.name)}
          </Typography>
          <ToggleButtonGroupStyled
            value={selectedOptions[activity.id] || ''}
            exclusive
            onChange={(event, option): void => handleOptionSelect(activity, option)}
          >
            {options.map((option) => (
              <ToggleButtonStyled
                key={option}
                value={String(translate(option))}
                aria-label={option}
              >
                {translate(option)}
              </ToggleButtonStyled>
            ))}
          </ToggleButtonGroupStyled>
        </div>
      ))}
    </div>
  );
};

export default SecondStepItem;
