import React from 'react';
import { useLocales } from 'src/locales';
import Cross from 'src/assets/icons/Cross';
import { HELP_EMAIL } from 'src/constants';
import {
  BackDrop,
  Modal,
  ModalHeader,
  CloseButton,
  HeaderTitle,
  TextContainer,
  Text,
  Link,
} from './styles';

interface IProps {
  onClose: () => void;
}

export default function NeedHelpModal({ onClose }: IProps): JSX.Element {
  const { translate } = useLocales();

  return (
    <BackDrop>
      <Modal>
        <ModalHeader>
          <CloseButton type="button" onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>{translate('needHelpModal.title')}</HeaderTitle>
        </ModalHeader>
        <TextContainer>
          <Text>{translate('needHelpModal.text')}</Text>
          <Link href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</Link>
        </TextContainer>
      </Modal>
    </BackDrop>
  );
}
