import { Button, styled } from '@mui/material';
import { SECONDARY, TEXT_COLOR } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Container = styled('div')`
  width: 430px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

export const SubTitle = styled('p')`
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.43;
  letter-spacing: 0.17px;
  margin-bottom: 8px;
  text-align: center;
  margin-bottom: 24px;
`;

export const DoubleButtonBox = styled('div')`
  display: flex;
  gap: 16px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const CancelBtn = styled(Button)`
  border-radius: 4px;
  width: 100%;
  color: ${TEXT_COLOR.error};
  border-color: ${TEXT_COLOR.error};

  &:hover {
    background-color: ${SECONDARY.error_hover};
    border: 1px solid ${TEXT_COLOR.error};
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;
