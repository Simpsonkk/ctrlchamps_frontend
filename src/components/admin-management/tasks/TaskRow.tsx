import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useState } from 'react';

import { IconButton, TableCell, TableRow } from 'src/components/admin-management/styles';
import { Task } from 'src/redux/api/tasksApi';

import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';

type Props = { task: Task };

export default function TaskRow({ task }: Props): JSX.Element {
  const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);

  const openEditModal = (): void => {
    setIsEditModalActive(true);
  };

  const openDeleteModal = (): void => {
    setIsDeleteModalActive(true);
  };

  return (
    <>
      <TableRow key={task.id}>
        <TableCell>{task.name}</TableCell>
        <TableCell align="right">
          <IconButton onClick={openEditModal}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <IconButton onClick={openDeleteModal}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditModal
        isModalActive={isEditModalActive}
        setIsModalActive={setIsEditModalActive}
        task={task}
      />
      <DeleteModal
        isModalActive={isDeleteModalActive}
        setIsModalActive={setIsDeleteModalActive}
        taskId={task.id}
      />
    </>
  );
}
