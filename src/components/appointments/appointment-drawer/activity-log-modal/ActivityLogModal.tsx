import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/redux/store';

import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';
import { ActivityLogStatus, activityLogApi } from 'src/redux/api/activityLogApi';
import { SeekerTask, appointmentApi } from 'src/redux/api/appointmentApi';

import {
  Container,
  DoubleButtonBox,
  ErrorMessage,
  StyledCheckBoxLabel,
  StyledTask,
  StyledTaskList,
  StyledTitle,
} from './styles';
import { ActivityLogModalFormValues, useActivityLogModalSchema } from './validation';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  seekerTasks: SeekerTask[];
  appointmentId: string;
}

export default function ActivityLogModal({
  onClose,
  seekerTasks,
  isOpen,
  appointmentId,
}: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  const activityLogModalSchema = useActivityLogModalSchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ActivityLogModalFormValues>({
    resolver: yupResolver(activityLogModalSchema),
  });

  const [createActivityLog] = activityLogApi.useCreateActivityLogMutation();

  const onSubmit: SubmitHandler<ActivityLogModalFormValues> = async (data) => {
    const { tasks } = data;
    try {
      await createActivityLog({
        appointmentId,
        status: ActivityLogStatus.Pending,
        tasks,
      })
        .unwrap()
        .then(() => {
          dispatch(
            appointmentApi.util.invalidateTags([{ type: 'Appointments', id: appointmentId }])
          );
        });
    } catch (error) {
      throw new Error(error);
    }
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      title={translate('appointments_page.activityLog')}
      isActive={isOpen}
      footerChildren={
        <Button
          type="submit"
          fullWidth
          disabled={!isDirty || !isValid}
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {translate('appointments_page.confirm')}
        </Button>
      }
    >
      <Container>
        <DoubleButtonBox>
          <StyledTitle>{translate('appointments_page.completedTasks')}</StyledTitle>
          <StyledTaskList>
            {seekerTasks.map((task) => (
              <StyledTask key={task.name}>
                <FormControlLabel
                  name={task.name}
                  control={<Checkbox {...register('tasks')} value={task.name} />}
                  label={<StyledCheckBoxLabel>{task.name}</StyledCheckBoxLabel>}
                />
              </StyledTask>
            ))}
          </StyledTaskList>
        </DoubleButtonBox>
        {errors?.tasks && <ErrorMessage>{errors.tasks?.message}</ErrorMessage>}
      </Container>
    </Modal>
  );
}
