import { TabPanel } from '@mui/lab';
import { Box, Button, Grid, List, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Link from 'next/link';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { StyledButton } from 'src/components/review-modal/styles';

export const BookButton = styled(Button)`
  width: 100%;
  border-radius: 4px;
`;

export const DrawerItem = styled(Stack)`
  gap: 16px;
  padding-bottom: 16px;
  background-color: ${PRIMARY.white};
  border-bottom: 1px solid ${SECONDARY.light_gray};

  &:not(:first-of-type) {
    padding-top: 16px;
  }
`;

export const DrawerStats = styled(DrawerItem)`
  padding: 16px;
`;

export const DrawerTextTitle = styled(Typography)`
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const DrawerTextValue = styled(Typography)`
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const DrawerDateTenure = styled(DrawerTextValue)`
  color: ${SECONDARY.gray_semi_transparent};
  padding-left: 4px;
`;

export const DrawerTextHeading = styled(Typography)`
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const StyledVideo = styled('video')`
  border-radius: 8px;
`;

export const StyledTabs = styled(Tabs)`
  max-width: 360px;
  background-color: ${PRIMARY.light_main};
  border-bottom: 1px solid ${SECONDARY.light_gray};

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    max-width: 300px;
  }
`;

export const StyledTab = styled(Tab)`
  font-size: ${TYPOGRAPHY.base}px;
`;

export const StyledTabPanel = styled(TabPanel)`
  padding: 0;
`;

export const StyledUnorderedList = styled(List)`
  padding-left: 24px;
  list-style-type: disc;
  list-style-position: outside;
  list-style-image: none;
`;

export const StyledLink = styled(Link)`
  color: ${PRIMARY.navy};
  font-size: ${TYPOGRAPHY.base}px;
  overflow: hidden;
  display: block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${typography.fontWeightMedium};
`;

export const StyledGrid = styled(Grid)`
  width: 100%;
  word-wrap: break-word;
`;

export const StyledStack = styled(Stack)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

export const ReviewHeader = styled(Box)`
  display: flex;
  gap: 16px;
`;

export const SortButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${PRIMARY.black};
`;

export const StyledSortIcon = styled(SortIcon)`
  color: ${PRIMARY.main};
`;

export const ReviewButton = styled(StyledButton)`
  position: fixed;
  bottom: 10px;
  width: 320px;
  right: 22px;
`;
