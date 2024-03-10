import { Button, styled } from '@mui/material';
import { SECONDARY } from 'src/theme/colors';

export const ButtonWrapper = styled('div')`
  border-top: 1px solid ${SECONDARY.light_gray};
  padding: 16px 0 0;
  margin-top: auto;
`;

export const NextButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;
