import { ReactElement, MouseEvent } from 'react';
import Cross from 'src/assets/icons/Cross';
import {
  BackDrop,
  ModalWrapper,
  ModalHeader,
  CloseButton,
  HeaderTitle,
  TextContainer,
} from './style';

type Props = {
  title: string;
  onClose: () => void;
  children: ReactElement;
  isActive: boolean;
};

export default function ConfirmModal({
  onClose,
  title,
  children,
  isActive,
}: Props): JSX.Element | null {
  if (!isActive) return null;

  const handleBackdropClick = (): void => {
    onClose();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <BackDrop onClick={handleBackdropClick}>
      <ModalWrapper onClick={handleModalClick}>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>{title}</HeaderTitle>
        </ModalHeader>
        <TextContainer>{children}</TextContainer>
      </ModalWrapper>
    </BackDrop>
  );
}
