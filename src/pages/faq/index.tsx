import Head from 'next/head';

import { Background, HeadContainer, Title } from 'src/components/appointments/styles';
import FaqAccordion from 'src/components/faq-accordion/FaqAccordion';
import { StyledContainer } from 'src/components/faq-accordion/styles';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { useLocales } from 'src/locales';

export default function FaqPage(): JSX.Element | null {
  const { translate } = useLocales();

  return (
    <PrivateRoute>
      <Head>
        <title>{translate('faq.title')}</title>
      </Head>
      <MainHeader />
      <Background>
        <StyledContainer>
          <HeadContainer>
            <Title>{translate('faq.title')}</Title>
          </HeadContainer>
          <FaqAccordion />
        </StyledContainer>
      </Background>
    </PrivateRoute>
  );
}
