import React from 'react';
import { useLocales } from 'src/locales';
import Cross from 'src/assets/icons/Cross';
import {
  BackDrop,
  Modal,
  ModalHeader,
  CloseButton,
  HeaderTitle,
  TextContainer,
  HeadText,
  TextList,
} from './styles';

interface IProps {
  onClose: () => void;
}

export default function TermsModal({ onClose }: IProps): JSX.Element {
  const { translate } = useLocales();

  return (
    <BackDrop>
      <Modal>
        <ModalHeader>
          <CloseButton type="button" onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>{translate('termsModal.title')}</HeaderTitle>
        </ModalHeader>
        <TextContainer>
          <HeadText>{translate('termsModal.headText')}</HeadText>
          <TextList>
            <li>{translate('termsModal.firstItem')}</li>
            <li>{translate('termsModal.secondItem')}</li>
            <li>{translate('termsModal.thirdItem')}</li>
            <li>{translate('termsModal.fourthItem')}</li>
            <li>{translate('termsModal.fifthItem')}</li>
          </TextList>
        </TextContainer>
      </Modal>
    </BackDrop>
  );
}
