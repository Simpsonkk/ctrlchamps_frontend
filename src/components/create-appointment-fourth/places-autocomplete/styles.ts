import { Grid, Typography, styled } from '@mui/material';
import { PRIMARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const StyledGrid = styled(Grid)`
  width: 100%;
  word-wrap: break-word;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
`;

export const LocationMessage = styled(Typography)`
  background-color: ${PRIMARY.light_main};
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${PRIMARY.black};
  font-weight: ${typography.fontWeightMedium};
  font-size: ${TYPOGRAPHY.base_xs}px;
  padding: 8px 16px;
  line-height: 1.5;
  border-radius: 4px;
  svg {
    width: 24px;
    height: 24px;
  }
`;
