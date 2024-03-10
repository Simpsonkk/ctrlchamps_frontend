import PasswordShieldIcon from 'src/assets/icons/PasswordShieldIcon';
import { useLocales } from 'src/locales';
import { useRouter } from 'next/router';
import { ROUTES } from 'src/routes';
import { Container, HeadText, IconWrapper, Text, TextWrapper } from './styles';
import { FilledButton } from '../reusable/FilledButton';

export default function VerificationSuccess(): JSX.Element {
  const { translate } = useLocales();
  const { push } = useRouter();

  return (
    <Container>
      <IconWrapper>
        <PasswordShieldIcon />
      </IconWrapper>
      <TextWrapper>
        <HeadText>{translate('reset_password.success')}</HeadText>
        <Text>{translate('reset_password.instructions')}</Text>
      </TextWrapper>
      <FilledButton onClick={(): Promise<boolean> => push(ROUTES.login)}>
        {translate('reset_password.btn_back')}
      </FilledButton>
    </Container>
  );
}
