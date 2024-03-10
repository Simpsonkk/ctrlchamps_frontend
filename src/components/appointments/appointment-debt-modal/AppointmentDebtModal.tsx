import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import Modal from 'src/components/reusable/modal/Modal';
import { HELP_EMAIL } from 'src/constants';
import { useLocales } from 'src/locales';
import { Container, IconContainer, Link, Text } from './styles';

interface AppointmentDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentDebtModal({
  isOpen,
  onClose,
}: AppointmentDebtModalProps): JSX.Element {
  const { translate } = useLocales();

  return (
    <Modal title={translate('appointmentDebtModal.title')} onClose={onClose} isActive={isOpen}>
      <Container>
        <IconContainer>
          <ReceiptLongIcon color="secondary" />
        </IconContainer>
        <Text>{translate('appointmentDebtModal.text')}</Text>
        <Text>{translate('appointmentDebtModal.mailText')}</Text>
        <Link href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</Link>
      </Container>
    </Modal>
  );
}
