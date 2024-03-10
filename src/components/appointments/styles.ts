import { Button, styled } from '@mui/material';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: ${HEADER.MAIN_HEIGHT}px;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  width: 720px;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 4px 4px 0px ${SECONDARY.gray_shadow};
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 16px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: clamp(200px, 90%, 500px);
  }
`;

export const HeadContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const Title = styled('h2')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.l}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    font-size: ${TYPOGRAPHY.md}px;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 42px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    line-height: 1.05;
  }
`;
