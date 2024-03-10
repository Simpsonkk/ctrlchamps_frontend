import React from 'react';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmailInboxIcon from 'src/assets/icons/EmailInboxIcon';
import { FilledButton } from 'src/components/reusable/FilledButton';
import DigitTextField from 'src/components/sendOTP/DigitInputField';
import useVerification from 'src/hooks/useVerification';
import {
  AccountVerificationContainer,
  IconContainer,
  InputFieldsBlock,
  StyledErrorText,
  StyledParagraph,
  StyledParagraphMain,
  SubmitButtonContainer,
} from 'src/components/sendOTP/styles';
import { OTP_LENGTH } from 'src/constants';

interface OTPMessageFieldProps {
  onSubmit: () => void;
}

const OTPMessageField: React.FC<OTPMessageFieldProps> = ({ onSubmit }): JSX.Element => {
  const { t } = useTranslation();

  const { code, codeDoesNotMatch, handleInputChange, handleSubmit, requestNewCode } =
    useVerification({ onSubmit });

  const inputFields = Array<string>(OTP_LENGTH).fill('');

  return (
    <Container component="main" maxWidth="sm">
      <AccountVerificationContainer>
        <IconContainer>
          <EmailInboxIcon />
        </IconContainer>
        <StyledParagraph>{t('account_verification.sent_code')}</StyledParagraph>
        <form>
          <InputFieldsBlock>
            {inputFields.map((value, index) => (
              <DigitTextField
                key={index}
                value={code[index]}
                onChange={handleInputChange(index)}
                className={codeDoesNotMatch ? 'error' : ''}
                index={index}
                maxLength={inputFields.length}
              />
            ))}
          </InputFieldsBlock>
          {codeDoesNotMatch && (
            <StyledErrorText>{t('account_verification.invalid_code')}</StyledErrorText>
          )}
        </form>
        <StyledParagraphMain onClick={requestNewCode}>
          {t('account_verification.request_code')}
        </StyledParagraphMain>
        <SubmitButtonContainer>
          <FilledButton
            fullWidth
            disabled={code.join('').length !== code.length}
            onClick={handleSubmit}
          >
            {t('account_verification.btn_submit')}
          </FilledButton>
        </SubmitButtonContainer>
      </AccountVerificationContainer>
    </Container>
  );
};

export default OTPMessageField;
