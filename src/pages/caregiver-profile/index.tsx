import Head from 'next/head';

import CaregiverInfo from 'src/components/caregiver-info/CaregiverInfo';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useGetCaregiverDetailsQuery } from 'src/redux/api/appointmentApi';
import { useTypedSelector } from 'src/redux/store';

export default function CaregiverProfile(): JSX.Element | null {
  const { translate } = useLocales();

  const userId = useTypedSelector((state) => state.user.user?.id);

  const {
    data: caregiverInfo,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCaregiverDetailsQuery(userId);

  if (isLoading) return null;

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.Caregiver]}>
      <Head>
        <title>{translate('caregiverProfile.title')}</title>
      </Head>
      <MainHeader />
      {isSuccess && <CaregiverInfo caregiverInfo={caregiverInfo} refetchCaregiverInfo={refetch} />}
    </PrivateRoute>
  );
}
