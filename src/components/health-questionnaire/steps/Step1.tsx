import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
} from 'src/components/health-questionnaire/styles';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { useLocales } from 'src/locales';
import { RootState } from 'src/redux/rootReducer';
import { saveNote, selectDiagnosis } from 'src/redux/slices/healthQuestionnaireSlice';

type Step1Props = {
  onNext: () => void;
  onBack: () => void;
  stepKey: string;
  diagnoses: {
    id: string;
    name: string;
  }[];
};

const Step1 = ({ onNext, onBack, stepKey, diagnoses }: Step1Props): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const selectedDiagnoses = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedDiagnoses
  );
  const savedNote = useSelector((state: RootState) => state.healthQuestionnaire.notes[stepKey]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedDiagnoses.map((diagnosis) => diagnosis)
  );
  const [note, setNote] = useState<string>(savedNote || '');

  const handleOptionSelect = (value: string): void => {
    const selectedIndex = selectedOptions.indexOf(value);
    const updatedOptions = [...selectedOptions];

    if (selectedIndex === -1) {
      updatedOptions.push(value);
    } else {
      updatedOptions.splice(selectedIndex, 1);
    }

    setSelectedOptions(updatedOptions);
    dispatch(selectDiagnosis({ diagnoses: updatedOptions }));
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
        <QuestionnaireTypeText>{translate('health_questionnaire.diagnoses')}</QuestionnaireTypeText>
        <FormGroup>
          {diagnoses.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedOptions.includes(item.id)}
                  onChange={(): void => handleOptionSelect(item.id)}
                />
              }
              label={
                <Typography
                  variant="body2"
                  fontWeight={({ typography }) => typography.fontWeightMedium}
                >
                  {translate(item.name)}
                </Typography>
              }
            />
          ))}
        </FormGroup>
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
        disabled={Boolean(!selectedOptions.length)}
        onClick={handleSubmit}
        onBack={onBack}
      />
    </div>
  );
};

export default Step1;
