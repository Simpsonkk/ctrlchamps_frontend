import { Dispatch, SetStateAction, useState } from 'react';

import { focusNextInput } from 'src/utils/focusOnNextElement';
import { OtpContainer, TextInput } from './styles';

type Props = {
  length: number;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  setCode: Dispatch<SetStateAction<string>>;
  disallowSubmit: Dispatch<SetStateAction<boolean>>;
};

export default function OTPInput({
  length,
  error,
  setError,
  setCode,
  disallowSubmit,
}: Props): JSX.Element {
  const [otpValues, setOtpValues] = useState<Array<string>>(Array<string>(length).fill(''));

  function onChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ): void {
    const isNumber = (value: string): boolean => !Number.isNaN(Number(value));
    if (!isNumber(e.target.value)) return;

    setError(false);

    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;
    setOtpValues(newOtpValues);

    const codeLength = newOtpValues.filter((el) => el).length;
    validate(codeLength, length);

    if (codeLength === length) {
      setCode(newOtpValues.join(''));
    }

    focusNextInput(index, length);
  }

  function validate(codeLength: number, totalLength: number): void {
    if (codeLength < totalLength) {
      disallowSubmit(true);
    } else {
      disallowSubmit(false);
    }
  }

  return (
    <OtpContainer>
      {otpValues.map((_, index) => (
        <TextInput
          key={index}
          variant="standard"
          maxRows={1}
          autoComplete="off"
          value={otpValues[index]}
          error={error}
          onChange={(e): void => onChange(e, index)}
          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
          id={`${index}`}
        />
      ))}
    </OtpContainer>
  );
}
