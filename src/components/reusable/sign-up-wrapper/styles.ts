import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  margin: 0 auto;
  padding: 24px 0;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
    padding-inline: 16px;
  }
`;
