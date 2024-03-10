import { TextField } from '@mui/material';

import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/material/styles';
import { ErrorText } from 'src/components/reusable';
import { PRIMARY, SECONDARY, TEXT_COLOR } from 'src/theme/colors';
import typography from 'src/theme/typography';

export const AccountVerificationContainer = styled.div`
  padding-top: 1em;
  position: relative;
  height: 70vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

export const SuccessAccountVerificationContainer = styled.div`
  padding-top: 1em;
  position: relative;
  height: 55vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10em;
  height: 10em;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${SECONDARY.selected};
`;

export const SubmitButtonContainer = styled.div`
  width: 80%;
`;

export const TextBlock = styled.div`
  text-align: center;
  width: 60%;
  padding-bottom: 1em;
  font-size: ${typography.subtitle1.fontSize};
`;

export const StyledParagraph = styled.p`
  font-weight: ${typography.fontWeightMedium};
  color: ${PRIMARY.black};
  text-align: center;
  line-height: 1.8;
  width: 300px;
`;

export const StyledParagraphMain = styled.a`
  font-weight: ${typography.fontWeightMedium};
  color: ${PRIMARY.navy};
  text-decoration: none;
  text-align: center;
  ${typography.body1};
  padding: 0 4em;
  cursor: pointer;
`;

export const StyledParagraphSuccess = styled.p`
  ${typography.h6};
  padding-bottom: 0.5em;
`;

export const DigitInput = muiStyled(TextField)`
  width: 5em;
  margin-right: 10px;
  text-align: center;

  input {
    font-size: ${typography.h4.fontSize};
    text-align: center;
    border: none;
    &:focus {
      border: none;
    }
  }

  &.error {
    input {
      border-bottom: 1px solid ${TEXT_COLOR.error};
    }
  }

  &:hover {
    input {
      border: none;
    }
  }

  
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 3em;
  }
`;

export const StyledErrorText = styled(ErrorText)`
  text-align: center;
`;

export const InputFieldsBlock = styled.div`
  display: flex;
`;
