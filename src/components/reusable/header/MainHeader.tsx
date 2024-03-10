import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Badge } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AppointmentsIcon from 'src/assets/icons/AppointmentsIcon';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import { useFetchUnreadNotificationsQuery } from 'src/redux/api/notificationsApi';
import MenuDropdown from './Menu';
import {
  AppointmentsSection,
  AppointmentsText,
  AvatarWrapper,
  FirstPart,
  IconWrapper,
  Logo,
  LogoSection,
  MainHeaderWrapper,
  MenuSection,
  ProfileName,
  ProfileSection,
  SecondPart,
} from './styles';

export default function MainHeader(): JSX.Element | null {
  const { translate } = useLocales();
  const { push, route } = useRouter();

  const user = useTypedSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { id } = user || { id: '' };

  const { data: userInfo } = useGetUserInfoQuery(id);

  const { data: unreadNotifications } = useFetchUnreadNotificationsQuery(id);

  if (!userInfo) return null;

  const { role, firstName, lastName, avatar } = userInfo;

  const viewNotifications = (): void => {
    if (route !== ROUTES.notifications) push(ROUTES.notifications);
  };

  const chooseAppointmentsTab = (): void => {
    if (route !== ROUTES.home) {
      push(ROUTES.home);
    }
  };

  const toggleMenu = (e: React.MouseEvent<HTMLDivElement>): void =>
    !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);

  return (
    <MainHeaderWrapper>
      <LogoSection>
        <Logo href={ROUTES.home}>
          <FirstPart>{translate('logo_first_part')}</FirstPart>
          <SecondPart>{translate('logo_second_part')}</SecondPart>
        </Logo>
        <AppointmentsSection
          onClick={chooseAppointmentsTab}
          className={route === ROUTES.home ? 'active_tab' : ''}
        >
          <AppointmentsIcon />
          <AppointmentsText>
            {role === USER_ROLE.Seeker ? translate('appointments') : translate('schedule')}
          </AppointmentsText>
        </AppointmentsSection>
      </LogoSection>
      <MenuSection>
        <IconWrapper
          onClick={viewNotifications}
          className={route === ROUTES.notifications ? 'active' : ''}
        >
          {unreadNotifications && unreadNotifications.count > 0 ? (
            <Badge badgeContent={unreadNotifications.count} color="primary" max={99}>
              <NotificationsIcon />
            </Badge>
          ) : (
            <NotificationsIcon />
          )}
        </IconWrapper>
        <ProfileSection onClick={(e): void => toggleMenu(e)}>
          <AvatarWrapper>
            <Avatar src={avatar} />
          </AvatarWrapper>
          <ProfileName>{`${firstName} ${lastName}`}</ProfileName>
          <MenuDropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <KeyboardArrowDownIcon />
          </MenuDropdown>
        </ProfileSection>
      </MenuSection>
    </MainHeaderWrapper>
  );
}
