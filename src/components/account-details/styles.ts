import { Avatar, Button, IconButton, Select, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { HEADER } from 'src/config-global';

interface BackgroundProps {
  isAdmin: boolean | undefined;
}

export const Background = styled('div')<BackgroundProps>`
  background-color: ${(props): string =>
    props.isAdmin ? SECONDARY.background_gray : PRIMARY.light_main};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: ${HEADER.MAIN_HEIGHT}px;
`;

export const Container = styled('div')<BackgroundProps>`
  background-color: ${PRIMARY.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  margin-top: ${(props): string => (props.isAdmin ? '0' : '16px')};
  margin-bottom: 30px;
  height: fit-content;
  width: 688px;
`;

export const Title = styled('h2')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.l}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const AvatarContainer = styled('div')`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const AvatarIconContainer = styled('div')`
  width: 96px;
  height: 96px;
  background-color: ${PRIMARY.light_main};
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledAvatar = styled(Avatar)`
  width: 96px;
  height: 96px;
`;

export const VisuallyHiddenInput = styled('input')`
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
`;

export const Block = styled('div')`
  position: relative;
  padding: 8px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const Subtitle = styled('h3')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.6;
  letter-spacing: 0.15px;
`;

export const List = styled('ul')`
  display: flex;
  row-gap: 16px;
  width: 100%;
  flex-wrap: wrap;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    gap: 5px;
  }
`;

export const Item = styled('li')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 50%;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const Label = styled('p')`
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1;
  letter-spacing: 0.15px;
`;

export const Value = styled('p')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 42px;
  width: 100%;
`;

export const EditButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 8px;
`;

export const ButtonContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatusBlock = styled('div')`
  padding: 8px 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const ReviewBlock = styled('div')`
  padding-bottom: 5px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

export const ReviewHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewName = styled('div')`
  font-size: ${TYPOGRAPHY.base_sm}px;
  padding-bottom: 5px;
`;

export const ReviewUserBlock = styled('div')`
  display: flex;
  min-width: 200px;
  gap: 15px;
`;

export const ReviewDate = styled('div')`
  font-size: ${TYPOGRAPHY.base}px;
`;

export const ReviewDescription = styled('div')`
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  max-width: 500px;
  padding: 5px;
`;
