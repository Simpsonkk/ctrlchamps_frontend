import { Stack } from '@mui/material';
import Modal from 'src/components/reusable/modal/Modal';
import { useTranslation } from 'react-i18next';
import { USER_ROLE } from 'src/constants';
import { UserRole } from 'src/redux/slices/userSlice';
import { HeadText, Icon, IconWrapper, Text, TextWrapper } from './styles';

type Props = {
  isActive: boolean;
  role: UserRole;
  handleClose: () => void;
};

export default function VirtualAssessmentSuccess({
  isActive,
  role,
  handleClose,
}: Props): JSX.Element {
  const { t: translate } = useTranslation();

  return (
    <Modal
      title={translate('request_appointment.virtual_assessment')}
      isActive={isActive}
      onClose={handleClose}
    >
      <Stack width={400}>
        <IconWrapper>
          <Icon color="primary" />
        </IconWrapper>
        <TextWrapper>
          <HeadText>{translate('request_appointment.request_sent')}</HeadText>
          <Text>
            {translate('request_appointment.request_success', {
              role:
                role === USER_ROLE.Seeker
                  ? translate('roles.client')
                  : translate('roles.caregiver'),
            })}
          </Text>
        </TextWrapper>
      </Stack>
    </Modal>
  );
}
