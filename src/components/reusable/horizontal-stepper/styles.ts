import { Stepper, styled } from '@mui/material';

export const StepperWrapper = styled('div')`
  margin-inline: auto;
  padding: 25px 0;
`;

export const StyledStepper = styled(Stepper)`
  width: 60%;
  margin: 0 auto;

  ${({ theme }): string => theme.breakpoints.down('md')} {
    width: 90%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;
