import { Button, Typography, styled } from '@mui/material';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Wrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: clamp(250px, 80%, 500px);
  }
`;

export const StyledForm = styled('form')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 102px;
  padding: 102px 0 0;
`;

export const InputWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled('div')`
  border-top: 1px solid var(--divider, rgba(0, 0, 0, 0.12));
  padding: 16px 0 0;
  margin-top: auto;
`;

export const NextButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;
