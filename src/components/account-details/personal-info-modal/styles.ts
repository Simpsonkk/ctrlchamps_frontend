import { styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Container = styled('div')`
  width: 368px;
`;

export const FormBody = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${PRIMARY.white};
  border-top: 1px solid ${SECONDARY.light_gray};
  border-bottom: 1px solid ${SECONDARY.light_gray};
  padding: 8px 16px;
  margin-left: -16px;
  margin-right: -16px;
`;

export const FormFooter = styled('div')`
  background-color: ${PRIMARY.white};
  border-top: 1px solid ${SECONDARY.light_gray};
  border-bottom: 1px solid ${SECONDARY.light_gray};
  padding: 16px;
  margin-top: 64px;
  margin-bottom: -24px;
  margin-left: -16px;
  margin-right: -16px;
`;

export const ErrorMessage = styled('p')`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;
