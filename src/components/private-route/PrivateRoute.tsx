import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DEFAULT_REDIRECT_PATH, USER_ROLE, USER_STATUS } from 'src/constants';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import { removeToken } from 'src/redux/slices/tokenSlice';
import { UserRole, removeUser } from 'src/redux/slices/userSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps): JSX.Element | null {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [isAllowedToEnter, setIsAllowedToEnter] = useState<boolean>(false);

  const user = useTypedSelector((state) => state.user.user);

  const { id } = user || { id: '' };

  const { data: userInfo } = useGetUserInfoQuery(id);

  useEffect(() => {
    if (!user) {
      router.replace(DEFAULT_REDIRECT_PATH);

      return;
    }

    if (!user.isVerified && pathname !== `${ROUTES.account_verification}/`) {
      router.replace(ROUTES.account_verification);

      return;
    }

    if (
      !user.isProfileFilled &&
      pathname !== `${ROUTES.profile}/` &&
      pathname !== `${ROUTES.account_verification}/` &&
      user.role === USER_ROLE.Caregiver
    ) {
      router.replace(ROUTES.profile);

      return;
    }

    if (
      (user.role === USER_ROLE.Admin || user.role === USER_ROLE.SuperAdmin) &&
      !pathname?.includes(ROUTES.adminPanel)
    ) {
      router.replace(ROUTES.adminPanel);

      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace(ROUTES.home);

      return;
    }

    if (userInfo?.isDeletedByAdmin || userInfo?.status === USER_STATUS.Inactive) {
      try {
        dispatch(removeToken());
        dispatch(removeUser());
      } catch (error) {
        throw new Error(error);
      }

      return;
    }

    setIsAllowedToEnter(true);
  }, [user, userInfo, dispatch, allowedRoles, router, pathname]);

  return <>{isAllowedToEnter && user && children}</>;
}
