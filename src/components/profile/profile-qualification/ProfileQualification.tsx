import { useEffect, useState } from 'react';

import { Title } from 'src/components/profile/profile-qualification/styles';
import CertificateList from 'src/components/profile/profile-qualification/certificate-list/CertificateList';
import { ProfileQuality } from 'src/components/profile/profile-qualification/types';
import { useLocales } from 'src/locales';
import { profileApi } from 'src/redux/api/profileCompleteApi';
import { saveCertificates } from 'src/redux/slices/certificateSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import CertificateForm from './certificate-form/CertificateForm';

type Props = {
  onNext: () => void;
};

export default function ProfileQualification({ onNext }: Props): JSX.Element | null {
  const [editingCertificate, setEditingCertificate] = useState<ProfileQuality | null>(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const certificates = useTypedSelector((state) => state.certificate.certificates);

  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const [getCertificates] = profileApi.useLazyGetCertificateQuery();
  const [createCertificate] = profileApi.useCreateCertificateMutation();

  useEffect(() => {
    getCertificates()
      .unwrap()
      .then((data) => dispatch(saveCertificates(data)))
      .catch(() => {
        dispatch(saveCertificates([]));
      });
  }, [dispatch, getCertificates]);

  const onOpenModal = (): void => setIsModalActive(true);
  const onOpenEditModal = (certificate: ProfileQuality): void => {
    setEditingCertificate(certificate);
    setIsModalActive(true);
  };

  const onCloseModal = (): void => {
    setEditingCertificate(null);
    setIsModalActive(false);
  };

  const onSaveCertificate = async (updatedCertificate: ProfileQuality): Promise<void> => {
    const updatedCertificates = certificates.map((certificate) => {
      if (certificate.id === updatedCertificate.id) {
        return { ...certificate, ...updatedCertificate };
      }

      return certificate;
    });

    try {
      createCertificate({
        certificates: updatedCertificates,
      })
        .unwrap()
        .then(() => {
          dispatch(saveCertificates(updatedCertificates));
        })
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => onCloseModal());
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Title>{translate('profileQualification.mainTitle')}</Title>
      {!certificates.length ? (
        <CertificateForm
          onSave={onSaveCertificate}
          onClose={onCloseModal}
          editingCertificate={editingCertificate}
        />
      ) : (
        <CertificateList
          onNext={onNext}
          onClose={onCloseModal}
          onOpen={onOpenModal}
          isModalActive={isModalActive}
          onEdit={onOpenEditModal}
          editingCertificate={editingCertificate}
          onSave={onSaveCertificate}
        />
      )}
    </>
  );
}
