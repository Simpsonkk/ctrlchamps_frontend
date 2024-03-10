import { Button, Typography, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Wrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 400px;
  margin: 0 auto;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;

export const StyledForm = styled('form')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled(Typography)`
  font-weight: ${typography.fontWeightMedium};
  letter-spacing: 0.15px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.base}px;
`;

export const Label = styled('p')`
  font-weight: ${typography.fontWeightMedium};
  letter-spacing: 0.15px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
`;

export const ButtonWrapper = styled('div')`
  border-top: 1px solid var(--divider, rgba(0, 0, 0, 0.12));
  padding: 16px 0 0;
  margin-top: auto;
`;

export const NextButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;
