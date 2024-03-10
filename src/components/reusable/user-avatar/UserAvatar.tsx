import { Avatar } from '@mui/material';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';

type Props = {
  userId: string;
  size: number;
};

export default function UserAvatar({ userId, size }: Props): JSX.Element {
  const { data: user } = useGetUserInfoQuery(userId);

  return (
    <Avatar
      src={user?.avatar}
      sx={{ width: size, height: size }}
      alt={`${user?.firstName} ${user?.lastName}`}
    />
  );
}
