import { Button, Typography, styled } from '@mui/material';

export const StyledForm = styled('form')`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.15px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

export const NextButton = styled(Button)`
  border-radius: 4px;
  margin-top: auto;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: 12px;
`;
