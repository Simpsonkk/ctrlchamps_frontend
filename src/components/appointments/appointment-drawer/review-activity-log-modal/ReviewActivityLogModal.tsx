import { Button } from '@mui/material';
import { useAppDispatch } from 'src/redux/store';

import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';
import { ActivityLog, ActivityLogStatus, activityLogApi } from 'src/redux/api/activityLogApi';

import { useState } from 'react';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import RejectReviewActivityLogModal from './RejectReviewActivityLogModal';
import { getLatestPendingActivityLog } from './helpers';
import {
  Container,
  DoubleButtonBox,
  ModalFooter,
  StyledTask,
  StyledTaskList,
  StyledTitle,
} from './styles';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  activityLog: ActivityLog[];
}

export default function ReviewActivityLogModal({
  onClose,
  isOpen,
  activityLog,
}: IProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);

  const [updateActivityLog] = activityLogApi.useUpdateActivityLogMutation();

  const pendingActivityLog = getLatestPendingActivityLog(activityLog);

  if (!pendingActivityLog) return null;

  const { id, appointmentId, tasks } = pendingActivityLog;

  const onSubmit = async (reason?: string): Promise<void> => {
    try {
      await updateActivityLog({
        id,
        status: reason ? ActivityLogStatus.Rejected : ActivityLogStatus.Approved,
        reason,
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

  const handleRejectClick = (): void => {
    setIsRejectModalOpen(true);
  };

  const handleRejectModalClose = (): void => {
    setIsRejectModalOpen(false);
  };

  return (
    <>
      <Modal
        onClose={onClose}
        title={translate('appointments_page.reviewActivityLog')}
        isActive={isOpen}
        footerChildren={
          <ModalFooter>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleRejectClick}
            >
              {translate('appointments_page.reject')}
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(): Promise<void> => onSubmit()}
            >
              {translate('appointments_page.confirm')}
            </Button>
          </ModalFooter>
        }
      >
        <Container>
          <StyledTitle>{translate('appointments_page.completedTasks')}</StyledTitle>
          <DoubleButtonBox>
            <StyledTaskList>
              {tasks.map((task) => (
                <StyledTask key={task}>{task}</StyledTask>
              ))}
            </StyledTaskList>
          </DoubleButtonBox>
        </Container>
      </Modal>
      {isRejectModalOpen && (
        <RejectReviewActivityLogModal
          isOpen={isRejectModalOpen}
          onClose={handleRejectModalClose}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
