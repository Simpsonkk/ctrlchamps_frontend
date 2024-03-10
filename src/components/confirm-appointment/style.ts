import { Button, ListItemButton, styled } from '@mui/material';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

const PageBackground = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: calc(100vh - ${HEADER.FLOW_HEIGHT}px);
  display: flex;
  justify-content: center;
`;

const Container = styled('div')`
  margin: 24px 0;
  height: fit-content;
  box-shadow: 0px 1px 16px 0px ${SECONDARY.gray_shadow};

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: clamp(280px, 90%, 500px);
  }
`;

const InnerContainer = styled('div')`
  width: 560px;
  background: ${PRIMARY.white};
  border-radius: 4px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const Typography = styled('p')`
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  color: ${SECONDARY.md_gray};
  text-transform: capitalize;
`;

const Name = styled('span')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
`;

const LinkToProfile = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  cursor: pointer;
`;

const Header = styled('div')`
  padding: 16px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

const TasksWrapper = styled('div')`
  padding: 16px;
`;

const Task = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: ${TYPOGRAPHY.base_sm}px;
  font-weight: ${typography.fontWeightMedium};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${SECONDARY.light_gray};
  }
`;

const BackDrop = styled('div')`
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

const ModalWrapper = styled('div')`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 4px 16px 0px ${SECONDARY.backdrop_background};

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: clamp(280px, 90%, 500px);
  }
`;

const ModalHeader = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

const CloseButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 12px;
  cursor: pointer;
`;

const HeaderTitle = styled(Typography)`
  font-size: ${TYPOGRAPHY.sm}px;
  color: ${PRIMARY.black};
`;

const StyledListItemButton = styled(ListItemButton)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

const ButtonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 15px;
`;

const Title = styled(Typography)`
  font-weight: ${typography.fontWeightMedium};
  color: ${SECONDARY.md_gray};
  margin-bottom: 20px;
  max-width: 405px;
`;

const SubTitle = styled(Title)`
  font-size: ${TYPOGRAPHY.xss}px;
  margin-bottom: -10px;
  padding: 0;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  height: 40px;
  margin: 0 auto;
`;

const CustomTasksContainer = styled('div')`
  padding: 16px;
  margin: 16px 0;
  background: ${PRIMARY.white};
  border-top: 1px solid ${SECONDARY.light_gray};
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TasksContainer = styled('div')`
  padding: 16px;
  border-top: 1px solid ${SECONDARY.light_gray};
`;

const ConfirmModalContainer = styled('div')`
  display: flex;
  background: ${PRIMARY.white};
  flex-direction: column;
  width: 560px;
  max-height: 400px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    background: ${SECONDARY.light_gray};
  }

  &::-webkit-scrollbar-thumb {
    background: ${SECONDARY.gray_shadow};
    border-radius: 5px;
  }

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const Background = styled('div')`
  background: rgba(8, 188, 184, 0.04);
`;

const BtnContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EditButton = styled(Button)`
  &:hover {
    background: none;
  }
`;

const TasksBtns = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid ${SECONDARY.light_gray};
`;

const ModalContainer = styled('div')`
  width: 480px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const ModalContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChargeMessage = styled('p')`
  background-color: ${PRIMARY.light_main};
  display: flex;
  gap: 10px;
  color: ${PRIMARY.black};
  font-weight: ${typography.fontWeightMedium};
  font-size: ${TYPOGRAPHY.base_xs}px;
  padding: 16px;
  line-height: 1.5;
  border-radius: 4px;
  svg {
    margin-top: 5px;
    min-width: 24px;
    height: 16px;
  }
`;

const IconWrapper = styled('div')`
  cursor: pointer;
`;

export {
  BackDrop,
  Background,
  BtnContainer,
  ButtonWrapper,
  ChargeMessage,
  CloseButton,
  ConfirmModalContainer,
  Container,
  CustomTasksContainer,
  EditButton,
  Header,
  HeaderTitle,
  IconWrapper,
  InnerContainer,
  LinkToProfile,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalWrapper,
  Name,
  PageBackground,
  StyledButton,
  StyledForm,
  StyledListItemButton,
  SubTitle,
  Task,
  TasksBtns,
  TasksContainer,
  TasksWrapper,
  TextContainer,
  Typography,
};
