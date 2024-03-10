import { Drawer, ListItem, styled } from '@mui/material';

import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

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

export const AppointmentModalFooter = styled(AppointmentModalBlock)`
  margin-top: auto;
`;

export const AppointmentModalBlockParagraph = styled('p')`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InlineBlock = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const AppointmentParagraph = styled('p')`
  font-size: ${TYPOGRAPHY.base}px;
  color: ${PRIMARY.main};
`;

export const NameParagraph = styled('p')`
  font-size: ${TYPOGRAPHY.base_sm}px;
  padding-left: 10px;
  padding-right: 100px;
`;

export const ListItemStyled = styled(ListItem)`
  border-bottom: 1px solid ${SECONDARY.light_gray};
  padding-bottom: 5px;
`;

export const NotificationMessage = styled('div')`
  display: flex;
  padding: 15px;
  gap: 10px;
  border-radius: 5px;
  background-color: ${PRIMARY.light_main};
  line-height: 1.4;
`;
