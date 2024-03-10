import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import SuccessfulValidationIcon from 'src/assets/icons/SuccessfulValidationIcon';
import { FilledButton } from 'src/components/reusable/FilledButton';
import {
  IconContainer,
  StyledParagraphSuccess,
  SubmitButtonContainer,
  SuccessAccountVerificationContainer,
  TextBlock,
} from 'src/components/sendOTP/styles';
import { USER_ROLE } from 'src/constants';
import { useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';

const SuccessfulVerification = (): JSX.Element | null => {
  const router = useRouter();
  const { t } = useTranslation();

  const user = useTypedSelector((state) => state.user.user);

  if (!user) return null;

  const { role } = user;

  const handleButtonClick = (): void => {
    router.push(role === USER_ROLE.Seeker ? ROUTES.login : ROUTES.profile);
  };

  return (
    <Container component="main" maxWidth="sm">
      <SuccessAccountVerificationContainer>
        <IconContainer>
          <SuccessfulValidationIcon />
        </IconContainer>
        <TextBlock>
          <StyledParagraphSuccess>
            {t('account_verification.successfully_verified')}
          </StyledParagraphSuccess>
          <p>
            {role === USER_ROLE.Seeker
              ? t('account_verification.successfully_seeker')
              : t('account_verification.successfully_caregiver')}
          </p>
        </TextBlock>

        <SubmitButtonContainer>
          <FilledButton fullWidth onClick={handleButtonClick}>
            {role === USER_ROLE.Seeker
              ? t('account_verification.successfully_seeker_btn')
              : t('account_verification.successfully_caregiver_btn')}
          </FilledButton>
        </SubmitButtonContainer>
      </SuccessAccountVerificationContainer>
    </Container>
  );
};

export default SuccessfulVerification;
