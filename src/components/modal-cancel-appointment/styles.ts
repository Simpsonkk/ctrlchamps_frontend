import { Typography, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

const ModalContent = styled('div')`
  padding: 16px;
`;
const ModalHeader = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

const CloseButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 12px;
  cursor: pointer;
`;

const HeaderText = styled(Typography)`
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  color: ${PRIMARY.black};
  text-transform: capitalize;
`;

const Text = styled(Typography)`
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  color: ${SECONDARY.md_gray};
  margin-bottom: 16px;
`;

const Box = styled('div')`
  width: 480px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${PRIMARY.white};
  border-radius: 4px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 90%;
  }
`;

export { Box, CloseButton, HeaderText, ModalContent, ModalHeader, Text };
