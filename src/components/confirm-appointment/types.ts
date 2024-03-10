import { Dispatch, SetStateAction } from 'react';

type Props = {
  tasks: string[];
  setTasks: Dispatch<SetStateAction<string[]>>;
  details: string;
  setDetails: Dispatch<SetStateAction<string>>;
  isModalActive: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type { Props };
