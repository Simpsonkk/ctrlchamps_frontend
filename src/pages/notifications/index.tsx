import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Background } from 'src/components/appointments/styles';
import NotificationsList from 'src/components/notifications-list/NotificationsList';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { DEFAULT_REDIRECT_PATH } from 'src/constants';
import { useLocales } from 'src/locales';
import {
  useFetchNotificationsQuery,
  useUpdateNotificationsToReadMutation,
} from 'src/redux/api/notificationsApi';
import { useTypedSelector } from 'src/redux/store';

export default function NotificationsPage(): JSX.Element | null {
  const { translate } = useLocales();
  const router = useRouter();
  const user = useTypedSelector((state) => state.user.user);

  const [updateNotifications] = useUpdateNotificationsToReadMutation();

  const { id } = user || { id: '' };
  const { data: notifications, isLoading } = useFetchNotificationsQuery(id);

  useEffect(() => {
    if (!user) {
      router.replace(DEFAULT_REDIRECT_PATH);
    }
    updateNotifications(id);
  }, [user, router, updateNotifications, id]);

  if (!user) {
    return null;
  }

  return (
    <PrivateRoute>
      <Head>
        <title>{translate('notifications.title')}</title>
      </Head>
      <MainHeader />
      <Background>
        <NotificationsList
          isLoading={isLoading}
          notifications={notifications?.data || []}
          count={notifications?.count}
        />
      </Background>
    </PrivateRoute>
  );
}
