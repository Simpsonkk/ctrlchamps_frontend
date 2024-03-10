import { Button, IconButton, Typography, styled } from '@mui/material';
import { PRIMARY, SECONDARY, TEXT_COLOR } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const DrawerBody = styled('div')`
  display: flex;
  gap: 16px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  background-color: ${SECONDARY.drawer_background};
  width: 360px;
  padding: 16px 0;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;

export const Block = styled('div')`
  border-top: 1px solid ${SECONDARY.light_gray};
  border-bottom: 1px solid ${SECONDARY.light_gray};
  background: ${PRIMARY.white};
  padding: 16px;
`;

export const AppointmentName = styled('h3')`
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.6;
  letter-spacing: 0.15px;
  margin-bottom: 8px;
`;

export const SubTitle = styled('p')`
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.43;
  letter-spacing: 0.17px;
  margin-bottom: 8px;
`;

export const CaregiverBlock = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const CaregiverName = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.2;
  letter-spacing: 0.15px;
`;

export const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

export const DateText = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const TaskList = styled('ul')`
  display: flex;
  flex-direction: column;
`;

export const Task = styled('li')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.6;
  letter-spacing: 0.15px;
  padding: 4px 0;
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

export const CancelBtn = styled(Button)`
  border-radius: 4px;
  width: 100%;
  color: ${TEXT_COLOR.error};
  border-color: ${TEXT_COLOR.error};

  &:hover {
    background-color: ${SECONDARY.error_hover};
    border: 1px solid ${TEXT_COLOR.error};
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;

export const DoubleButtonBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const AcceptRejectButtonsBox = styled('div')`
  display: flex;
  width: 100%;
  gap: 16px;
`;

export const StyledLabel = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const ModalFooter = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ActivityLogBlock = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DisabledText = styled(Typography)`
  font-size: ${TYPOGRAPHY.base_xs}px;
  font-weight: ${typography.fontWeightMedium};
  color: ${TEXT_COLOR.disabled};
  display: flex;
  align-items: center;
  gap: 8px;
`;
