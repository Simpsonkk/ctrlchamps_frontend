import { MouseEventHandler, ReactNode } from 'react';
import { IconButton } from '@mui/material';

import EditSquare from 'src/assets/icons/EditSquare';
import {
  Section,
  SectionTitle,
  TitleWrapper,
} from 'src/components/caregiver-info/caregiver-info-section/styles';

type Props = {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function CaregiverInfoSection({ title, onClick, children }: Props): JSX.Element {
  return (
    <Section>
      <TitleWrapper>
        <SectionTitle>{title}</SectionTitle>
        <IconButton onClick={onClick}>
          <EditSquare />
        </IconButton>
      </TitleWrapper>
      {children}
    </Section>
  );
}
