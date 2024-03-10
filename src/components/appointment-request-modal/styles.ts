import { Button, Drawer, ListItem, ListItemText, styled } from '@mui/material';
import typography from 'src/theme/typography';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const AppointmentModal = styled(Drawer)`
  min-height: 100vh;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DrawerBody = styled('div')`
  display: flex;
  gap: 16px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  background-color: ${SECONDARY.drawer_background};
  width: 360px;
`;

export const AppointmentModalBlock = styled('div')`
  font-weight: ${typography.fontWeightMedium};
  background-color: ${PRIMARY.white};
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid ${SECONDARY.light_gray};
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

export const AppointmentModalBlockParagraph = styled('p')`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.xs}px;
`;

export const InlineBlock = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const AppointmentParagraph = styled('p')`
  font-size: ${TYPOGRAPHY.base_sm}px;
  line-height: 1.5;
`;

export const NameParagraph = styled('p')`
  font-size: ${TYPOGRAPHY.base_sm}px;
  padding-left: 10px;
  padding-right: 100px;
`;

export const HealthQuestionnaireBlock = styled('div')`
  padding-top: 10px;
`;

export const HealthQuestionnaireModal = styled('div')`
  max-width: 560px;
  overflow-y: auto;
  max-height: 500px;
  background-color: ${PRIMARY.white};
  margin: 50px auto;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 350px;
  }
`;

export const ModalBlock = styled('div')`
  padding: 0 26px 16px 26px;
`;

export const ListItemStyled = styled(ListItem)`
  border-bottom: 1px solid ${SECONDARY.light_gray};
  padding-bottom: 5px;
`;

export const ListItemTextStyled = styled(ListItemText)`
  padding-left: 10px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    word-wrap: break-word;
    width: 100%;
    padding-right: 5px;
  }
`;

export const InactiveStyledButton = styled(Button)`
  min-width: 180px;
  height: 50px;
`;
