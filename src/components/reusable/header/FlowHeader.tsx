import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import NeedHelpIcon from 'src/assets/icons/NeedHelpIcon';
import NeedHelpModal from 'src/components/modal-need-help/NeedHelpModal';
import Modal from 'src/components/reusable/modal/Modal';
import LogOutModal from 'src/components/log-out-modal/LogOutModal';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { ROUTES } from 'src/routes';
import { useLocales } from 'src/locales';

import { Container, Header, Text, InfoButton, Icon, ButtonContainer, LogOutButton } from './styles';

enum IconType {
  close = 'close',
  back = 'back',
  empty = 'empty',
}

export default function FlowHeader({
  text,
  iconType,
  infoButton,
  callback,
}: {
  text: string;
  iconType?: 'back' | 'close';
  infoButton?: boolean;
  callback?: () => void;
}): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLogOutModal, setShowLogOutModal] = useState<boolean>(false);

  const { translate } = useLocales();
  const pathname = usePathname();

  const handleClick = (): void => {
    setShowModal(true);
  };

  const onClose = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <Header>
        <Container>
          <>
            {iconType && (
              <Icon type="button" onClick={callback}>
                {iconType === IconType.back ? <ArrowBackFilled /> : <CloseIcon />}
              </Icon>
            )}
            <Text>{text}</Text>
          </>
        </Container>
        <ButtonContainer>
          {pathname === `${ROUTES.profile}/` && (
            <LogOutButton variant="text" onClick={(): void => setShowLogOutModal(true)}>
              {translate('logOutModal.logOutBtn')}
            </LogOutButton>
          )}
          {infoButton && (
            <InfoButton type="button" onClick={handleClick}>
              <NeedHelpIcon />
            </InfoButton>
          )}
        </ButtonContainer>
      </Header>
      {showModal && <NeedHelpModal onClose={onClose} />}
      <Modal
        title={translate('logOutModal.title')}
        onClose={(): void => setShowLogOutModal(false)}
        isActive={showLogOutModal}
      >
        <LogOutModal onClose={(): void => setShowLogOutModal(false)} />
      </Modal>
    </>
  );
}
