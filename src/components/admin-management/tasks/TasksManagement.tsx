import SearchIcon from '@mui/icons-material/Search';
import {
  InputAdornment,
  OutlinedInput,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableHead,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import {
  AddUserButton,
  Cylinder,
  MainWrapper,
  ManagementWrapper,
  PageName,
  TableHeader,
  TableRow,
} from 'src/components/admin-management/styles';

import { StyledStack } from 'src/components/user-list/styles';
import { DEFAULT_OFFSET, PAGINATION_LIMIT } from 'src/constants';
import { useDebounce } from 'src/hooks/useDebounce';
import { useLocales } from 'src/locales';
import { useGetAllTasksQuery } from 'src/redux/api/tasksApi';

import { DEBOUNCE_DELAY, FIRST_PAGE } from '../constants';
import TaskRow from './TaskRow';
import AddModal from './modals/AddModal';

export default function TasksManagement(): JSX.Element {
  const { translate } = useLocales();

  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [termSearch, setTermSearch] = useState<string>('');
  const [isAddModalActive, setIsAddModalActive] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(termSearch.trim(), DEBOUNCE_DELAY);

  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetAllTasksQuery({
    search: debouncedSearchTerm,
    offset: !debouncedSearchTerm ? (page - FIRST_PAGE) * PAGINATION_LIMIT : DEFAULT_OFFSET,
    limit: PAGINATION_LIMIT,
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, page, refetch]);

  const openAddModal = (): void => {
    if (!isSuccess) return;
    setIsAddModalActive(true);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <MainWrapper>
      <ManagementWrapper>
        <StyledStack direction="row" justifyContent="space-between" mb={3}>
          <PageName>
            <Cylinder />
            {translate('taskManagement.title')}
          </PageName>
          <AddUserButton onClick={openAddModal} variant="contained">
            {translate('taskManagement.addTask')}
          </AddUserButton>
        </StyledStack>

        <OutlinedInput
          value={termSearch}
          onChange={(e): void => setTermSearch(e.target.value)}
          placeholder={translate('taskManagement.search')}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          fullWidth
          size="small"
        />

        {isLoading && (
          <Typography color="GrayText" mt={2}>
            {translate('loading')}
          </Typography>
        )}

        {isError && (
          <Typography color="red" mt={2}>
            {translate('unexpected_error')}
          </Typography>
        )}

        {isSuccess && termSearch && !tasks.data.length && (
          <Typography color="GrayText" mt={2}>
            {translate('no_results_match')}
          </Typography>
        )}

        {isSuccess && tasks.data.length > 0 && (
          <>
            <Stack mt={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>{translate('taskManagement.name')}</TableHeader>
                    <TableHeader width={500} align="right">
                      {translate('taskManagement.action')}
                    </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.data.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </TableBody>
              </Table>
            </Stack>
            <AddModal isModalActive={isAddModalActive} setIsModalActive={setIsAddModalActive} />
            {tasks.count >= PAGINATION_LIMIT && (
              <Stack display="flex" direction="row" justifyContent="center" mt={2}>
                <Pagination
                  count={Math.ceil(tasks!.count / PAGINATION_LIMIT)}
                  page={page}
                  onChange={handlePageChange}
                />
              </Stack>
            )}
          </>
        )}
      </ManagementWrapper>
    </MainWrapper>
  );
}
