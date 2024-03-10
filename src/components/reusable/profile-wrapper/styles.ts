import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 405px;
  margin: 0 auto;
  padding: 24px 0 5px;

  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 300px;
  }
`;
