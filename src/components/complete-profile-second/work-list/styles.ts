import { Button, ListItemButton, Typography, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const StyledListItemButton = styled(ListItemButton)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const ButtonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 15px;
`;

export const Title = styled(Typography)`
  font-weight: ${typography.fontWeightMedium};
  color: ${SECONDARY.md_gray};
  margin-bottom: 20px;
  max-width: 400px;
`;

export const SubTitle = styled(Title)`
  font-size: ${TYPOGRAPHY.xss}px;
  margin-bottom: -10px;
  padding: 0;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  height: 40px;
  margin: 0 auto;
`;
