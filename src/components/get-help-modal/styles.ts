import { styled, Button } from '@mui/material';
import { PRIMARY, SECONDARY, TEXT_COLOR } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Container = styled('div')`
  width: 368px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconContainer = styled('div')`
  width: 160px;
  height: 160px;
  aspect-ratio: 1;
  background-color: ${PRIMARY.light_main};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const SubTitle = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.6;
  letter-spacing: 0.15px;
  margin-bottom: 4px;
`;

export const Text = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  margin-bottom: 24px;
  text-align: center;
`;

export const Link = styled('a')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  text-decoration: none;
  background-color: ${PRIMARY.light_main};
  width: 100%;
  padding: 8px;
  text-align: center;
  border-radius: 8px;
`;
