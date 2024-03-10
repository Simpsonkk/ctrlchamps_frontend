import { Button, Link, Typography, styled } from '@mui/material';
import { SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const Wrapper = styled('div')`
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 480px;
  margin: 0 auto;
  padding: 24px 0;
  font-size: ${TYPOGRAPHY.base}px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
    padding-inline: 16px;
  }
`;

export const Title = styled(Typography)`
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: ${SECONDARY.md_gray};
`;

export const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: ${SECONDARY.md_gray};
`;

export const InputWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const SignInButton = styled(Button)`
  border-radius: 4px;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: 500;
`;

export const ResetPasswordLink = styled(Link)`
  display: block;
  cursor: pointer;
  color: ${({ theme }): string => theme.palette.secondary.main};
  margin-left: auto;
  margin-right: auto;
  line-height: 1.73;
  letter-spacing: 0.46px;
  padding: 8px 0;
  font-weight: 500;
`;

export const BottomText = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  margin-left: auto;
  margin-right: auto;
`;

export const SignUpLink = styled(Link)`
  display: block;
  cursor: pointer;
  color: ${({ theme }): string => theme.palette.secondary.main};
  line-height: 1.73;
  letter-spacing: 0.46px;
  font-weight: 500;
`;
