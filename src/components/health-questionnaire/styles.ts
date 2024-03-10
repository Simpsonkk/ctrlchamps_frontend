import {
  Button,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from '@mui/material';
import { FilledButton } from 'src/components/reusable';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Background = styled('div')`
  padding-top: 24px;
  background-color: ${PRIMARY.light_main};
  min-height: calc(100vh - ${HEADER.FLOW_HEIGHT}px);
  display: flex;
  justify-content: center;
`;

export const QuestionnaireContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 550px;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 5%;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;

export const QuestionnaireContainerContent = styled('div')`
  padding: 18px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

export const QuestionnaireTypeText = styled(Typography)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.md}px;
  font-weight: ${typography.subtitle1.fontWeight};
  padding-bottom: 10px;
`;

export const SubmitButton = styled(FilledButton)`
  width: 90%;
  display: flex;
  margin: 20px auto;
  text-align: center;
  padding: 8px;
  font-size: ${TYPOGRAPHY.base_xs}px;
  text-transform: none;
  font-weight: ${typography.fontWeightMedium};
`;

export const CardActionsStyled = styled(CardActions)`
  justify-content: space-around;
  margin: 20px auto;
`;

export const ActionButton = styled(Button)`
  width: 250px;
  padding: 8px;
  font-size: ${TYPOGRAPHY.base_xs}px;
  text-transform: none;
  font-weight: ${typography.fontWeightMedium};
`;

export const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  margin: 10px 0 20px 0;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  border: none;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const ToggleButtonStyled = styled(ToggleButton)`
  margin: 4px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.4;

  &.MuiToggleButtonGroup-grouped {
    border: 1px solid ${SECONDARY.md_gray} !important;
  }

  &.Mui-selected {
    background-color: ${PRIMARY.light_main};
    color: ${PRIMARY.main};
    border: 1px solid ${PRIMARY.main} !important;
  }
`;

export const DescriptionBlock = styled('div')`
  color: ${SECONDARY.md_gray};
  font-weight: ${typography.fontWeightMedium};
  margin-bottom: 10px;
  line-height: 1.5;
`;
