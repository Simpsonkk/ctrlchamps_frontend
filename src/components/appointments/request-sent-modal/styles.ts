import MissedVideoCallIcon from '@mui/icons-material/MissedVideoCall';
import { styled } from '@mui/material';
import { PRIMARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const IconWrapper = styled('div')`
  background: ${PRIMARY.light_main};
  width: fit-content;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  position: relative;
  margin: 8px auto 26px;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
  }
`;

export const Icon = styled(MissedVideoCallIcon)`
  width: 88px;
  height: 76px;
`;

export const HeadText = styled('h6')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightSemiBold};
  text-align: center;
  white-space: nowrap;
`;

export const Text = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  max-width: 328px;
  line-height: 1.5;
  text-align: center;
  font-weight: ${typography.fontWeightMedium};
`;

export const TextWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;
