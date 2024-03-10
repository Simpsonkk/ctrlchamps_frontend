import { styled } from '@mui/material';
import { PRIMARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Container = styled('div')`
  max-width: 430px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 55vh;
  overflow-y: auto;
`;

export const SubTitle = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightBold};
  line-height: 1.6;
`;

export const Text = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  letter-spacing: 0.15px;
  line-height: 1.5;
`;

export const Span = styled('span')`
  font-weight: ${typography.fontWeightBold};
  text-decoration-line: underline;
`;

export const TaskList = styled('ul')`
  display: flex;
  flex-direction: column;
`;

export const Task = styled('li')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.6;
  letter-spacing: 0.15px;
`;
