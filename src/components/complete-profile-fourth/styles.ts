import { Typography, styled } from '@mui/material';
import { FilledButton } from 'src/components/reusable/FilledButton';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

const Wrapper = styled('div')`
  height: 100%;
  margin-top: 48px;
`;

const Container = styled('div')`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;

const BaseText = styled(Typography)`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

const WeekSlot = styled('div')`
  background-color: ${PRIMARY.white};
  border: 1px solid ${PRIMARY.main};
  border-radius: 50%;
  padding: 11px 13px;
  cursor: pointer;
  width: 42px;
  height: 42px;
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
  gap: 15px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    flex-wrap: wrap;
  }
`;

const SelectContainer = styled('div')`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const BtnWrapper = styled('div')`
  margin-top: auto;
  border-top: 1px solid ${SECONDARY.gray_shadow};
  padding: 16px 0;
`;

const NextBtn = styled(FilledButton)`
  width: 100%;
`;

export {
  BaseText,
  BtnWrapper,
  Container,
  NextBtn,
  SelectContainer,
  WeekSlot,
  WeekSlotContainer,
  Wrapper,
};
