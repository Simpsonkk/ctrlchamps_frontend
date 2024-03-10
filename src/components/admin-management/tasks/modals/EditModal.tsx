import { Box, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

import { StyledButton } from 'src/components/admin-management/styles';
import { ErrorText } from 'src/components/reusable';
import Modal from 'src/components/reusable/modal/Modal';
import Popup from 'src/components/reusable/popup/Popup';
import { useLocales } from 'src/locales';
import { Task, useEditTaskMutation } from 'src/redux/api/tasksApi';

import { MAX_TASK_LENGTH, MIN_TASK_LENGTH } from '../constants';

type Props = {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
};

export default function EditModal({ isModalActive, setIsModalActive, task }: Props): JSX.Element {
  const { translate } = useLocales();
  const [editTask, { isLoading }] = useEditTaskMutation();

  const [taskValue, setTaskValue] = useState<string>(task.name);
  const [isError, setIsError] = useState<boolean>(false);

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskValue(event.target.value);
  };

  const closeModal = (): void => setIsModalActive(false);

  const cancelEdit = (): void => {
    setTaskValue(task.name);
    closeModal();
  };

  const saveEditedTask = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await editTask({ id: task.id, name: taskValue });
      closeModal();
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Modal
      isActive={isModalActive}
      onClose={cancelEdit}
      title={translate('taskManagement.editTask')}
    >
      <form onSubmit={(e): Promise<void> => saveEditedTask(e)}>
        <Box display="flex" flexDirection="column" width={400}>
          <TextField
            value={taskValue}
            onChange={handleTaskChange}
            size="medium"
            autoComplete="off"
            variant="outlined"
            placeholder={translate('taskManagement.editTaskPlaceholder')}
          />
          {taskValue.length > 0 && taskValue.trim().length < MIN_TASK_LENGTH && (
            <ErrorText mt={1}>{translate('taskManagement.taskMinLength')}</ErrorText>
          )}

          {taskValue.trim().length > MAX_TASK_LENGTH && (
            <ErrorText mt={1}>{translate('taskManagement.taskMaxLength')}</ErrorText>
          )}
          <Box display="flex" gap={2} marginTop="20px">
            <StyledButton variant="contained" color="error" onClick={cancelEdit}>
              {translate('taskManagement.cancel')}
            </StyledButton>

            <StyledButton
              variant="contained"
              type="submit"
              disabled={
                isLoading ||
                taskValue.trim().length < MIN_TASK_LENGTH ||
                taskValue.trim().length > MAX_TASK_LENGTH
              }
            >
              {translate('taskManagement.save')}
            </StyledButton>
          </Box>
          <Popup
            isOpen={isError}
            onClose={(): void => {
              setIsError(false);
            }}
            text={translate('taskManagement.failedToUpdate')}
            severity="error"
          />
        </Box>
      </form>
    </Modal>
  );
}
