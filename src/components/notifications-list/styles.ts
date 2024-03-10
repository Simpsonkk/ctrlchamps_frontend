import { styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { colorMap } from './constants';

interface IconBackgroundProps {
  color: keyof typeof colorMap;
}

export const Container = styled('div')`
  width: 720px;
  height: fit-content;
  min-height: 120px;
  padding: 16px;
  border-radius: 4px;
  margin: 20px 0;
  background: ${PRIMARY.white};
  box-shadow: 0px 4px 4px 0px ${SECONDARY.light_gray};
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 325px;
  }
`;

export const Header = styled('p')`
  color: ${SECONDARY.grayish};
  font-size: ${TYPOGRAPHY.l}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const List = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const ListItem = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${SECONDARY.light_gray};
  }
`;

export const IconBackground = styled('div')<IconBackgroundProps>`
  background-color: ${(props) => colorMap[props.color]};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BoldText = styled('span')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const BaseText = styled('p')`
  color: ${SECONDARY.ml_gray};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const NoNotificationText = styled('p')`
  margin: 5px 0 0 5px;
  font-size: ${TYPOGRAPHY.base_sm}px;
  color: ${SECONDARY.ml_gray};
`;
