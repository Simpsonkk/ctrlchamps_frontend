import styled from '@emotion/styled';
import { Button, Menu, MenuItem } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import Link from 'next/link';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

const Header = styled.header`
  padding: 20px 25px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${PRIMARY.white};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Text = styled.p`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  text-transform: capitalize;
`;

const Icon = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const LogOutButton = styled(Button)`
  padding: 0;
  font-size: ${TYPOGRAPHY.base}px;
  text-decoration: underline;
`;

const MainHeaderWrapper = muiStyled('header')`
  position: absolute;
  width: 100%;
  background-color: ${PRIMARY.white};
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY.gray_shadow};
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    padding: 0 25px;
    justify-content: space-evenly;
  }
`;

const LogoSection = muiStyled('div')`
  display: flex;
  align-items: center;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    gap: 15px;
  }
`;

const LogoName = styled.p`
  color: ${PRIMARY.navy};
  font-size: ${TYPOGRAPHY.base_sm}px;
  font-weight: ${typography.fontWeightMedium};
`;

const AppointmentsText = muiStyled('p')`
  color: ${PRIMARY.navy};
  text-align: center;
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  margin: 0 12px;
  cursor: pointer;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    display: none;
  }
`;

const AppointmentsSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px 0;
  border-bottom: 3px solid transparent;
  &.active_tab {
    border-bottom: 3px solid ${PRIMARY.navy};
  }
`;

const ChatSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 5px;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  &.active_tab {
    border-bottom: 3px solid ${SECONDARY.semi_gray};
  }
`;

const ChatText = styled.p`
  color: ${SECONDARY.semi_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  cursor: pointer;
`;

const Logo = muiStyled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 2px;
  margin-right: 24px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    margin-right: 5px;
  }
`;

const FirstPart = styled.p`
  background: ${PRIMARY.navy};
  color: ${PRIMARY.white};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  padding: 5px 2px;
`;

const SecondPart = styled.p`
  color: ${PRIMARY.navy};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
`;

const MenuSection = muiStyled('div')`
  display: flex;
  align-items: center;
  gap: 20px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    gap: 0;
  }
`;

const ProfileSection = muiStyled('div')`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    margin-left: 10px;
  }
`;

const ProfileName = muiStyled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  margin-left: 16px;
  margin-right: 10px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    display: none;
  }
  cursor: pointer;
`;

const AvatarWrapper = muiStyled('div')`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  margin-right: 16px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    margin-right: 0;
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
  padding: 12.5px 10px;
  border-bottom: 3px solid transparent;
  &:hover {
    color: ${PRIMARY.dark_main};
  }

  &.active {
    color: ${PRIMARY.navy};
    border-bottom: 3px solid ${PRIMARY.navy};
  }
`;

const Arrow = styled.div`
  width: 24px;
  height: 24px;
  color: ${SECONDARY.semi_gray};
  &.active {
    transform: rotate(180deg);
  }
`;

const StyledMenu = styled(Menu)`
  width: 300px;
  margin-top: 15px;
`;

const HalfVisibleParagraph = styled.div`
  opacity: 0.7;
`;

const BalanceBlock = styled.div`
  background: ${PRIMARY.main};
  border-radius: 5px;
  margin: 10px;
  padding: 10px 15px;
  color: ${PRIMARY.white};
`;

const BalanceTitle = styled.div`
  font-size: ${TYPOGRAPHY.xs}px;
`;

const BalanceAmount = styled.div`
  font-size: ${TYPOGRAPHY.md}px;
  font-weight: ${typography.fontWeightMedium};
  display: flex;
`;

const BalanceParagraph = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OperationButton = styled(Button)`
  background: ${PRIMARY.white};
  color: ${PRIMARY.main};

  &:hover {
    background: ${PRIMARY.white};
    color: ${PRIMARY.main};
  }
  &:disabled {
    background: ${PRIMARY.white};
    color: ${SECONDARY.semi_gray};
  }
`;

const MenuItemStyled = styled(MenuItem)`
  border-top: 1px solid ${SECONDARY.light_gray};
  margin: 0 10px;
  padding: 10px 0;
  font-weight: ${typography.fontWeightMedium};
`;

const MenuListItem = styled.div`
  display: flex;
  width: 250px;
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = muiStyled(Button)`
  padding: 15px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    min-width: 0;
  }
`;

export {
  AppointmentsSection,
  AppointmentsText,
  Arrow,
  AvatarWrapper,
  BalanceAmount,
  BalanceBlock,
  BalanceParagraph,
  BalanceTitle,
  ButtonContainer,
  ChatSection,
  ChatText,
  Container,
  FirstPart,
  HalfVisibleParagraph,
  Header,
  Icon,
  IconWrapper,
  InfoButton,
  LogOutButton,
  Logo,
  LogoName,
  LogoSection,
  MainHeaderWrapper,
  MenuItemStyled,
  MenuListItem,
  MenuSection,
  OperationButton,
  ProfileName,
  ProfileSection,
  SecondPart,
  StyledButton,
  StyledMenu,
  Text,
};
