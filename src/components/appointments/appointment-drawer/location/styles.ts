import { styled } from '@mui/material';
import { DateText } from '../styles';
import { MAP_DEFAULT_SIZE } from './constants';

export const GoogleMapWrapper = styled('div')`
  height: ${MAP_DEFAULT_SIZE}px;
  border-radius: 8px;
`;

export const GoogleMapContainerStyles = {
  height: MAP_DEFAULT_SIZE,
  borderRadius: 8,
};

export const StyledAddress = styled(DateText)`
  margin-bottom: 8px;
`;
