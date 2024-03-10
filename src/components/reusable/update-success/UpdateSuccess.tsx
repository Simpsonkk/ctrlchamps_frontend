import { Alert, Snackbar } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { AUTO_HIDEOUT_DELAY } from 'src/constants';

type Props = {
  dataUpdated: boolean;
  setDataUpdated: Dispatch<SetStateAction<boolean>>;
  message: string;
};

export default function UpdateSuccess({
  dataUpdated,
  setDataUpdated,
  message,
}: Props): JSX.Element {
  return (
    <Snackbar
      open={dataUpdated}
      autoHideDuration={AUTO_HIDEOUT_DELAY}
      onClose={(): void => setDataUpdated(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity="success">{message}</Alert>
    </Snackbar>
  );
}
