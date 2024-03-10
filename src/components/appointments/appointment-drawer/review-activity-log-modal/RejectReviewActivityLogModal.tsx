import { Button, FilledInput, FormControl, InputLabel } from '@mui/material';

import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Container, DoubleButtonBox, ErrorMessage } from './styles';
import {
  RejectReviewActivityLogModalFormValues,
  useRejectReviewActivityLogModalSchema,
} from './validation';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (reason?: string) => void;
}

export default function RejectReviewActivityLogModal({
  onClose,
  isOpen,
  onSubmit,
}: IProps): JSX.Element {
  const { translate } = useLocales();

  const rejectReviewActivityLogModalSchema = useRejectReviewActivityLogModalSchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RejectReviewActivityLogModalFormValues>({
    resolver: yupResolver(rejectReviewActivityLogModalSchema),
    mode: 'onChange',
  });

  const handleSubmitClick: SubmitHandler<RejectReviewActivityLogModalFormValues> = async (data) => {
    try {
      await onSubmit(data.reason);
    } catch (error) {
      throw new Error(error);
    }
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      title={translate('appointments_page.reject')}
      isActive={isOpen}
      footerChildren={
        <Button
          type="submit"
          fullWidth
          disabled={!isDirty || !isValid}
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleSubmitClick)}
        >
          {translate('appointments_page.confirm')}
        </Button>
      }
    >
      <Container>
        <DoubleButtonBox>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="workplace">
              {translate('appointments_page.rejectReviewActivityLogModal.specifyReason')}
            </InputLabel>
            <FilledInput {...register('reason')} error={!!errors.reason} />
            {errors?.reason && <ErrorMessage>{errors.reason?.message}</ErrorMessage>}
          </FormControl>
        </DoubleButtonBox>
      </Container>
    </Modal>
  );
}
