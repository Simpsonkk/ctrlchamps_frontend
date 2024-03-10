import { Box, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

import { StyledButton } from 'src/components/admin-management/styles';
import Modal from 'src/components/reusable/modal/Modal';
import Popup from 'src/components/reusable/popup/Popup';
import { useLocales } from 'src/locales';
import { useCreateTaskMutation } from 'src/redux/api/tasksApi';
import { ErrorText } from 'src/components/reusable';

import { MAX_TASK_LENGTH, MIN_TASK_LENGTH } from '../constants';

type Props = {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddModal({ isModalActive, setIsModalActive }: Props): JSX.Element {
  const { translate } = useLocales();

  const [taskValue, setTaskValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskValue(event.target.value);
  };

  const closeModal = (): void => {
    setIsModalActive(false);
    setTaskValue('');
  };

  const saveTask = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await createTask({ name: taskValue });
      closeModal();
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Modal
      isActive={isModalActive}
      onClose={closeModal}
      title={translate('taskManagement.enterTask')}
    >
      <form onSubmit={(e): Promise<void> => saveTask(e)}>
        <Box display="flex" flexDirection="column" width={400}>
          <TextField
            value={taskValue}
            onChange={handleTaskChange}
            size="medium"
            autoComplete="off"
            variant="outlined"
            placeholder={translate('taskManagement.taskPlaceholder')}
          />

          {taskValue.length > 0 && taskValue.trim().length < MIN_TASK_LENGTH && (
            <ErrorText mt={1}>{translate('taskManagement.taskMinLength')}</ErrorText>
          )}

          {taskValue.trim().length > MAX_TASK_LENGTH && (
            <ErrorText mt={1}>{translate('taskManagement.taskMaxLength')}</ErrorText>
          )}

          <Box display="flex" gap={2} marginTop="20px">
            <StyledButton variant="contained" color="error" onClick={closeModal}>
              {translate('taskManagement.cancel')}
            </StyledButton>

            <StyledButton
              type="submit"
              variant="contained"
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
            text={translate('taskManagement.failedToCreate')}
            severity="error"
          />
        </Box>
      </form>
    </Modal>
  );
}
