import Head from 'next/head';
import { useRouter } from 'next/router';
import AppointmentsPage from 'src/components/appointments/AppointmentsPage';
import CaregiverSchedulePage from 'src/components/caregiver-schedule/CaregiverSchedulePage';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { DEFAULT_REDIRECT_PATH, USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';

export default function HomePage(): JSX.Element | null {
  const router = useRouter();
  const { translate } = useLocales();

  const user = useTypedSelector((state) => state.user.user);

  if (!user) {
    router.replace(DEFAULT_REDIRECT_PATH);

    return null;
  }

  const { role } = user;

  return (
    <PrivateRoute>
      <Head>
        <title>{translate('app_title')}</title>
      </Head>
      {role === USER_ROLE.Caregiver && <CaregiverSchedulePage />}
      {role === USER_ROLE.Seeker && <AppointmentsPage />}
    </PrivateRoute>
  );
}
