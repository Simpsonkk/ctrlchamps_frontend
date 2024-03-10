import { yupResolver } from '@hookform/resolvers/yup';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { Button, FormControl, FormControlLabel, IconButton, Switch } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { ReactElement } from 'react-markdown/lib/react-markdown';

import EditSquare from 'src/assets/icons/EditSquare';
import Modal from 'src/components/reusable/modal/Modal';
import UpdateSuccess from 'src/components/reusable/update-success/UpdateSuccess';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { User, useUpdateUserMutation, useUploadAvatarMutation } from 'src/redux/api/userApi';
import { SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

import AddressModal from './address-modal/AddressModal';
import { MAX_FILE_SIZE_BYTES } from './constants';
import PersonalInfoModal from './personal-info-modal/PersonalInfoModal';
import { ErrorMessage } from './personal-info-modal/styles';
import {
  AvatarContainer,
  AvatarIconContainer,
  Background,
  Block,
  ButtonContainer,
  Container,
  EditButton,
  Item,
  Label,
  List,
  StyledAvatar,
  Subtitle,
  Title,
  Value,
  VisuallyHiddenInput,
} from './styles';
import { AvatarValues } from './types';
import UpdatePassword from './update-password-form/UpdatePassword';
import { useAvatarSchema } from './validation';

import AccountReviews from './AccountReviews';
import AccountTransactions from './AccountTransactions';

interface IProps {
  user: User;
  isAdmin?: boolean;
}

export default function AccountDetails({ user, isAdmin }: IProps): JSX.Element | null {
  const { translate } = useLocales();
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isPasswordBlockVisible, setIsPasswordBlockVisible] = useState<boolean>(false);
  const [avatarURL, setAvatarURL] = useState<string>(user.avatar ? user.avatar : '');
  const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
  const [avatarUpdated, setAvatarUpdated] = useState<boolean>(false);
  const [personalInfoUpdated, setPersonalInfoUpdated] = useState<boolean>(false);
  const [addressUpdated, setAddressUpdated] = useState<boolean>(false);

  const [uploadAvatar] = useUploadAvatarMutation();
  const [deleteAvatar] = useUpdateUserMutation();

  const schema = useAvatarSchema();

  const {
    control,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm<AvatarValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const avatar = watch('avatar');

  const onFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<AvatarValues, 'avatar'>
  ): Promise<void> => {
    try {
      if (e.target.files && e.target.files[0] && e.target.files[0].size <= MAX_FILE_SIZE_BYTES) {
        const file = e.target.files[0];
        field.onChange(file);
        await uploadAvatar({
          file,
        });
        setAvatarURL(URL.createObjectURL(file));
        setAvatarUpdated(true);
      } else {
        setError('avatar', {
          type: 'manual',
          message: `${translate('accountDetails.fileSizeError')}`,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const onDeleteAvatar = async (): Promise<void> => {
    try {
      resetField('avatar');
      URL.revokeObjectURL(avatarURL);
      setAvatarURL('');
      await deleteAvatar({ id: user.id, avatar: null });
      setAvatarUpdated(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  const openPasswordBlock = (): void => setIsPasswordBlockVisible(!isPasswordBlockVisible);
  const closePasswordBlock = (): void => setIsPasswordBlockVisible(false);

  return (
    <Background isAdmin={isAdmin}>
      <Container isAdmin={isAdmin}>
        {isAdmin ? (
          <Title>
            {user.firstName} {user.lastName}
          </Title>
        ) : (
          <Title>{translate('accountDetails.title')}</Title>
        )}
        <AvatarContainer>
          {user.avatar || avatar ? (
            <StyledAvatar src={avatarURL} alt="avatar" />
          ) : (
            <AvatarIconContainer>
              <PhotoCameraOutlinedIcon color="primary" sx={{ fontSize: TYPOGRAPHY.xl }} />
            </AvatarIconContainer>
          )}
          <form>
            <FormControl fullWidth variant="filled">
              <Controller
                name="avatar"
                control={control}
                render={({ field }): ReactElement => (
                  <ButtonContainer>
                    <Button component="label">
                      {user.avatar || avatar
                        ? translate('accountDetails.updateAvatar')
                        : translate('accountDetails.avatarText')}
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/png, image/jpeg, image/heic"
                        onChange={(e): Promise<void> => onFileChange(e, field)}
                      />
                    </Button>
                    {(user.avatar || avatar) && (
                      <IconButton onClick={onDeleteAvatar}>
                        <DeleteOutlineIcon color="primary" />
                      </IconButton>
                    )}
                  </ButtonContainer>
                )}
              />
            </FormControl>
            {errors?.avatar && <ErrorMessage>{errors.avatar?.message}</ErrorMessage>}
          </form>
        </AvatarContainer>
        <Block>
          <Subtitle>{translate('accountDetails.personalInfo')}</Subtitle>
          <List>
            <Item>
              <Label>{translate('accountDetails.labels.firstName')}</Label>
              <Value>{user.firstName}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.lastName')}</Label>
              <Value>{user.lastName}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.email')}</Label>
              <Value>{user.email}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.birthDate')}</Label>
              <Value>{user.dateOfBirth}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.phone')}</Label>
              <Value>{user.phoneNumber}</Value>
            </Item>
          </List>
          {user.role === USER_ROLE.Caregiver && (
            <FormControlLabel
              control={<Switch disabled checked={user.isOpenToSeekerHomeLiving} />}
              label={translate('accountDetails.labels.isOpen')}
            />
          )}

          <EditButton onClick={(): void => setIsPersonalInfoModalOpen(true)}>
            <EditSquare />
          </EditButton>
        </Block>
        <Block>
          <Subtitle>{translate('accountDetails.address')}</Subtitle>
          <List>
            <Item>
              <Label>{translate('accountDetails.labels.country')}</Label>
              <Value>{user.country}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.state')}</Label>
              <Value>{user.state}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.city')}</Label>
              <Value>{user.city}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.zip')}</Label>
              <Value>{user.zipCode}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.street')}</Label>
              <Value>{user.address}</Value>
            </Item>
          </List>
          <EditButton onClick={(): void => setIsAddressModalOpen(true)}>
            <EditSquare />
          </EditButton>
        </Block>
        {isAdmin ? (
          <>
            <AccountTransactions user={user} />
            {user.role === USER_ROLE.Caregiver && <AccountReviews user={user} />}
          </>
        ) : (
          <Block>
            <Subtitle>{translate('changePassword.title')}</Subtitle>
            <EditButton onClick={openPasswordBlock}>
              <EditSquare />
            </EditButton>
            {isPasswordBlockVisible && (
              <UpdatePassword
                email={user.email}
                onClose={closePasswordBlock}
                onSuccess={(): void => setPasswordUpdated(true)}
              />
            )}
          </Block>
        )}
      </Container>
      <Modal
        onClose={(): void => setIsPersonalInfoModalOpen(false)}
        title={translate('accountDetails.personalInfoModal.title')}
        isActive={isPersonalInfoModalOpen}
        backgroundColor={SECONDARY.drawer_background}
      >
        <PersonalInfoModal
          user={user}
          onClose={(): void => setIsPersonalInfoModalOpen(false)}
          onSuccess={(): void => setPersonalInfoUpdated(true)}
        />
      </Modal>
      <Modal
        onClose={(): void => setIsAddressModalOpen(false)}
        title={translate('accountDetails.addressModal.title')}
        isActive={isAddressModalOpen}
        backgroundColor={SECONDARY.drawer_background}
      >
        <AddressModal
          user={user}
          onClose={(): void => setIsAddressModalOpen(false)}
          onSuccess={(): void => setAddressUpdated(true)}
        />
      </Modal>

      <UpdateSuccess
        dataUpdated={passwordUpdated}
        setDataUpdated={setPasswordUpdated}
        message={translate('changePassword.success')}
      />
      <UpdateSuccess
        dataUpdated={avatarUpdated}
        setDataUpdated={setAvatarUpdated}
        message={translate('accountDetails.avatarSuccess')}
      />
      <UpdateSuccess
        dataUpdated={personalInfoUpdated}
        setDataUpdated={setPersonalInfoUpdated}
        message={translate('accountDetails.personalInfoModal.success')}
      />
      <UpdateSuccess
        dataUpdated={addressUpdated}
        setDataUpdated={setAddressUpdated}
        message={translate('accountDetails.addressModal.success')}
      />
    </Background>
  );
}
