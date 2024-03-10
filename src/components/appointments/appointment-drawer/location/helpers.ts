import { LatLng } from 'use-places-autocomplete';
import { GOOGLE_MAPS_URL } from './constants';

export const getMapRedirectUrl = ({ lat, lng }: LatLng): string =>
  `${GOOGLE_MAPS_URL}?api=1&query=${lat},${lng}`;
