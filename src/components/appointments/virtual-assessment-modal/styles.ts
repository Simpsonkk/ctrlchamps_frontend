import { ListItem, IconButton, styled, css } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import RightAction from 'src/assets/icons/RightAction';
import { BaseBoldText } from 'src/components/create-appointment/styles';
import { ModalHeader } from 'src/components/confirm-appointment/style';
import { BackDrop, ModalWrapper } from '../complete-appointment-modal/styles';

interface AppointmentModalBlockProps {
  offsetTop?: boolean;
}

export const ModalBackdrop = styled(BackDrop)`
  padding-top: 15px;
  background: ${SECONDARY.gray_semi_transparent};
`;

export const AppointmentModal = styled(ModalWrapper)`
  width: 400px;
`;

export const AppointmentModalHeader = styled(ModalHeader)`
  gap: 0;
`;

export const ModalBody = styled('div')`
  display: flex;
  gap: 16px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  background-color: ${SECONDARY.drawer_background};
`;

export const AppointmentModalBlock = styled('div')<AppointmentModalBlockProps>(
  ({ offsetTop }) => css`
    font-weight: ${typography.fontWeightMedium};
    background-color: ${PRIMARY.white};
    padding: 16px;
    border-top: 1px solid ${SECONDARY.light_gray};
    border-bottom: 1px solid ${SECONDARY.light_gray};
    display: flex;
    flex-direction: column;
    gap: 10px;
    &:first-of-type {
      ${offsetTop &&
      css`
        margin-top: 16px;
      `}
    }
  `
);

export const AppointmentModalBlockParagraph = styled('div')`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AppointmentModalLinkBlock = styled(AppointmentModalBlockParagraph)`
  position: relative;
`;

export const AppointmentModalFooter = styled(AppointmentModalBlock)`
  border-radius: 0 0 4px 4px;
`;

export const ArrowRight = styled(RightAction)`
  color: ${PRIMARY.main};
`;

export const InlineBlock = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const ModalBlock = styled(AppointmentModalBlock)`
  border-top: 1px solid ${SECONDARY.light_gray};
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

export const MainText = styled(BaseBoldText)`
  padding: 16px 16px 0 16px;
`;

export const AppointmentParagraph = styled('p')`
  font-size: ${TYPOGRAPHY.base}px;
  color: ${PRIMARY.main};
`;

export const NameParagraph = styled('p')`
  font-size: ${TYPOGRAPHY.base_sm}px;
  padding-left: 10px;
`;

export const ListItemStyled = styled(ListItem)`
  border-bottom: 1px solid ${SECONDARY.light_gray};
  padding-bottom: 5px;
`;

export const CopyLinkWrapper = styled('div')`
  position: absolute;
  right: -2px;
  top: 15px;
  background-color: ${PRIMARY.white};
  padding: 3px 0 3px 8px;
  cursor: pointer;
`;

export const NotificationMessage = styled('div')`
  display: flex;
  padding: 15px;
  margin-bottom: 10px;
  gap: 10px;
  border-radius: 5px;
  background-color: ${PRIMARY.light_main};
  line-height: 1.4;
`;

export const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;
