import { useLocales } from 'src/locales';
import { removeToken } from 'src/redux/slices/tokenSlice';
import { removeUser } from 'src/redux/slices/userSlice';
import { useAppDispatch } from 'src/redux/store';
import { CancelBtn, Container, DoubleButtonBox, StyledButton, SubTitle } from './styles';

interface IProps {
  onClose: () => void;
}

export default function LogOutModal({ onClose }: IProps): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const handleLogOut = async (): Promise<void> => {
    try {
      dispatch(removeToken());
      dispatch(removeUser());
      onClose();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container>
      <SubTitle>{translate('logOutModal.text')}</SubTitle>
      <DoubleButtonBox>
        <CancelBtn onClick={handleLogOut} type="button" variant="outlined">
          {translate('logOutModal.logOutBtn')}
        </CancelBtn>
        <StyledButton type="button" variant="contained" onClick={onClose}>
          {translate('logOutModal.backBtn')}
        </StyledButton>
      </DoubleButtonBox>
    </Container>
  );
}
