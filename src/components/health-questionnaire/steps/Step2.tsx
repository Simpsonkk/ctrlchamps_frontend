import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OPTIONS } from 'src/components/health-questionnaire/constants';
import SecondStepItem from 'src/components/health-questionnaire/steps/SecondStepItem';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
} from 'src/components/health-questionnaire/styles';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { useLocales } from 'src/locales';
import { RootState } from 'src/redux/rootReducer';
import { saveNote } from 'src/redux/slices/healthQuestionnaireSlice';

type Step2Props = {
  onNext: () => void;
  onBack: () => void;
  stepKey: string;
  activities: {
    id: string;
    name: string;
  }[];
};

const Step2 = ({ onNext, onBack, stepKey, activities }: Step2Props): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const savedNote = useSelector((state: RootState) => state.healthQuestionnaire.notes[stepKey]);
  const [questionsCompleted, setQuestionsCompleted] = useState<boolean>(false);
  const [note, setNote] = useState<string>(savedNote || '');

  const handleCompletion = (status: boolean): void => {
    setQuestionsCompleted(status);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedNote = event.target.value;
    setNote(updatedNote);
    dispatch(saveNote({ step: stepKey, note: updatedNote }));
  };

  const handleSubmit = (): void => {
    onNext();
  };

  return (
    <div>
      <QuestionnaireContainerContent>
        <QuestionnaireTypeText>{translate('health_questionnaire.activity')}</QuestionnaireTypeText>
        <SecondStepItem questions={activities} options={OPTIONS} onCompletion={handleCompletion} />
        <TextField
          fullWidth
          id="standard-basic"
          label={translate('health_questionnaire.note')}
          variant="standard"
          size="small"
          value={note}
          placeholder={String(translate('health_questionnaire.note_placeholder'))}
          onChange={handleNoteChange}
        />
      </QuestionnaireContainerContent>
      <AppointmentBtn
        nextText={translate('btn_next')}
        backText={translate('profileQualification.back')}
        disabled={!questionsCompleted}
        onClick={handleSubmit}
        onBack={onBack}
      />
    </div>
  );
};

export default Step2;
