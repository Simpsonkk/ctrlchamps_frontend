import { Typography, styled } from '@mui/material';
import { TYPOGRAPHY } from 'src/theme/fonts';

const Container = styled('div')`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 80px;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 0;
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: 500;
`;

const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
`;

export { Container, StyledForm, ErrorMessage };
