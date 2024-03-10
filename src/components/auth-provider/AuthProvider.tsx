import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { User, setUser } from 'src/redux/slices/userSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element | null {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);

  const token = useTypedSelector((state) => state.token.token);

  useEffect(() => {
    if (!token) {
      setLoading(false);

      return;
    }
    const user = jwt_decode<User>(token);
    dispatch(setUser(user));
    setLoading(false);
  }, [dispatch, token]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
}
