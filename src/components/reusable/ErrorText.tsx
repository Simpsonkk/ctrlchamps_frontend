import { Typography, styled } from '@mui/material';
import { TEXT_COLOR } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const ErrorText = styled(Typography)(() => ({
  color: TEXT_COLOR.error,
  fontSize: TYPOGRAPHY.xss,
}));
