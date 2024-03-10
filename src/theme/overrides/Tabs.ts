import { TabProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Tabs(theme: Theme) {
  return {
    MuiTabs: {
      defaultProps: {
        textColor: 'inherit',
        allowScrollButtonsMobile: true,
        variant: 'scrollable',
      },
      styleOverrides: {
        scrollButtons: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        iconPosition: 'start',
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: TabProps }) => ({
          opacity: 1,
          minWidth: 'auto',
          fontWeight: theme.typography.fontWeightMedium,
          padding: theme.spacing(2),
          '&.Mui-selected': {
            color: theme.palette.secondary.main,
          },
          '&:not(.Mui-selected)': {
            color: theme.palette.text.secondary,
          },
          ...((ownerState.iconPosition === 'start' || ownerState.iconPosition === 'end') && {
            minHeight: 48,
          }),
        }),
      },
    },
  };
}
