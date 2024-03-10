import { Button, styled } from '@mui/material';
import { ErrorText } from 'src/components/reusable';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  margin-top: 10px;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 40px;
  border-radius: 6px;
`;

const ErrorMessage = styled(ErrorText)`
  margin-top: 5px;
`;

export { Container, StyledForm, StyledButton, ErrorMessage };
