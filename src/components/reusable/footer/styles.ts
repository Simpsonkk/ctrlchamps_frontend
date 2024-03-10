import { styled, Typography } from '@mui/material';
import { SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const Footer = styled('footer')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const Text = styled(Typography)`
  font-weight: 500;
  letter-spacing: 0.17px;
  line-height: 1.43;
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.xs}px;
`;

export const TermsButton = styled('button')`
  color: ${({ theme }): string => theme.palette.secondary.main};
  padding: 0 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: 500;
  letter-spacing: 0.17px;
  line-height: 1.43;
  text-decoration-line: underline;
`;
