import React from 'react';
import { PRIMARY } from 'src/theme/colors';

export default function AppointmentsIcon(): JSX.Element {
  return (
    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.7969 2H17.7969V0H15.7969V2H5.79688V0H3.79688V2H2.79688C1.69687 2 0.796875 2.9 0.796875 4V20C0.796875 21.1 1.69687 22 2.79688 22H18.7969C19.8969 22 20.7969 21.1 20.7969 20V4C20.7969 2.9 19.8969 2 18.7969 2ZM18.7969 20H2.79688V7H18.7969V20Z"
        fill={PRIMARY.navy}
      />
    </svg>
  );
}
