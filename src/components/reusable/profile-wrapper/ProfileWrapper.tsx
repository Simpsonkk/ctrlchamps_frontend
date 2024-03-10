import { Wrapper } from 'src/components/reusable/profile-wrapper/styles';

type Props = {
  children: JSX.Element;
};

export function ProfileWrapper({ children }: Props): JSX.Element {
  return <Wrapper>{children}</Wrapper>;
}
