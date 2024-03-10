import { useState, useEffect } from 'react';

import { useLocales } from 'src/locales';
import WorkForm from 'src/components/complete-profile-second/work-form/WorkForm';
import WorkList from 'src/components/complete-profile-second/work-list/WorkList';
import { profileApi } from 'src/redux/api/profileCompleteApi';
import { saveWorkExperiences } from 'src/redux/slices/workEperienceSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { ProfileExperience } from 'src/components/complete-profile-second/types';
import { Title } from 'src/components/complete-profile-second/styles';

interface IProps {
  onNext: () => void;
  onBack: () => void;
}

export default function CompleteProfileSecond({ onNext, onBack }: IProps): JSX.Element | null {
  const [editingWorkPlaces, setEditingWorkPlaces] = useState<ProfileExperience | null>(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const workPlaces = useTypedSelector((state) => state.workExperience.workExperiences);

  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const [getWorkExperiences] = profileApi.useLazyGetWorkExperienceQuery();
  const [createWorkPlace] = profileApi.useCreateWorkExperienceMutation();

  useEffect(() => {
    getWorkExperiences()
      .unwrap()
      .then((data) => dispatch(saveWorkExperiences(data)))
      .catch(() => {
        dispatch(saveWorkExperiences([]));
      });
  }, [dispatch, getWorkExperiences]);

  const onOpenModal = (): void => setIsModalActive(true);

  const onOpenEditModal = (workPlace: ProfileExperience): void => {
    setEditingWorkPlaces(workPlace);
    setIsModalActive(true);
  };

  const onCloseModal = (): void => {
    setEditingWorkPlaces(null);
    setIsModalActive(false);
  };

  const onSaveWorkPlace = async (updatedWorkPlace: ProfileExperience): Promise<void> => {
    const updatedWorkPlaces = workPlaces.map((workPlace) => {
      if (workPlace.id === updatedWorkPlace.id) {
        return { ...workPlace, ...updatedWorkPlace };
      }

      return workPlace;
    });

    try {
      createWorkPlace({
        workExperiences: updatedWorkPlaces,
      })
        .unwrap()
        .then(() => {
          dispatch(saveWorkExperiences(updatedWorkPlaces));
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
      <Title>{translate('completeProfileSecond.title')}</Title>
      {!workPlaces.length ? (
        <WorkForm
          onSave={onSaveWorkPlace}
          onClose={onCloseModal}
          editingWorkPlaces={editingWorkPlaces}
        />
      ) : (
        <WorkList
          onNext={onNext}
          onBack={onBack}
          onClose={onCloseModal}
          onOpen={onOpenModal}
          isModalActive={isModalActive}
          onEdit={onOpenEditModal}
          editingWorkPlaces={editingWorkPlaces}
          onSave={onSaveWorkPlace}
        />
      )}
    </>
  );
}
