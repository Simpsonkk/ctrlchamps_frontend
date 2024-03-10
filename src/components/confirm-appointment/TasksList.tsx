import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useState } from 'react';
import CheckIcon from 'src/assets/icons/Check';
import CreditCardIcon from 'src/assets/icons/CreditCardIcon';
import EditIcon from 'src/assets/icons/EditIcon';
import ConfirmModal from 'src/components/confirm-appointment/Modal';
import {
  ButtonWrapper,
  StyledButton,
} from 'src/components/profile/profile-qualification/certificate-list/styles';
import { ErrorText, FilledButton } from 'src/components/reusable';
import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';
import { useGetAllTasksQuery } from 'src/redux/api/tasksApi';
import { CONFIRM_NOTE_MAX_LENGTH, NO_LIMIT } from './constants';
import {
  Background,
  BtnContainer,
  ChargeMessage,
  ConfirmModalContainer,
  CustomTasksContainer,
  EditButton,
  ModalContainer,
  ModalContent,
  StyledForm,
  Task,
  TasksBtns,
  TasksContainer,
  Typography,
} from './style';
import { Props } from './types';

export default function TasksList({
  tasks,
  setTasks,
  details,
  setDetails,
  isModalActive,
  onClose,
  onOpen,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const [chosenTasks, setChosenTasks] = useState<string[]>([]);
  const [customTasks, setCustomTasks] = useState<string[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<string>('');
  const [taskToEditValue, setTaskToEditValue] = useState<string>('');
  const [newTask, setNewTask] = useState<string>('');
  const [isAddModalActive, setIsAddModalActive] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditOpenModal] = useState<boolean>(false);

  const { data: defaultTasks } = useGetAllTasksQuery({
    limit: NO_LIMIT,
  });

  const onAddModalClose = (): void => setIsAddModalActive(false);
  const onAddModalOpen = (): void => setIsAddModalActive(true);

  const onEditModalOpen = (): void => setIsEditOpenModal(true);
  const onEditModalClose = (): void => setIsEditOpenModal(false);

  const chooseTask = (task: string): void => {
    if (!chosenTasks.includes(task)) {
      setChosenTasks([...chosenTasks, task]);
    } else {
      const filteredTasks = chosenTasks.filter((el) => el !== task);
      setChosenTasks(filteredTasks);
    }
  };

  const saveTasks = (): void => {
    setTasks(chosenTasks);
    onClose();
  };

  const editTask = (task: string): void => {
    const customFilteredTasks = customTasks.map((el) => {
      if (el === taskToEditValue) el = task;

      return el;
    });

    const filteredTasks = chosenTasks.filter((el) => el !== taskToEditValue);
    setCustomTasks(customFilteredTasks);
    setChosenTasks([...filteredTasks, task]);
    onEditModalClose();
  };

  const addCustomTask = (): void => {
    setCustomTasks((prev) => [...prev, newTask]);
    setChosenTasks((prev) => [...prev, newTask]);
    onAddModalClose();
    setNewTask('');
  };

  const editCustomTask = (task: string): void => {
    onEditModalOpen();
    setTaskToEditValue(task);
    setTaskToEdit(task);
  };

  const deleteCustomTask = (task: string): void => {
    const filterTasks = (tasksToFilter: string[]): string[] =>
      tasksToFilter.filter((el) => el !== task);

    setChosenTasks(filterTasks(chosenTasks));
    setCustomTasks(filterTasks(customTasks));
  };

  return (
    <>
      <ButtonWrapper>
        <StyledButton variant="outlined" onClick={onOpen} sx={{ mt: 3 }}>
          {tasks.length > 0
            ? translate('confirm_appointment.add_more')
            : translate('confirm_appointment.add_task')}
        </StyledButton>
        <TextField
          sx={{ mt: 5 }}
          variant="standard"
          autoComplete="off"
          value={details}
          onChange={(e): void => setDetails(e.target.value)}
          placeholder={translate('confirm_appointment.details')}
        />
        {details.length > CONFIRM_NOTE_MAX_LENGTH && (
          <ErrorText>{translate('confirm_appointment.max_length_message')}</ErrorText>
        )}
        {tasks.length > 0 && (
          <ChargeMessage>
            <CreditCardIcon />
            {translate('confirm_appointment.charge_message')}
          </ChargeMessage>
        )}
      </ButtonWrapper>

      <ConfirmModal
        title={translate('confirm_appointment.tasks')}
        onClose={onClose}
        isActive={isModalActive}
      >
        <>
          <ConfirmModalContainer>
            <Background>
              {customTasks.length > 0 && (
                <CustomTasksContainer>
                  <Typography>{translate('confirm_appointment.custom')}</Typography>
                  {customTasks.map((task) => (
                    <Task key={task}>
                      {task}
                      <BtnContainer>
                        <EditButton onClick={(): void => editCustomTask(task)}>
                          <EditIcon />
                        </EditButton>
                        <CloseIcon onClick={(): void => deleteCustomTask(task)} />
                      </BtnContainer>
                    </Task>
                  ))}
                </CustomTasksContainer>
              )}
            </Background>
            <TasksContainer>
              {defaultTasks?.data.map((task) => (
                <Task key={task.id} onClick={(): void => chooseTask(task.name)}>
                  {task.name} {chosenTasks.includes(task.name) && <CheckIcon />}
                </Task>
              ))}
              {customTasks.map((task) => (
                <Task key={task} onClick={(): void => chooseTask(task)}>
                  {task} {chosenTasks.includes(task) && <CheckIcon />}
                </Task>
              ))}
            </TasksContainer>
          </ConfirmModalContainer>
          <TasksBtns>
            <StyledButton variant="outlined" onClick={(): void => onAddModalOpen()}>
              {translate('confirm_appointment.add_custom')}
            </StyledButton>
            <FilledButton onClick={(): void => saveTasks()}>
              {translate('confirm_appointment.save')}
            </FilledButton>
          </TasksBtns>
        </>
      </ConfirmModal>

      <Modal
        isActive={isAddModalActive}
        onClose={onAddModalClose}
        title={translate('confirm_appointment.add_custom')}
      >
        <ModalContainer>
          <ModalContent>
            <StyledForm>
              <TextField
                fullWidth
                label={translate('confirm_appointment.task_label')}
                variant="standard"
                value={newTask}
                onChange={(e): void => setNewTask(e.target.value)}
              />
              <StyledButton
                type="submit"
                onClick={addCustomTask}
                disabled={!newTask.trim().length}
                variant="contained"
              >
                {translate('confirm_appointment.add')}
              </StyledButton>
            </StyledForm>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Modal
        isActive={isEditModalOpen}
        onClose={onEditModalClose}
        title={translate('confirm_appointment.edit')}
      >
        <ModalContainer>
          <ModalContent>
            <StyledForm>
              <TextField
                label={translate('confirm_appointment.task_label')}
                variant="standard"
                value={taskToEdit}
                onChange={(e): void => setTaskToEdit(e.target.value)}
              />
              <StyledButton
                type="submit"
                onClick={(): void => editTask(taskToEdit)}
                variant="contained"
              >
                {translate('confirm_appointment.save')}
              </StyledButton>
            </StyledForm>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
}
