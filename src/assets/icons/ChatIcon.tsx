import React from 'react';
import { PRIMARY } from 'src/theme/colors';

export default function ChatIcon(): JSX.Element {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.796875 20V2C0.796875 1.45 0.992708 0.979167 1.38438 0.5875C1.77604 0.195833 2.24688 0 2.79688 0H18.7969C19.3469 0 19.8177 0.195833 20.2094 0.5875C20.601 0.979167 20.7969 1.45 20.7969 2V14C20.7969 14.55 20.601 15.0208 20.2094 15.4125C19.8177 15.8042 19.3469 16 18.7969 16H4.79688L0.796875 20ZM3.94688 14H18.7969V2H2.79688V15.125L3.94688 14Z"
        fill={PRIMARY.black}
        fillOpacity="0.5"
      />
    </svg>
  );
}
