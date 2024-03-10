import {
  IconButton,
  InputAdornment,
  TableBody,
  TableHead,
  MenuItem,
  Select,
  OutlinedInput,
  Table,
  Stack,
  Pagination,
  Box,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useLocales } from 'src/locales';
import { DEFAULT_OFFSET, SORT_ORDER, USER_STATUS } from 'src/constants';
import { ROUTES } from 'src/routes';
import { useDebounce } from 'src/hooks/useDebounce';
import { useGetFilteredUsersQuery, useUpdateUserMutation } from 'src/redux/api/userApi';
import { PRIMARY } from 'src/theme/colors';

import UpdateSuccess from 'src/components/reusable/update-success/UpdateSuccess';
import { GreenSpan } from 'src/components/admin-management/styles';
import Modal from 'src/components/reusable/modal/Modal';
import { DEBOUNCE_DELAY, FIRST_PAGE, PAGINATION_USERS_LIMIT } from './constants';
import {
  MainWrapper,
  StyledStack,
  PageName,
  Cylinder,
  SearchContainer,
  StyledTableRow,
  TableHeader,
  StyledTableCell,
  ManagementWrapper,
  Title,
  StyledButton,
  NameButton,
} from './styles';

export default function UserList(): JSX.Element | null {
  const { translate } = useLocales();
  const router = useRouter();

  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [sortingOrder, setSortingOrder] = useState<string>(SORT_ORDER.ASC);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [termSearch, setTermSearch] = useState<string>('');
  const [deleteUserId, setDeleteUserId] = useState<string>('');
  const [statusUpdated, setStatusUpdated] = useState<boolean>(false);
  const [userDeleted, setUserDeleted] = useState<boolean>(false);
  const { currentPage } = router.query;

  useEffect(() => {
    if (currentPage) {
      setPage(Number(currentPage));
    }
  }, [currentPage]);

  const debouncedSearchTerm = useDebounce(termSearch.trim(), DEBOUNCE_DELAY);

  const {
    data: users,
    isSuccess,
    isLoading,
    refetch,
  } = useGetFilteredUsersQuery({
    search: debouncedSearchTerm,
    offset: !debouncedSearchTerm ? (page - FIRST_PAGE) * PAGINATION_USERS_LIMIT : DEFAULT_OFFSET,
    sort: sortingOrder,
  });

  const [updateUser] = useUpdateUserMutation();

  const handleDeleteModalToggle = (): void => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };

  const handleCloseModalAndSetUserId = (userId: string): void => {
    setDeleteUserId(userId);
    handleDeleteModalToggle();
  };

  const handleTermSearch = (event: ChangeEvent<HTMLInputElement>): void =>
    setTermSearch(event.target.value);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => setPage(value);

  const handleDeleteUser = async (): Promise<void> => {
    try {
      await updateUser({ id: deleteUserId, isDeletedByAdmin: true })
        .unwrap()
        .then(() => setUserDeleted(true));
      refetch();
      handleDeleteModalToggle();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChangeStatus = async (event: SelectChangeEvent, id: string): Promise<void> => {
    try {
      await updateUser({ id, status: event.target.value })
        .unwrap()
        .then(() => setStatusUpdated(true));
      refetch();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChangeSorting = (): void =>
    sortingOrder === SORT_ORDER.DESC
      ? setSortingOrder(SORT_ORDER.ASC)
      : setSortingOrder(SORT_ORDER.DESC);

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, page, sortingOrder, refetch]);

  if (isLoading) return null;

  return (
    <MainWrapper>
      <ManagementWrapper>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <PageName>
            <Cylinder />
            {translate('userList.title')}
          </PageName>
        </Stack>
        <SearchContainer>
          <OutlinedInput
            onChange={handleTermSearch}
            placeholder={translate('userList.search')}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            fullWidth
            size="small"
          />
          {sortingOrder === SORT_ORDER.DESC ? (
            <IconButton size="large" onClick={handleChangeSorting}>
              <FormatLineSpacingIcon fontSize="large" />
            </IconButton>
          ) : (
            <IconButton size="large" onClick={handleChangeSorting} sx={{ color: PRIMARY.main }}>
              <FormatLineSpacingIcon fontSize="large" />
            </IconButton>
          )}
        </SearchContainer>

        {isSuccess && termSearch && users.data.length <= 0 && (
          <Typography color="GrayText" mt={2}>
            {translate('no_results_match')}
          </Typography>
        )}

        {isSuccess && !termSearch && users.data.length <= 0 && (
          <PageName>{translate('userList.anyUsers')}</PageName>
        )}

        {isSuccess && users.data.length > 0 && (
          <>
            <StyledStack mt={3}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <TableHeader>{translate('userList.userName')}</TableHeader>
                    <TableHeader>{translate('userList.role')}</TableHeader>
                    <TableHeader>{translate('userList.status')}</TableHeader>
                    <TableHeader> </TableHeader>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {users.data.map((user) => (
                    <StyledTableRow key={user.id}>
                      <StyledTableCell>
                        <NameButton
                          onClick={(): Promise<boolean> =>
                            router.push({
                              pathname: `${ROUTES.adminAccountDetails}${user.id}`,
                              query: { page },
                            })
                          }
                        >
                          {user.firstName} {user.lastName}
                        </NameButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        <GreenSpan role={user.role}>{user.role}</GreenSpan>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Select
                          value={user.status}
                          fullWidth
                          onChange={(event): Promise<void> => handleChangeStatus(event, user.id)}
                        >
                          <MenuItem value={USER_STATUS.Active}>{USER_STATUS.Active}</MenuItem>
                          <MenuItem value={USER_STATUS.Inactive}>{USER_STATUS.Inactive}</MenuItem>
                        </Select>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                          onClick={(): Promise<boolean> =>
                            router.push({
                              pathname: `${ROUTES.adminAccountDetails}${user.id}`,
                              query: { page },
                            })
                          }
                        >
                          <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={(): void => handleCloseModalAndSetUserId(user.id)}>
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledStack>
            <Stack display="flex" direction="row" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(users!.count / PAGINATION_USERS_LIMIT)}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </>
        )}

        <Modal
          isActive={isDeleteModalActive}
          onClose={handleDeleteModalToggle}
          title={translate('adminManagement.deleteUser')}
        >
          <Box display="flex" flexDirection="column">
            <Title>{translate('adminManagement.deleteWarning')}</Title>

            <Box display="flex" gap={2}>
              <StyledButton variant="contained" onClick={handleDeleteUser}>
                {translate('adminManagement.yes')}
              </StyledButton>

              <StyledButton variant="contained" color="error" onClick={handleDeleteModalToggle}>
                {translate('adminManagement.no')}
              </StyledButton>
            </Box>
          </Box>
        </Modal>
      </ManagementWrapper>
      <UpdateSuccess
        dataUpdated={statusUpdated}
        setDataUpdated={setStatusUpdated}
        message={translate('userList.statusSuccess')}
      />
      <UpdateSuccess
        dataUpdated={userDeleted}
        setDataUpdated={setUserDeleted}
        message={translate('userList.userDeleted')}
      />
    </MainWrapper>
  );
}
