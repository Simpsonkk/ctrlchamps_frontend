import { Button, styled } from '@mui/material';
import { SECONDARY } from 'src/theme/colors';

interface ButtonWrapperProps {
  noPadding?: boolean;
}

export const ButtonWrapper = styled('div')(({ noPadding }: ButtonWrapperProps) => ({
  borderTop: noPadding ? 'none' : `1px solid ${SECONDARY.light_gray}`,
  padding: noPadding ? 0 : '16px',
  marginTop: 'auto',
  width: '100%',
}));

export const NextButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;
