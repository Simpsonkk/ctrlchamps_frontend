import { ChangeEvent, useState } from 'react';
import { FIRST_PAGE, PAGINATION_LIMIT } from 'src/constants';
import { Pagination, Stack } from '@mui/material';

import { useLocales } from 'src/locales';
import { Notification } from 'src/redux/api/notificationsApi';

import NotificationItem from './Notification';
import { BaseText, Container, Header, List, NoNotificationText } from './styles';
import { firstItemIndex } from './constants';

type Props = {
  isLoading: boolean;
  notifications: Notification[];
  count: number | undefined;
};

export default function NotificationsList({ isLoading, notifications, count }: Props): JSX.Element {
  const { translate } = useLocales();
  const [page, setPage] = useState<number>(FIRST_PAGE);

  const startIndex = (page - firstItemIndex) * PAGINATION_LIMIT;
  const displayedNotifications = notifications.slice(startIndex, startIndex + PAGINATION_LIMIT);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <Container>
      <Header>{translate('notifications.title')}</Header>
      {isLoading && <BaseText sx={{ mt: 2 }}>{translate('notifications.loading')}</BaseText>}
      {!isLoading && (
        <List>
          {notifications.length > 0 ? (
            displayedNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                status={notification.status}
                username={notification.user}
                appointmentId={notification.appointmentId}
              />
            ))
          ) : (
            <NoNotificationText>{translate('notifications.no_notifications')}</NoNotificationText>
          )}
          {!!count && (
            <Stack display="flex" direction="row" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(count / PAGINATION_LIMIT)}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          )}
        </List>
      )}
    </Container>
  );
}
