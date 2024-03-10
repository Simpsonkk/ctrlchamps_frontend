import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DescriptionBlock,
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
} from 'src/components/health-questionnaire/styles';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { useLocales } from 'src/locales';
import { RootState } from 'src/redux/rootReducer';
import { saveNote, selectEnvChallenges } from 'src/redux/slices/healthQuestionnaireSlice';

type Step3Props = {
  onNext: () => void;
  onBack: () => void;
  stepKey: string;
  capabilities: {
    id: string;
    name: string;
  }[];
};

const Step3 = ({ onNext, onBack, stepKey, capabilities }: Step3Props): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const selectedEnvChallenges = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedEnvChallenges
  );
  const savedNote = useSelector((state: RootState) => state.healthQuestionnaire.notes[stepKey]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedEnvChallenges.map((challenge) => challenge)
  );
  const [note, setNote] = useState<string>(savedNote || '');

  const handleOptionSelect = (value: string): void => {
    const updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(value)) {
      updatedOptions.splice(updatedOptions.indexOf(value));
    } else {
      updatedOptions.push(value);
    }
    setSelectedOptions(updatedOptions);
    dispatch(selectEnvChallenges({ challenges: updatedOptions }));
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
        <DescriptionBlock>{translate('health_questionnaire.env_description')}</DescriptionBlock>
        <QuestionnaireTypeText>{translate('health_questionnaire.env')}</QuestionnaireTypeText>
        <FormGroup>
          {capabilities.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedOptions.includes(item.id)}
                  onChange={(): void => handleOptionSelect(item.id)}
                />
              }
              label={translate(item.name)}
            />
          ))}
        </FormGroup>
        <TextField
          fullWidth
          label={translate('health_questionnaire.note')}
          variant="standard"
          size="small"
          value={note}
          placeholder={String(translate('health_questionnaire.note_placeholder'))}
          onChange={handleNoteChange}
        />
      </QuestionnaireContainerContent>
      <AppointmentBtn
        nextText={translate('health_questionnaire.submit')}
        backText={translate('profileQualification.back')}
        disabled={Boolean(!selectedOptions.length)}
        onClick={handleSubmit}
        onBack={onBack}
      />
    </div>
  );
};

export default Step3;
