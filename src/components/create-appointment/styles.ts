import { TextField, Typography, styled } from '@mui/material';
import { FilledButton } from 'src/components/reusable';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

interface PaymentWarningBlockProps {
  insufficientCost?: boolean;
}

const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: calc(100vh - ${HEADER.FLOW_HEIGHT}px);
  display: flex;
  justify-content: center;
`;

const MainText = styled(Typography)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  text-transform: capitalize;
`;

const BaseText = styled(Typography)`
  color: ${SECONDARY.md_gray};
  text-align: center;
`;

const BaseBoldText = styled(BaseText)`
  font-weight: ${typography.fontWeightMedium};
  text-align: left;
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const Button = styled(FilledButton)`
  width: 82%;
  padding: 8px;
  font-size: ${TYPOGRAPHY.base_xs}px;
  text-transform: none;
  font-weight: ${typography.fontWeightMedium};
`;

const Container = styled('div')`
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 1px 16px 0px ${SECONDARY.gray_shadow};
  margin-bottom: 30px;
  width: 360px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;

const ContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const AppointmentTypeCard = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid ${PRIMARY.info};
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  &.active {
    background-color: ${PRIMARY.light_main};
  }
`;

const AppointmentTypeInput = styled(TextField)`
  margin-top: 16px;
`;

const AppointmentTypeText = styled(Typography)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  text-transform: capitalize;
`;

const AppointmentTypeDetails = styled(Typography)`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
`;

const AppointmentDuration = styled('p')`
  background-color: ${PRIMARY.light_main};
  display: flex;
  align-items: center;
  gap: 3px;
  color: ${PRIMARY.black};
  font-weight: ${typography.fontWeightMedium};
  font-size: ${TYPOGRAPHY.base_xs}px;
  padding: 16px;
  border-radius: 4px;
  svg {
    width: 24px;
    height: 16px;
  }
`;

const IconWrapper = styled('div')`
  width: 100%;
  margin: 25px 0;
  text-align: center;
`;

const WeekSlot = styled('div')`
  font-size: ${TYPOGRAPHY.xss};
  background-color: ${PRIMARY.white};
  border: 1px solid ${PRIMARY.main};
  border-radius: 50%;
  aspect-ratio: 1;
  padding: 11px 13.7px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background-color: ${PRIMARY.main};
    color: ${PRIMARY.white};
  }
`;

const WeekSlotContainer = styled('div')`
  display: flex;
  gap: 8px;
`;

const SelectContainer = styled('div')`
  display: flex;
  gap: 24px;
`;

const DatePickerContainer = styled('div')`
  display: flex;
  gap: 24px;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PaymentWarningBlock = styled('div')<PaymentWarningBlockProps>`
  background-color: ${(props) =>
    props.insufficientCost ? PRIMARY.light_error : PRIMARY.light_main};
  line-height: 1.2;
  color: ${PRIMARY.black};
  font-weight: ${typography.fontWeightMedium};
  font-size: ${TYPOGRAPHY.base_xs}px;
  padding: 16px;
  border-radius: 4px;
`;

export {
  AppointmentDuration,
  AppointmentTypeCard,
  AppointmentTypeDetails,
  AppointmentTypeInput,
  AppointmentTypeText,
  Background,
  BaseBoldText,
  BaseText,
  Button,
  Container,
  ContentContainer,
  DatePickerContainer,
  IconWrapper,
  MainText,
  SelectContainer,
  StyledForm,
  TextContainer,
  WeekSlot,
  WeekSlotContainer,
  PaymentWarningBlock,
};
