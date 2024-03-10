import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLocales } from 'src/locales';
import LoginWrapper from 'src/components/login-form/LoginWrapper';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import LoginForm from 'src/components/login-form/LoginForm';
import SignUpFooter from 'src/components/reusable/footer';
import { ROUTES } from 'src/routes';

export default function Login(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{translate('loginForm.title')}</title>
      </Head>
      <FlowHeader
        text={translate('loginForm.title')}
        infoButton
        callback={(): Promise<boolean> => router.push(ROUTES.home)}
        iconType="back"
      />
      <LoginWrapper>
        <>
          <LoginForm />
          <SignUpFooter />
        </>
      </LoginWrapper>
    </>
  );
}
