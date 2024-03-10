import { Box } from '@mui/system';
import { Button } from '@mui/material';

import typography from 'src/theme/typography';
import styled from '@emotion/styled';
import { PRIMARY, SECONDARY } from 'src/theme/colors';

const lightFontWeight = typography.fontWeightRegular;
const mediumFontWeight = typography.fontWeightMedium;
export const signupColorInLightTheme = PRIMARY.main;
export const selectedItemColorLigthTheme = SECONDARY.selected;

export const BoxWrapper = styled(Box)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const NextButton = styled(Button)`
  border-radius: 4px;
  margin-top: auto;
`;

export const StyledParagraph = styled.p`
  width: 100%;
  color: ${SECONDARY.md_gray};
  font-weight: ${lightFontWeight};
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledParagraphMain = styled.p`
  font-weight: ${mediumFontWeight};
  color: ${PRIMARY.black};
`;
