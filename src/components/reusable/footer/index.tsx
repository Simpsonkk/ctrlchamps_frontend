import React, { useState } from 'react';
import { useLocales } from 'src/locales';
import TermsModal from 'src/components/terms-modal/TermsModal';
import { Footer, Text, TermsButton } from './styles';

export default function SignUpFooter(): JSX.Element {
  const { translate } = useLocales();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = (): void => {
    setShowModal(true);
  };

  const onClose = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <Footer>
        <Text>{translate('footer.termsText')}</Text>
        <TermsButton type="button" onClick={handleClick}>
          {translate('footer.termsButton')}
        </TermsButton>
      </Footer>
      {showModal && <TermsModal onClose={onClose} />}
    </>
  );
}
