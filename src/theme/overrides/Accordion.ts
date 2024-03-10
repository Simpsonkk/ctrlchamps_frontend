import { Theme } from '@mui/material/styles';
import typography from 'src/theme/typography';
import { PRIMARY, SECONDARY } from '../colors';

// ----------------------------------------------------------------------

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&.Mui-expanded:before': {
            opacity: 1,
          },
          '&.Mui-expanded': {
            marginTop: 0,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
          '&.Mui-expanded': {
            minHeight: 'auto',
          },
          '& .MuiTypography-root': {
            color: PRIMARY.black,
            fontWeight: typography.fontWeightMedium,
          },
        },
        content: {
          marginTop: theme.spacing(1.5),
          marginBottom: theme.spacing(1.5),
          '&.Mui-expanded': {
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingBottom: 0,
          '& .MuiTypography-root': {
            color: SECONDARY.gray_semi_transparent,
            fontWeight: typography.fontWeightMedium,
          },
        },
      },
    },
  };
}
