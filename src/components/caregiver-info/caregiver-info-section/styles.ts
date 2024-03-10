import { Typography, styled } from '@mui/material';

import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const SectionTitle = styled(Typography)`
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 32px;
`;

export const TitleWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Section = styled('section')`
  padding: 18px 32px;
`;
