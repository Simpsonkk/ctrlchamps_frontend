import { Dispatch, Fragment, SetStateAction, useState } from 'react';

import { SectionItem, Video } from 'src/components/caregiver-info/styles';
import CompleteProfileFifth from 'src/components/complete-profile-fifth/CompleteProfileFifth';
import CompleteProfileFourth from 'src/components/complete-profile-fourth/CompleteProfileFourth';
import CompleteProfileSecond from 'src/components/complete-profile-second/CompleteProfileSecond';
import CompleteProfileThird from 'src/components/complete-profile-third/CompleteProfileThird';
import { Bio } from 'src/components/profile/bio/Bio';
import ProfileQualification from 'src/components/profile/profile-qualification/ProfileQualification';
import { FIRST_STEP_INDEX, SECOND_STEP_INDEX } from 'src/constants';
import { useLocales } from 'src/locales';
import { Caregiver } from 'src/types/Caregiver.type';

type Props = {
  caregiverInfo: Caregiver;
  refetchCaregiverInfo: () => void;
};

type CaregiverInfoSection = {
  title: string;
  content: JSX.Element[] | JSX.Element;
};

type ReturnType = {
  handleModalClose: () => void;
  handleModalOpen: (stepIndex?: number) => void;
  ActiveStepLabel: string;
  ActiveStepComponent: JSX.Element;
  CAREGIVER_INFO_SECTIONS: CaregiverInfoSection[];
  isStepModalOpen: boolean;
  translate: (text: string) => string;
  servicesUpdated: boolean;
  setServicesUpdated: Dispatch<SetStateAction<boolean>>;
  availabilityUpdated: boolean;
  setAvailabilityUpdated: Dispatch<SetStateAction<boolean>>;
  rateUpdated: boolean;
  setRateUpdated: Dispatch<SetStateAction<boolean>>;
  bioUpdated: boolean;
  setBioUpdated: Dispatch<SetStateAction<boolean>>;
};

export default function useCaregiverInfo({
  caregiverInfo,
  refetchCaregiverInfo,
}: Props): ReturnType {
  const { translate } = useLocales();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(FIRST_STEP_INDEX);
  const [isStepModalOpen, setIsStepModalOpen] = useState<boolean>(false);
  const [servicesUpdated, setServicesUpdated] = useState<boolean>(false);
  const [availabilityUpdated, setAvailabilityUpdated] = useState<boolean>(false);
  const [rateUpdated, setRateUpdated] = useState<boolean>(false);
  const [bioUpdated, setBioUpdated] = useState<boolean>(false);

  const handleNext = (): void => setActiveStepIndex(activeStepIndex + SECOND_STEP_INDEX);
  const handleBack = (): void => setActiveStepIndex(activeStepIndex - SECOND_STEP_INDEX);

  const STEPS = [
    {
      label: translate('profile.qualification'),
      component: <ProfileQualification onNext={handleNext} />,
    },
    {
      label: translate('profile.workExperience'),
      component: <CompleteProfileSecond onNext={handleNext} onBack={handleBack} />,
    },
    {
      label: translate('profile.services'),
      component: (
        <CompleteProfileThird
          onNext={handleNext}
          onBack={handleBack}
          onSuccess={(): void => setServicesUpdated(true)}
        />
      ),
    },
    {
      label: translate('profile.availability'),
      component: (
        <CompleteProfileFourth
          onNext={handleNext}
          onBack={handleBack}
          onSuccess={(): void => setAvailabilityUpdated(true)}
        />
      ),
    },
    {
      label: translate('profile.rates'),
      component: (
        <CompleteProfileFifth
          onNext={handleNext}
          onBack={handleBack}
          onSuccess={(): void => setRateUpdated(true)}
        />
      ),
    },
    {
      label: translate('profile.bio'),
      component: <Bio onBack={handleBack} onSuccess={(): void => setBioUpdated(true)} />,
    },
  ];

  const CAREGIVER_INFO_SECTIONS = [
    {
      title: 'caregiverProfile.qualification',
      content: caregiverInfo.qualifications.map((qualification) => (
        <SectionItem key={qualification.id}>{qualification.name}</SectionItem>
      )),
    },
    {
      title: 'caregiverProfile.workExperience',
      content: caregiverInfo.workExperiences.map((workExperience) => (
        <SectionItem key={workExperience.id}>{workExperience.workplace}</SectionItem>
      )),
    },
    {
      title: 'caregiverProfile.skills',
      content: caregiverInfo.caregiverInfo.services.map((service) => (
        <SectionItem key={service}>{service}</SectionItem>
      )),
    },
    {
      title: 'caregiverProfile.availability',
      content: caregiverInfo.caregiverInfo.availability.map((availability) => (
        <Fragment key={availability.day}>
          <SectionItem>{availability.day}</SectionItem>
          <SectionItem>
            {availability.startTime} &#8212; {availability.endTime}
          </SectionItem>
        </Fragment>
      )),
    },
    {
      title: 'caregiverProfile.rate',
      content: (
        <SectionItem>
          &#36;{caregiverInfo.caregiverInfo.hourlyRate}/{translate('caregiverProfile.perHour')}
        </SectionItem>
      ),
    },
    {
      title: 'caregiverProfile.bio',
      content: (
        <>
          <SectionItem>{caregiverInfo.caregiverInfo.description}</SectionItem>
          <Video src={caregiverInfo.caregiverInfo.videoLink} />
        </>
      ),
    },
  ];

  const handleModalOpen = (stepIndex?: number): void => {
    if (stepIndex !== undefined) {
      setActiveStepIndex(stepIndex);
    }

    setIsStepModalOpen(true);
  };

  const handleModalClose = (): void => {
    refetchCaregiverInfo();
    setIsStepModalOpen(false);
  };

  return {
    handleModalClose,
    handleModalOpen,
    ActiveStepLabel: STEPS[activeStepIndex].label,
    ActiveStepComponent: STEPS[activeStepIndex].component,
    CAREGIVER_INFO_SECTIONS,
    translate,
    isStepModalOpen,
    servicesUpdated,
    setServicesUpdated,
    availabilityUpdated,
    setAvailabilityUpdated,
    rateUpdated,
    setRateUpdated,
    bioUpdated,
    setBioUpdated,
  };
}
