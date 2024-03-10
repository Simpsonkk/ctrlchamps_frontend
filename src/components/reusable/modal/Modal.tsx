import { ReactElement, MouseEvent } from 'react';
import { PRIMARY } from 'src/theme/colors';
import Cross from 'src/assets/icons/Cross';
import {
  BackDrop,
  ModalWrapper,
  ModalHeader,
  CloseButton,
  HeaderTitle,
  ModalBody,
  ModalFooter,
} from './styles';

type Props = {
  title: string;
  onClose: () => void;
  children: ReactElement;
  isActive: boolean;
  footerChildren?: ReactElement | boolean;
  backgroundColor?: string;
  increaseHeight?: boolean;
};

export default function Modal({
  onClose,
  title,
  children,
  isActive,
  footerChildren,
  backgroundColor,
  increaseHeight = false,
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
        <ModalBody
          increaseHeight={increaseHeight}
          backgroundColor={!backgroundColor ? PRIMARY.white : backgroundColor}
        >
          {children}
        </ModalBody>
        {footerChildren && <ModalFooter>{footerChildren}</ModalFooter>}
      </ModalWrapper>
    </BackDrop>
  );
}
