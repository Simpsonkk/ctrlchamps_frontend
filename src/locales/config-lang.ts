// @mui
import { enUS as materialEnUs } from '@mui/material/locale';
import { enUS as dateFnsEnUs } from 'date-fns/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: materialEnUs,
    dateFnsLocale: dateFnsEnUs,
    icon: '/assets/icons/flags/example.svg',
  },
];

export const defaultLang = allLangs[0]; // English
