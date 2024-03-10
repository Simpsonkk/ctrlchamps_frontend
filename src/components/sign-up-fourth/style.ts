import { Button, Typography, styled } from '@mui/material';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const StyledForm = styled('form')`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  margin: 0 auto;
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
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
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;
