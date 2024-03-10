import { useState } from 'react';
import { Box, Divider, IconButton, List, ListItem } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';
import { parse } from 'date-fns';

import { useCreateWorkExperienceMutation } from 'src/redux/api/profileCompleteApi';
import { saveWorkExperiences } from 'src/redux/slices/workEperienceSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import WorkForm from 'src/components/complete-profile-second/work-form/WorkForm';
import Modal from 'src/components/reusable/modal/Modal';
import UpdateSuccess from 'src/components/reusable/update-success/UpdateSuccess';
import { ProfileExperience } from 'src/components/complete-profile-second/types';
import { BACKEND_DATE_FORMAT } from 'src/constants';
import { useLocales } from 'src/locales';
import {
  ButtonWrapper,
  StyledListItemButton,
  SubTitle,
  StyledButton,
  Title,
} from 'src/components/complete-profile-second/work-list/styles';

type Props = {
  onClose: () => void;
  onOpen: () => void;
  onNext: () => void;
  onBack: () => void;
  onEdit: (workPlace: ProfileExperience) => void;
  onSave: (updatedWorkPlace: ProfileExperience) => void;
  isModalActive: boolean;
  editingWorkPlaces: ProfileExperience | null;
};

export default function WorkList({
  isModalActive,
  onClose,
  onOpen,
  onNext,
  onBack,
  onEdit,
  onSave,
  editingWorkPlaces,
}: Props): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [deleteWorkPlaceId, setDeleteWorkPlaceId] = useState<string>('');
  const [workUpdated, setWorkUpdated] = useState<boolean>(false);

  const [createWorkPlace] = useCreateWorkExperienceMutation();
  const workplaces = useTypedSelector((state) => state.workExperience.workExperiences);

  const onDeleteModalClose = (): void => setIsDeleteModalActive(false);
  const onDeleteModalOpen = (): void => setIsDeleteModalActive(true);

  const onSaveWorkPlaceId = (workPlaceId: string): void => {
    onDeleteModalOpen();
    setDeleteWorkPlaceId(workPlaceId);
  };

  const onDeleteWorkPlace = async (): Promise<void> => {
    const filteredWorkPlaces = workplaces.filter((workPlace) => workPlace.id !== deleteWorkPlaceId);
    try {
      await createWorkPlace({
        workExperiences: filteredWorkPlaces,
      })
        .unwrap()
        .then(() => {
          dispatch(saveWorkExperiences(filteredWorkPlaces));
          setWorkUpdated(true);
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
      <SubTitle>{translate('completeProfileSecond.subTitle')}</SubTitle>
      <List disablePadding>
        {workplaces.map((workPlace) => (
          <ListItem
            key={workPlace.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={(): void =>
                    onEdit({
                      ...workPlace,
                      isEndDateDisabled: !workPlace.endDate,
                      startDate: parse(
                        workPlace.startDate as string,
                        BACKEND_DATE_FORMAT,
                        new Date()
                      ),
                      endDate: workPlace.endDate
                        ? parse(workPlace.endDate as string, BACKEND_DATE_FORMAT, new Date())
                        : undefined,
                    })
                  }
                >
                  <Create />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(): void => onSaveWorkPlaceId(workPlace.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
            disablePadding
          >
            <StyledListItemButton disableGutters>{workPlace.workplace}</StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <ButtonWrapper>
        <Divider />
        <StyledButton variant="outlined" onClick={onOpen}>
          {translate('completeProfileSecond.addWorkPlace')}
        </StyledButton>
        <Box display="flex" gap={1}>
          <StyledButton variant="outlined" onClick={onBack}>
            {translate('profileQualification.back')}
          </StyledButton>
          <StyledButton variant="contained" onClick={onNext}>
            {translate('profileQualification.next')}
          </StyledButton>
        </Box>
      </ButtonWrapper>

      <Modal
        title={translate('completeProfileSecond.editWorkPlace')}
        onClose={onClose}
        isActive={isModalActive}
      >
        <WorkForm
          editingWorkPlaces={editingWorkPlaces}
          onSave={onSave}
          onClose={onClose}
          onSuccess={(): void => setWorkUpdated(true)}
        />
      </Modal>

      <Modal
        isActive={isDeleteModalActive}
        onClose={onDeleteModalClose}
        title={translate('completeProfileSecond.deleteWorkPlace')}
      >
        <Box display="flex" flexDirection="column">
          <Title>{translate('completeProfileSecond.deleteWarning')}</Title>
          <Box display="flex" gap={2}>
            <StyledButton variant="contained" onClick={onDeleteModalClose}>
              {translate('completeProfileSecond.return')}
            </StyledButton>
            <StyledButton variant="contained" color="error" onClick={onDeleteWorkPlace}>
              {translate('completeProfileSecond.delete')}
            </StyledButton>
          </Box>
        </Box>
      </Modal>

      <UpdateSuccess
        dataUpdated={workUpdated}
        setDataUpdated={setWorkUpdated}
        message={translate('completeProfileSecond.updatedSuccess')}
      />
    </>
  );
}
