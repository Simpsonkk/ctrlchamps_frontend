import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DATE_FORMAT } from 'src/constants';
import { useLocales } from 'src/locales';
import { SelectContainer } from './styles';

type AppointmentProps = {
  selectTimeOptions: string[];
  startTime: string;
  endTime: string;
  date: Date | null;
  chooseStartTime: (value: string) => void;
  chooseEndTime: (value: string) => void;
  chooseDate: (value: Date | null) => void;
};

export default function Appointment({
  selectTimeOptions,
  startTime,
  endTime,
  date,
  chooseStartTime,
  chooseEndTime,
  chooseDate,
}: AppointmentProps): JSX.Element {
  const { translate } = useLocales();

  return (
    <>
      <SelectContainer>
        <FormControl fullWidth variant="standard">
          <InputLabel>{translate('create_appointment.start_time')}</InputLabel>
          <Select value={startTime} onChange={(e): void => chooseStartTime(e.target.value)}>
            {selectTimeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel>{translate('create_appointment.end_time')}</InputLabel>
          <Select value={endTime} onChange={(e): void => chooseEndTime(e.target.value)}>
            {selectTimeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </SelectContainer>
      <DatePicker
        label={translate('date')}
        minDate={new Date()}
        value={date}
        inputFormat={DATE_FORMAT}
        disablePast
        onChange={(newValue): void => {
          chooseDate(newValue);
        }}
        renderInput={(props) => (
          <TextField
            autoComplete="off"
            InputProps={{ readOnly: true }}
            variant="standard"
            {...props}
            helperText={null}
          />
        )}
      />
    </>
  );
}
