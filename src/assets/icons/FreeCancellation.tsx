import { PRIMARY } from 'src/theme/colors';

export default function FreeCancellation(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <mask
        id="mask0_230_18229"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.25" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_230_18229)">
        <path
          d="M16.55 22.75L13 19.2L14.4 17.8L16.525 19.925L20.775 15.675L22.175 17.1L16.55 22.75ZM7.4 17.25L6 15.85L7.6 14.25L6 12.65L7.4 11.25L9 12.85L10.6 11.25L12 12.65L10.4 14.25L12 15.85L10.6 17.25L9 15.65L7.4 17.25ZM5 22.25C4.45 22.25 3.97917 22.0542 3.5875 21.6625C3.19583 21.2708 3 20.8 3 20.25V6.25C3 5.7 3.19583 5.22917 3.5875 4.8375C3.97917 4.44583 4.45 4.25 5 4.25H6V2.25H8V4.25H16V2.25H18V4.25H19C19.55 4.25 20.0208 4.44583 20.4125 4.8375C20.8042 5.22917 21 5.7 21 6.25V12.6L19 14.625V10.25H5V20.25H11.25L13.225 22.25H5Z"
          fill={PRIMARY.navy}
        />
      </g>
    </svg>
  );
}
