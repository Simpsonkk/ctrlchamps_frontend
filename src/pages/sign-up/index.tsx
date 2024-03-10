import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useSignUpMutation } from 'src/redux/api/authApi';
import { RootState } from 'src/redux/rootReducer';
import { setToken } from 'src/redux/slices/tokenSlice';
import { useAppDispatch } from 'src/redux/store';

import SignUpFooter from 'src/components/reusable/footer';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import SignUpWrapper from 'src/components/reusable/sign-up-wrapper/SignUpWrapper';

import SignUpFirstForm from 'src/components/sign-up-first';
import SignUpFourthForm from 'src/components/sign-up-fourth';
import SignUpSecondForm from 'src/components/sign-up-second';
import SignUpThirdForm from 'src/components/sign-up-third';
import { UserRole } from 'src/redux/slices/userSlice';
import { ROUTES } from 'src/routes';
import Head from 'next/head';

const STEPS = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
};

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function SignUp(): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(STEPS.first);
  const role = useSelector((state: RootState) => state.role.role);
  const addressData = useSelector((state: RootState) => state.address.addressData);
  const personalDetails = useSelector((state: RootState) => state.personalDetails.personalDetails);

  const [signUp] = useSignUpMutation();

  const userInfo = {
    role: capitalizeFirstLetter(role),
    ...personalDetails,
    ...addressData,
  };

  const handleSignUp = async (password: string): Promise<void> => {
    try {
      const { token }: { token: string } = await signUp({ ...userInfo, password }).unwrap();

      dispatch(setToken(token));
      router.push(ROUTES.account_verification);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleBackStep = (): void => {
    if (step > STEPS.first) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleSecondStep = (): void => {
    setStep(STEPS.second);
  };
  const handleThirdStep = (): void => {
    setStep(STEPS.third);
  };
  const handleFourthStep = (): void => {
    setStep(STEPS.fourth);
  };

  return (
    <>
      <Head>
        <title>{t('SignUp')}</title>
      </Head>
      <FlowHeader text={t('SignUp')} callback={handleBackStep} infoButton iconType="back" />
      <SignUpWrapper>
        <>
          {step === STEPS.first && <SignUpFirstForm onNext={handleSecondStep} />}
          {step === STEPS.second && (
            <SignUpSecondForm role={role as UserRole} onNext={handleThirdStep} />
          )}
          {step === STEPS.third && <SignUpThirdForm onNext={handleFourthStep} />}
          {step === STEPS.fourth && <SignUpFourthForm onNext={handleSignUp} />}
          <SignUpFooter />
        </>
      </SignUpWrapper>
    </>
  );
}

export default SignUp;
