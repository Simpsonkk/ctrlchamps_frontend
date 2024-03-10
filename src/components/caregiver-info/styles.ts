import { Typography, styled } from '@mui/material';

import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: 100vh;
  padding-top: ${HEADER.MAIN_HEIGHT}px;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled('div')`
  background-color: ${SECONDARY.caregiver_profile_background};
  margin: 16px 10px;
  max-width: 720px;
  width: 100%;
`;

export const MainTitle = styled(Typography)`
  font-size: ${TYPOGRAPHY.l}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 48px;
  margin-left: 16px;
  margin-top: 16px;
`;

export const SectionItem = styled(Typography)`
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 30px;
`;

export const Video = styled('video')`
  width: 100px;
  height: 80px;
`;
