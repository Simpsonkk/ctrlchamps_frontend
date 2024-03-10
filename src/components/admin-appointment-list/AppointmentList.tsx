import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
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

import { format } from 'date-fns';
import Modal from 'src/components/reusable/modal/Modal';
import { APPOINTMENT_STATUS, DATE_FORMAT, DEFAULT_OFFSET, USER_ROLE } from 'src/constants';
import { SortOrder } from 'src/constants/enums';
import { useDebounce } from 'src/hooks/useDebounce';
import { useLocales } from 'src/locales';
import { ActivityLog, ActivityLogStatus } from 'src/redux/api/activityLogApi';
import { useGetAllAppointmentsQuery } from 'src/redux/api/adminPanelAPI';
import { useDeleteAppointmentMutation } from 'src/redux/api/appointmentApi';
import { PRIMARY } from 'src/theme/colors';
import { calculateDateDifference } from 'src/utils/calculateDateDifference';
import AppointmentDrawer from '../appointments/appointment-drawer/AppointmentDrawer';
import AppointmentStatus from '../appointments/appointment-status/AppointmentStatus';
import { DEBOUNCE_DELAY, FIRST_PAGE, PAGINATION_APPOINTMENTS_LIMIT } from './constants';
import {
  ActionBar,
  ColorSpan,
  Cylinder,
  IconButton,
  MainWrapper,
  ManagementWrapper,
  PageName,
  StyledButton,
  StyledStack,
  TableCell,
  TableHeader,
  TableRow,
  Title,
} from './styles';

function AdminAppointmentList(): JSX.Element | null {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [termSearch, setTermSearch] = useState<string>('');
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<string>('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  const [sort, setSort] = useState<SortOrder>(SortOrder.DESC);

  const debouncedSearchTerm = useDebounce(termSearch.trim(), DEBOUNCE_DELAY);

  const {
    data: appointments,
    isSuccess,
    isLoading,
    refetch,
  } = useGetAllAppointmentsQuery({
    name: debouncedSearchTerm,
    offset: !debouncedSearchTerm
      ? (page - FIRST_PAGE) * PAGINATION_APPOINTMENTS_LIMIT
      : DEFAULT_OFFSET,
    limit: PAGINATION_APPOINTMENTS_LIMIT,
    sort,
  });

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const calculateActivityLogsQuantity = (
    activityLogs: ActivityLog[],
    status: ActivityLogStatus
  ): number => {
    const filteredActivityLogs = activityLogs.filter(
      (activityLog) => activityLog.status === status
    );

    return filteredActivityLogs.length;
  };

  const toggleSort = (): void => {
    if (sort === SortOrder.ASC) {
      setSort(SortOrder.DESC);
    } else {
      setSort(SortOrder.ASC);
    }
  };

  const handleDeleteModalToggle = (): void => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };

  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  const handleCloseModalAndSetAppointmentId = (userId: string): void => {
    setDeleteAppointmentId(userId);
    handleDeleteModalToggle();
  };

  const openAppointmentDrawer = (appointmentId: string): void => {
    setIsDrawerOpen(true);
    setSelectedAppointmentId(appointmentId);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTermSearch = (event: ChangeEvent<HTMLInputElement>): void =>
    setTermSearch(event.target.value);

  const handleDeleteAppointment = async (): Promise<void> => {
    try {
      await deleteAppointment(deleteAppointmentId).unwrap();
      handleDeleteModalToggle();
      refetch();
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, sort, page, refetch]);

  if (isLoading) return null;

  return (
    <MainWrapper>
      <ManagementWrapper>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <PageName>
            <Cylinder />
            {translate('adminAppointmentList.title')}
          </PageName>
        </Stack>
        <ActionBar>
          <OutlinedInput
            onChange={handleTermSearch}
            placeholder={translate('adminAppointmentList.search')}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            size="small"
            fullWidth
          />
          {sort === SortOrder.DESC ? (
            <IconButton onClick={toggleSort}>
              <FormatLineSpacingIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleSort} sx={{ color: PRIMARY.main }}>
              <FormatLineSpacingIcon />
            </IconButton>
          )}
        </ActionBar>

        {isSuccess && termSearch && !appointments.appointments.length && (
          <Typography color="GrayText" mt={2}>
            {translate('no_results_match')}
          </Typography>
        )}

        {isSuccess && appointments.appointments.length > 0 && (
          <>
            <StyledStack mt={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>{translate('adminAppointmentList.id')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.name')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.type')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.duration')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.creation_date')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.end_date')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.status')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.approved_logs')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.rejected_logs')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.clientName')}</TableHeader>
                    <TableHeader>{translate('adminAppointmentList.caregiverName')}</TableHeader>
                    <TableHeader align="right">
                      {translate('adminAppointmentList.actions')}
                    </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.id}</TableCell>
                      <TableCell>{appointment.name}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        {calculateDateDifference(appointment.startDate, appointment.endDate)}
                      </TableCell>
                      <TableCell>{format(new Date(appointment.createdAt), DATE_FORMAT)}</TableCell>
                      <TableCell>{format(new Date(appointment.endDate), DATE_FORMAT)}</TableCell>
                      <TableCell>
                        <ColorSpan status={appointment.status}>
                          <AppointmentStatus status={appointment.status} />
                        </ColorSpan>
                      </TableCell>
                      <TableCell>
                        {calculateActivityLogsQuantity(
                          appointment.activityLog,
                          ActivityLogStatus.Approved
                        )}
                      </TableCell>
                      <TableCell>
                        {calculateActivityLogsQuantity(
                          appointment.activityLog,
                          ActivityLogStatus.Rejected
                        )}
                      </TableCell>
                      <TableCell>
                        {appointment.user.firstName} {appointment.user.lastName}
                      </TableCell>
                      <TableCell>
                        {appointment.caregiverInfo.user.firstName}{' '}
                        {appointment.caregiverInfo.user.lastName}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ display: 'flex', justifyContent: 'space-evenly', height: '133px' }}
                      >
                        {appointment.status === APPOINTMENT_STATUS.Finished && (
                          <IconButton
                            onClick={(): void =>
                              handleCloseModalAndSetAppointmentId(appointment.id)
                            }
                          >
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        )}
                        <IconButton onClick={(): void => openAppointmentDrawer(appointment.id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledStack>

            <Stack display="flex" direction="row" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(appointments!.count / PAGINATION_APPOINTMENTS_LIMIT)}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </>
        )}

        <Modal
          isActive={isDeleteModalActive}
          onClose={handleDeleteModalToggle}
          title={translate('adminAppointmentList.deleteAppointment')}
        >
          <Box display="flex" flexDirection="column">
            <Title>{translate('adminAppointmentList.deleteWarning')}</Title>

            <Box display="flex" gap={2}>
              <StyledButton variant="contained" onClick={handleDeleteModalToggle}>
                {translate('adminAppointmentList.no')}
              </StyledButton>

              <StyledButton variant="contained" color="error" onClick={handleDeleteAppointment}>
                {translate('adminAppointmentList.yes')}
              </StyledButton>
            </Box>
          </Box>
        </Modal>
        {selectedAppointmentId && (
          <AppointmentDrawer
            role={USER_ROLE.Admin}
            selectedAppointmentId={selectedAppointmentId}
            isOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        )}
      </ManagementWrapper>
    </MainWrapper>
  );
}

export default AdminAppointmentList;
