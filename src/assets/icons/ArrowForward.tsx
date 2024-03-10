import React from 'react';
import { SECONDARY } from 'src/theme/colors';

export default function ArrowForward(): JSX.Element {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.70687 0L0.296875 1.41L4.87687 6L0.296875 10.59L1.70687 12L7.70687 6L1.70687 0Z"
        fill={SECONDARY.gray_semi_transparent}
        fillOpacity="0.56"
      />
    </svg>
  );
}
