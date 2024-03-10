import { Button, FormControl, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const StyledFormTitle = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const StyledButton = styled(Button)`
  height: 36px;
  font-weight: ${typography.fontWeightRegular};
  font-size: ${TYPOGRAPHY.base_xs}px;
`;

export const StyledLastSave = styled(Typography)`
  font-weight: ${typography.fontWeightSemiBold};
`;

export const StyledFormControl = styled(FormControl)`
  margin-bottom: 18px;
  display: flex;
`;

export const StyledSaveButton = styled(StyledButton)`
  margin-top: 0;
`;

export const StyledDiscardButton = styled(Button)`
  height: 36px;
`;
