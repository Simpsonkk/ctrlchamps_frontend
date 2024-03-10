import { Button, Typography, styled } from '@mui/material';
import { SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { Task, TaskList } from '../styles';

export const Container = styled('div')`
  width: 430px;
`;

export const DoubleButtonBox = styled('div')`
  flex-direction: column;
  display: flex;
  gap: 8px;
`;

export const StyledTitle = styled(Typography)`
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;

export const StyledTaskList = styled(TaskList)`
  width: 100%;
`;

export const StyledTask = styled(Task)`
  &:last-child {
    border: none;
  }
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const StyledCheckBoxLabel = styled(Typography)`
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.6;
  letter-spacing: 0.15px;
`;
