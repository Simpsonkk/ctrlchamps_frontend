import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { AUTO_HIDEOUT_DELAY } from 'src/constants';
import { useLocales } from 'src/locales';

type Props = {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  isOpen: boolean;
  onClose: () => void;
};

export default function Popup({ isOpen, onClose, text, severity }: Props): JSX.Element {
  const { translate } = useLocales();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={AUTO_HIDEOUT_DELAY}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity}>{translate(text)}</Alert>
    </Snackbar>
  );
}
