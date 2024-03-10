import React from 'react';
import { Box } from '@mui/material';
import { ButtonWrapper, NextButton } from './styles';

type Props = {
  noPadding?: boolean;
  nextText: string;
  backText: string;
  disabled?: boolean;
  onClick?: () => void;
  onBack?: () => void;
};

export default function AppointmentBtn({
  nextText,
  backText,
  disabled,
  onClick,
  onBack,
  noPadding,
}: Props): JSX.Element {
  return (
    <ButtonWrapper noPadding={noPadding}>
      <Box display="flex" gap={1}>
        <NextButton variant="outlined" onClick={onBack}>
          {backText}
        </NextButton>
        <NextButton onClick={onClick} variant="contained" type="submit" disabled={disabled}>
          {nextText}
        </NextButton>
      </Box>
    </ButtonWrapper>
  );
}
