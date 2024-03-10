import { styled, Button, Avatar, IconButton } from '@mui/material';
import { SECONDARY, TEXT_COLOR, PRIMARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const BackDrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  background: ${SECONDARY.backdrop_background};
  z-index: 999;
`;

export const ModalWrapper = styled('div')`
  width: 360px;
  display: flex;
  flex-direction: column;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 4px 16px 0px ${SECONDARY.gray_shadow};
`;

export const ModalHeader = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  text-transform: capitalize;
  border-bottom: 1px solid ${SECONDARY.light_gray};
  background-color: ${PRIMARY.white};
`;

export const CloseButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 12px;
  cursor: pointer;
`;

export const HeaderTitle = styled('p')`
  font-size: ${TYPOGRAPHY.sm}px;
  color: ${PRIMARY.black};
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.6;
  letter-spacing: 0.15px;
`;

export const ModalBody = styled('div')`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 16px 0 0;
  background-color: ${SECONDARY.drawer_background};
`;

export const Block = styled('div')`
  border-top: 1px solid ${SECONDARY.light_gray};
  border-bottom: 1px solid ${SECONDARY.light_gray};
  background: ${PRIMARY.white};
  padding: 16px;
`;

export const OpenAppointmentBlock = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const OpenAppointmentText = styled('p')`
  font-weight: ${typography.fontWeightMedium};
  font-size: ${TYPOGRAPHY.base}px;
  color: ${PRIMARY.main};
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

export const DrawerAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`;

export const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

export const SubTitle = styled('p')`
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.43;
  letter-spacing: 0.17px;
  margin-bottom: 8px;
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

export const DoubleButtonBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
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
