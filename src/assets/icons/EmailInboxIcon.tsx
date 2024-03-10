import React from 'react';
import { PRIMARY } from 'src/theme/colors';

export default function EmailInboxIcon(): JSX.Element {
  return (
    <svg width="76" height="68" viewBox="0 0 76 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M36 28.4616L4 7.5385V52H42V56H0V0H72V34H68V7.5385L36 28.4616ZM36 24L66.7692 4H5.2308L36 24ZM62.4615 67.1539L59.7077 64.4L67.9307 56H48.4615V52H68.0077L59.6077 43.6L62.4615 40.8461L75.6154 54L62.4615 67.1539ZM4 7.5385V54.6923V34V34.6846V4V7.5385Z"
        fill={PRIMARY.main}
      />
    </svg>
  );
}
