import { Box } from '@mui/material';
import { useState } from 'react';

import { StyledButton, Title } from 'src/components/admin-management/styles';
import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';
import { useDeleteTaskMutation } from 'src/redux/api/tasksApi';
import Popup from 'src/components/reusable/popup/Popup';

type Props = {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
};

export default function DeleteModal({
  isModalActive,
  setIsModalActive,
  taskId,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const [isError, setIsError] = useState<boolean>(false);

  const closeModal = (): void => setIsModalActive(false);

  const deleteSeekerTask = async (): Promise<void> => {
    try {
      await deleteTask({ id: taskId });
      closeModal();
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Modal
      isActive={isModalActive}
      onClose={closeModal}
      title={translate('taskManagement.deleteTask')}
    >
      <Box display="flex" flexDirection="column" width={400}>
        <Title align="center">{translate('taskManagement.deleteWarning')}</Title>

        <Box display="flex" gap={2}>
          <StyledButton variant="contained" onClick={closeModal}>
            {translate('taskManagement.cancel')}
          </StyledButton>

          <StyledButton
            variant="contained"
            color="error"
            onClick={deleteSeekerTask}
            disabled={isLoading}
          >
            {translate('taskManagement.ok')}
          </StyledButton>
        </Box>
        <Popup
          isOpen={isError}
          onClose={(): void => {
            setIsError(false);
          }}
          text={translate('taskManagement.failedToDelete')}
          severity="error"
        />
      </Box>
    </Modal>
  );
}
