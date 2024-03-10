import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import { Step as StepType } from 'src/components/profile/profile-qualification/types';
import { StepperWrapper, StyledStepper } from 'src/components/reusable/horizontal-stepper/styles';

type Props = {
  completed: Record<string, boolean>;
  activeStep: number;
  onStep: (step: number) => () => void;
  steps: StepType[];
  color?: string;
};

export default function HorizontalStepper({
  completed,
  activeStep,
  onStep,
  steps,
  color,
}: Props): JSX.Element {
  return (
    <StepperWrapper sx={{ backgroundColor: color }}>
      <StyledStepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepButton color="inherit" onClick={onStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </StyledStepper>
    </StepperWrapper>
  );
}
