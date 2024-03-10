import { Create, Delete } from '@mui/icons-material';
import { Box, Divider, IconButton, List, ListItem } from '@mui/material';
import { parse } from 'date-fns';
import { useState } from 'react';

import CertificateForm from 'src/components/profile/profile-qualification/certificate-form/CertificateForm';
import {
  ButtonWrapper,
  StyledButton,
  StyledListItemButton,
  SubTitle,
  Title,
} from 'src/components/profile/profile-qualification/certificate-list/styles';
import { ProfileQuality } from 'src/components/profile/profile-qualification/types';
import Modal from 'src/components/reusable/modal/Modal';
import UpdateSuccess from 'src/components/reusable/update-success/UpdateSuccess';
import { BACKEND_DATE_FORMAT } from 'src/constants';
import { useLocales } from 'src/locales';
import { profileApi } from 'src/redux/api/profileCompleteApi';
import { saveCertificates } from 'src/redux/slices/certificateSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';

type Props = {
  onClose: () => void;
  onOpen: () => void;
  onNext: () => void;
  onEdit: (certificate: ProfileQuality) => void;
  onSave: (updatedCertificate: ProfileQuality) => void;
  isModalActive: boolean;
  editingCertificate: ProfileQuality | null;
};

export default function CertificateList({
  isModalActive,
  onClose,
  onOpen,
  onNext,
  onEdit,
  onSave,
  editingCertificate,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [deleteCertificateId, setDeleteCertificateId] = useState<string>('');
  const [certificateUpdated, setCertificateUpdated] = useState<boolean>(false);

  const [createCertificate] = profileApi.useCreateCertificateMutation();
  const dispatch = useAppDispatch();
  const certificates = useTypedSelector((state) => state.certificate.certificates);

  const onDeleteModalClose = (): void => setIsDeleteModalActive(false);
  const onDeleteModalOpen = (): void => setIsDeleteModalActive(true);

  const onSaveCertificateId = (certificateId: string): void => {
    onDeleteModalOpen();
    setDeleteCertificateId(certificateId);
  };
  const onDeleteCertificate = async (): Promise<void> => {
    const filteredCertificates = certificates.filter(
      (certificate) => certificate.id !== deleteCertificateId
    );
    try {
      await createCertificate({
        certificates: filteredCertificates,
      })
        .unwrap()
        .then(() => {
          dispatch(saveCertificates(filteredCertificates));
          setCertificateUpdated(true);
        })
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => onDeleteModalClose());
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <SubTitle>{translate('profileQualification.subTitle')}</SubTitle>
      <List disablePadding>
        {certificates.map((certificate) => (
          <ListItem
            key={certificate.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={(): void =>
                    onEdit({
                      ...certificate,
                      isExpirationDateDisabled: !certificate.expirationDate,
                      dateIssued: parse(
                        certificate.dateIssued as string,
                        BACKEND_DATE_FORMAT,
                        new Date()
                      ),
                      expirationDate: certificate.expirationDate
                        ? parse(
                            certificate.expirationDate as string,
                            BACKEND_DATE_FORMAT,
                            new Date()
                          )
                        : undefined,
                    })
                  }
                >
                  <Create />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(): void => onSaveCertificateId(certificate.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
            disablePadding
          >
            <StyledListItemButton disableGutters>{certificate.name}</StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <ButtonWrapper>
        <Divider />
        <StyledButton variant="outlined" onClick={onOpen}>
          {translate('profileQualification.addCertificate')}
        </StyledButton>

        <StyledButton variant="contained" onClick={onNext}>
          {translate('profileQualification.next')}
        </StyledButton>
      </ButtonWrapper>

      <Modal
        title={translate('profileQualification.editQualification')}
        onClose={onClose}
        isActive={isModalActive}
      >
        <CertificateForm
          editingCertificate={editingCertificate}
          onSave={onSave}
          onClose={onClose}
          onSuccess={(): void => setCertificateUpdated(true)}
        />
      </Modal>

      <Modal
        isActive={isDeleteModalActive}
        onClose={onDeleteModalClose}
        title={translate('profileQualification.deleteCertificate')}
      >
        <Box display="flex" flexDirection="column">
          <Title>{translate('profileQualification.deleteWarning')}</Title>

          <Box display="flex" gap={2}>
            <StyledButton variant="contained" onClick={onDeleteModalClose}>
              {translate('profileQualification.return')}
            </StyledButton>

            <StyledButton variant="contained" color="error" onClick={onDeleteCertificate}>
              {translate('profileQualification.delete')}
            </StyledButton>
          </Box>
        </Box>
      </Modal>

      <UpdateSuccess
        dataUpdated={certificateUpdated}
        setDataUpdated={setCertificateUpdated}
        message={translate('profileQualification.updatedSuccess')}
      />
    </>
  );
}
