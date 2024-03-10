import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { PRIMARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const OtpContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const OtpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const IconWrapper = styled.div`
  background: ${PRIMARY.light_main};
  width: fit-content;
  border-radius: 50%;
  width: 160px;
  height: 150px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 auto;
  margin-top: 24px;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
  }
`;

const HeadText = styled.h6`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
`;

const Text = styled.p`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  line-height: 1.5;
  text-align: center;
  font-weight: 500;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextInput = styled(TextField)(() => ({
  width: '88px',
  textAlign: 'center',
}));

const TextBtn = styled(Button)(() => ({
  color: PRIMARY.navy,
  fontSize: '15px',
  padding: 0,
  textTransform: 'capitalize',
  fontWeight: 500,
  '&:hover': {
    opacity: '0.8',
    background: 'none',
  },
}));

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  gap: 10px;
`;

export {
  Container,
  IconWrapper,
  HeadText,
  Text,
  TextBtn,
  TextInput,
  TextWrapper,
  OtpContainer,
  OtpWrapper,
  BtnContainer,
  FormWrapper,
};
