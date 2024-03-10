import { MenuItem as MuiMenuItem, MenuList as MuiMenuList, styled } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { Stack } from '@mui/system';

import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const MenuList = styled(MuiMenuList)`
  width: 230px;
  min-height: 100vh;
  padding-top: 60px;
  border-right: 2px solid ${SECONDARY.gray_shadow};
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 30px;
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  font-size: ${TYPOGRAPHY.sm}px;

  &.Mui-selected {
    color: ${PRIMARY.navy};
  }
`;

export const AdminPageStyledStack = muiStyled(Stack)`
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    display: flex;
    flex-direction: column;
  }
`;
