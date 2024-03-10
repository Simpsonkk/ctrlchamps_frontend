import { Typography, styled } from '@mui/material';
import typography from 'src/theme/typography';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import { FilledButton } from '../reusable';

const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookingContainer = styled('div')`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const IconBackground = styled('div')`
  background: ${PRIMARY.white};
  padding: 44px 48px;
  border-radius: 50%;
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

export { Background, BaseText, BookingContainer, Button, IconBackground, MainText, TextContainer };
