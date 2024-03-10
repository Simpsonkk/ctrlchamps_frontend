import { Button, FormControlLabel, ListItemText, Typography, styled } from '@mui/material';
import { NextButton } from 'src/components/reusable/appointment-btn/styles';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: calc(100vh - ${HEADER.MAIN_HEIGHT}px - 74px);
  padding: 0px 24px 24px 24px;
  gap: 24px;
  display: flex;
`;

const AppointmentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 1px 16px 0px ${SECONDARY.gray_shadow};
  padding: 24px 16px;
`;

export const BaseText = styled(Typography)`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const FilterContainer = styled(AppointmentContainer)`
  width: max(400px, 25%);
`;

export const CaregiverListContainer = styled(AppointmentContainer)`
  width: max(968px, 75%);
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    font-size: ${TYPOGRAPHY.base}px;
    font-weight: ${typography.fontWeightMedium};
  }
`;

export const StyledListItemText = styled(ListItemText)`
  .MuiListItemText-primary {
    font-weight: ${typography.fontWeightMedium};
  }

  .MuiListItemText-secondary {
    display: flex;
    align-items: center;
    font-size: ${TYPOGRAPHY.xs}px;
    font-weight: ${typography.fontWeightMedium};
  }
`;

export const IconsWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const RatingWrapper = styled('div')`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const StyledNextButton = styled(NextButton)`
  margin-top: auto;
`;

export const StyledModalFooter = styled('div')`
  display: flex;
  width: 100%;
  gap: 8px;
  flex-direction: column;
`;

export const StyledDrawerTrigger = styled(Button)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: ${PRIMARY.white};
  display: none;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: ${TYPOGRAPHY.base}px;
  gap: 8px;

  ${({ theme }): string => theme.breakpoints.down('md')} {
    display: flex;
  }
`;
