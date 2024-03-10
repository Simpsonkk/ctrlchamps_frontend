import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@mui/material';
import { useLocales } from 'src/locales';
import { useAppDispatch } from 'src/redux/store';
import { cancelAppointment } from 'src/redux/slices/appointmentSlice';
import { ROUTES } from 'src/routes';
import Cross from 'src/assets/icons/Cross';
import { FilledButton } from 'src/components/reusable';
import { resetAllInfo } from 'src/redux/slices/healthQuestionnaireSlice';
import { resetLocationSlice } from 'src/redux/slices/locationSlice';
import { Box, CloseButton, HeaderText, ModalContent, ModalHeader, Text } from './styles';

export function CancelAppointmentModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const { push } = useRouter();
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const handleClose = (): void => setOpen(false);

  const cancelThisAppointment = (): void => {
    dispatch(cancelAppointment());
    dispatch(resetAllInfo());
    dispatch(resetLocationSlice());
    setOpen(false);
    push(ROUTES.home);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={translate('create_appointment.modal.aria_label')}
      aria-describedby={translate('create_appointment.modal.aria_description')}
      sx={{
        '& > .MuiBackdrop-root': {
          backdropFilter: 'blur(0px)',
          backgroundColor: 'rgb(000, 0, 0, 0.2)',
        },
      }}
    >
      <Box>
        <ModalHeader>
          <CloseButton type="button" onClick={handleClose}>
            <Cross />
          </CloseButton>
          <HeaderText>{translate('create_appointment.modal.header')}</HeaderText>
        </ModalHeader>
        <ModalContent>
          <Text>{translate('create_appointment.modal.confirmation')}</Text>
          <FilledButton fullWidth onClick={cancelThisAppointment}>
            {translate('create_appointment.modal.positive_confirm')}
          </FilledButton>
        </ModalContent>
      </Box>
    </Modal>
  );
}
