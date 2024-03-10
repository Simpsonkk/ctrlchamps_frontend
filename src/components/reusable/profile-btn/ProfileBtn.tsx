import React from 'react';
import { Box } from '@mui/material';
import { ButtonWrapper, NextButton } from './styles';

type Props = {
  nextText: string;
  backText: string;
  disabled: boolean;
  onClick?: () => void;
  onBack?: () => void;
};

export default function ProfileBtn({
  nextText,
  backText,
  disabled,
  onClick,
  onBack,
}: Props): JSX.Element {
  return (
    <ButtonWrapper>
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
