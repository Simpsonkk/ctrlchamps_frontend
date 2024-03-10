import { Typography, styled } from '@mui/material';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const DrawerHeader = styled('div')`
  display: flex;
  gap: 16px;
  min-height: ${HEADER.FLOW_HEIGHT + 1}px;
  align-items: center;
  width: 360px;
  padding: 8px 12px;
  border-bottom: 1px solid ${SECONDARY.light_gray};

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;

export const DrawerTitle = styled(Typography)`
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.15px;
  color: ${PRIMARY.black};
`;

export const DrawerBody = styled('div')`
  display: flex;
  gap: 16px;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  background-color: ${PRIMARY.white};
  width: 360px;
  padding: 16px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;

export const DrawerFooter = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 360px;
  padding: 16px;
  margin-top: auto;
  border-top: 1px solid ${SECONDARY.light_gray};

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;
