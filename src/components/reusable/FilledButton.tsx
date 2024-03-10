import { Button, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';

export const FilledButton = styled(Button)(() => ({
  backgroundColor: PRIMARY.main,
  color: PRIMARY.white,
  textTransform: 'capitalize',
  '&:hover': { backgroundColor: PRIMARY.dark_main },
  '&:disabled': { backgroundColor: SECONDARY.light_gray },
}));
