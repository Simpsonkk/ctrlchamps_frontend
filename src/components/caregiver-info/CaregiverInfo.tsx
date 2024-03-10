import { Background, MainTitle, Wrapper } from 'src/components/caregiver-info/styles';
import { Caregiver } from 'src/types/Caregiver.type';
import Modal from 'src/components/reusable/modal/Modal';
import { ProfileWrapper } from 'src/components/reusable/profile-wrapper/ProfileWrapper';
import CaregiverInfoSection from 'src/components/caregiver-info/caregiver-info-section/CaregiverInfoSection';
import useCaregiverInfo from 'src/components/caregiver-info/hooks';
import UpdateSuccess from 'src/components/reusable/update-success/UpdateSuccess';

type Props = {
  caregiverInfo: Caregiver;
  refetchCaregiverInfo: () => void;
};

export default function CaregiverInfo({ caregiverInfo, refetchCaregiverInfo }: Props): JSX.Element {
  const {
    ActiveStepComponent,
    ActiveStepLabel,
    CAREGIVER_INFO_SECTIONS,
    handleModalClose,
    handleModalOpen,
    isStepModalOpen,
    translate,
    servicesUpdated,
    setServicesUpdated,
    availabilityUpdated,
    setAvailabilityUpdated,
    rateUpdated,
    setRateUpdated,
    bioUpdated,
    setBioUpdated,
  } = useCaregiverInfo({ caregiverInfo, refetchCaregiverInfo });

  return (
    <Background>
      <Wrapper>
        <MainTitle>{translate('caregiverProfile.title')}</MainTitle>

        {CAREGIVER_INFO_SECTIONS.map((section, index) => (
          <CaregiverInfoSection
            key={section.title}
            onClick={(): void => handleModalOpen(index)}
            title={translate(section.title)}
          >
            {section.content}
          </CaregiverInfoSection>
        ))}

        <Modal onClose={handleModalClose} title={ActiveStepLabel} isActive={isStepModalOpen}>
          <ProfileWrapper>{ActiveStepComponent}</ProfileWrapper>
        </Modal>
      </Wrapper>
      <UpdateSuccess
        dataUpdated={servicesUpdated}
        setDataUpdated={setServicesUpdated}
        message={translate('caregiverProfile.servicesSuccess')}
      />
      <UpdateSuccess
        dataUpdated={availabilityUpdated}
        setDataUpdated={setAvailabilityUpdated}
        message={translate('caregiverProfile.availabilitySuccess')}
      />
      <UpdateSuccess
        dataUpdated={rateUpdated}
        setDataUpdated={setRateUpdated}
        message={translate('caregiverProfile.rateSuccess')}
      />
      <UpdateSuccess
        dataUpdated={bioUpdated}
        setDataUpdated={setBioUpdated}
        message={translate('caregiverProfile.bioSuccess')}
      />
    </Background>
  );
}
