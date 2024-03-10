import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GetHelpModal from 'src/components/get-help-modal/GetHelpModal';
import Modal from 'src/components/reusable/modal/Modal';
import { TRANSACTION_EXAMPLE, USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import { useUpdateBalanceMutation } from 'src/redux/api/transactionsApi';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import { removeToken } from 'src/redux/slices/tokenSlice';
import { removeUser } from 'src/redux/slices/userSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';
import {
  Arrow,
  BalanceAmount,
  BalanceBlock,
  BalanceParagraph,
  BalanceTitle,
  HalfVisibleParagraph,
  MenuItemStyled,
  MenuListItem,
  OperationButton,
  StyledButton,
  StyledMenu,
} from './styles';

interface MenuDropdownProps {
  children: React.ReactNode;
  anchorEl?: HTMLElement | null;
  setAnchorEl?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  children,
  anchorEl,
  setAnchorEl,
}): JSX.Element | null => {
  const router = useRouter();
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const [updateBalance, { isLoading }] = useUpdateBalanceMutation();

  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const user = useTypedSelector((state) => state.user.user);
  const { data: userInfo, refetch } = useGetUserInfoQuery(user?.id);

  const [balance, setBalance] = useState<number>(userInfo?.balance || 0);

  const open = Boolean(anchorEl);

  useEffect(() => {
    refetch();
    setBalance(userInfo?.balance || 0);
  }, [refetch, userInfo?.balance]);

  if (!user || !userInfo) return null;

  const { role } = user;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (setAnchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = (): void => {
    if (setAnchorEl) {
      setAnchorEl(null);
    }
  };

  const handleLogOut = (): void => {
    try {
      dispatch(removeToken());
      dispatch(removeUser());
      handleClose();
      router.push(ROUTES.login);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleWithdraw = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    amount: number
  ): Promise<void> => {
    e.stopPropagation();
    try {
      if (userInfo && !isLoading) {
        const newBalance = userInfo.balance - amount;
        setBalance(newBalance);
        handleClose();
        await updateBalance(newBalance);
        refetch();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleTopUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    amount: number
  ): Promise<void> => {
    e.stopPropagation();
    try {
      if (userInfo && !isLoading) {
        const newBalance = userInfo.balance + amount;
        setBalance(newBalance);
        handleClose();
        await updateBalance(newBalance)
          .unwrap()
          .then(() => dispatch(appointmentApi.util.invalidateTags(['Appointments'])));
        refetch();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <StyledButton onClick={handleClick}>
        <Arrow className={open ? 'active' : ''}>{children}</Arrow>
      </StyledButton>
      <StyledMenu
        onClick={(e): void => e.preventDefault()}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <BalanceBlock>
          <BalanceTitle>{translate('menu.balance')}</BalanceTitle>
          <BalanceParagraph>
            <BalanceAmount>
              <HalfVisibleParagraph>$ </HalfVisibleParagraph>
              {balance}
            </BalanceAmount>
            {role === USER_ROLE.Caregiver ? (
              <OperationButton
                variant="contained"
                onClick={(e): Promise<void> => handleWithdraw(e, TRANSACTION_EXAMPLE)}
                disabled={balance < TRANSACTION_EXAMPLE || isLoading}
              >
                {translate('menu.withdraw')}
              </OperationButton>
            ) : (
              <OperationButton
                variant="contained"
                onClick={(e): Promise<void> => handleTopUp(e, TRANSACTION_EXAMPLE)}
                disabled={isLoading}
              >
                {translate('menu.top_up')}
              </OperationButton>
            )}
          </BalanceParagraph>
        </BalanceBlock>
        <MenuItemStyled onClick={handleClose}>
          <ReceiptLongOutlinedIcon />
          <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.transactions)}>
            <div>{translate('menu.transactions')}</div>
            <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <PersonOutlinedIcon />
          <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.account_details)}>
            <div>{translate('menu.acc_details')}</div> <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        {role === USER_ROLE.Caregiver && (
          <MenuItemStyled onClick={handleClose}>
            <SupportAgentOutlinedIcon />
            <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.caregiver_profile)}>
              <div>{translate('menu.caregiver_profile')}</div> <ChevronRightOutlinedIcon />
            </MenuListItem>
          </MenuItemStyled>
        )}
        <MenuItemStyled onClick={handleClose}>
          <InfoOutlinedIcon />
          <MenuListItem onClick={(): Promise<boolean> => router.push(ROUTES.faq)}>
            <div>{translate('menu.faq')}</div> <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <FavoriteBorderOutlinedIcon />
          <MenuListItem onClick={(): void => setIsHelpModalOpen(true)}>
            <div>{translate('menu.get_help')}</div> <ChevronRightOutlinedIcon />
          </MenuListItem>
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <FavoriteBorderOutlinedIcon sx={{ visibility: 'hidden' }} />
          <MenuListItem onClick={handleLogOut}>
            <div>{translate('menu.log_out')} </div> <LogoutOutlinedIcon color="error" />
          </MenuListItem>
        </MenuItemStyled>
      </StyledMenu>
      <Modal
        title={translate('needHelpModal.title')}
        onClose={(): void => setIsHelpModalOpen(false)}
        isActive={isHelpModalOpen}
      >
        <GetHelpModal />
      </Modal>
    </>
  );
};

export default MenuDropdown;
