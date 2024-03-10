import {
  Button,
  IconButton as MuiIconButton,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
  Typography,
  styled,
} from '@mui/material';
import { Stack } from '@mui/system';
import { APPOINTMENT_STATUS } from 'src/constants';

import { PRIMARY, SECONDARY, TEXT_COLOR } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const MainWrapper = styled('div')`
  width: 100%;
  overflow: hidden;
  margin: 40px 25px 40px 15px;
  padding-left: 20px;
  padding-top: 15px;
  background-color: ${SECONDARY.background_gray};
  font-weight: ${typography.fontWeightBold};
  font-size: ${TYPOGRAPHY.sm}px;
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    margin: 40px 5px 40px 5px;
  }
`;

export const ManagementWrapper = styled('div')`
  margin: 20px 12px 40px 5px;
  padding: 20px;
  padding-bottom: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${PRIMARY.white};
  height: 100%;
  font-weight: ${typography.fontWeightBold};
  font-size: ${TYPOGRAPHY.sm}px;
`;

export const Cylinder = styled('div')`
  width: 7px;
  height: 20px;
  border-radius: 10px;
  background-color: ${PRIMARY.black};
  margin-right: 10px;
`;

export const PageName = styled('div')`
  display: flex;
  align-items: center;
  font-weight: ${typography.fontWeightBold};
  font-size: ${TYPOGRAPHY.sm}px;
`;

export const ActionBar = styled('div')`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

export const TableRow = styled(MuiTableRow)`
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

export const TableCell = styled(MuiTableCell)`
  font-weight: ${typography.fontWeightSemiBold};
  font-size: ${TYPOGRAPHY.base}px;
  text-align: center;
`;

export const ColorSpan = styled('span')<{ status: string }>`
  display: flex;
  justify-content: space-around;
  text-align: center;
  background-color: ${SECONDARY.light_green};
  color: ${(props): string => {
    const colorMap: Record<string, string> = {
      [APPOINTMENT_STATUS.Pending]: TEXT_COLOR.pending,
      [APPOINTMENT_STATUS.Accepted]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Active]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Paused]: TEXT_COLOR.pending,
      [APPOINTMENT_STATUS.Completed]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Finished]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Ongoing]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Virtual]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.SignedCaregiver]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.SignedSeeker]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Rejected]: TEXT_COLOR.rejected,
    };

    return colorMap[props.status];
  }};
  background-color: ${(props): string => {
    const colorMap: Record<string, string> = {
      [APPOINTMENT_STATUS.Pending]: SECONDARY.light_yellow,
      [APPOINTMENT_STATUS.Accepted]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.Active]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.Paused]: SECONDARY.light_yellow,
      [APPOINTMENT_STATUS.Completed]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.Finished]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.Ongoing]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.Virtual]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.SignedCaregiver]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.SignedSeeker]: SECONDARY.light_green,
      [APPOINTMENT_STATUS.Rejected]: SECONDARY.light_red,
    };

    return colorMap[props.status];
  }};
  padding: 5px 8px;
  border-radius: 15px;
`;

export const TableHeader = styled(TableCell)`
  font-weight: ${typography.fontWeightBold};
  text-align: center;
`;

export const IconButton = styled(MuiIconButton)`
  padding: 5px;
`;

export const Title = styled(Typography)`
  font-weight: ${typography.fontWeightMedium};
  color: ${SECONDARY.md_gray};
  margin-bottom: 20px;
  max-width: 400px;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  height: 40px;
  margin: 0 auto;
`;

export const StyledStack = styled(Stack)`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${SECONDARY.light_gray};
  }

  &::-webkit-scrollbar-thumb {
    background: ${SECONDARY.gray_shadow};
    border-radius: 10px;
  }
`;
