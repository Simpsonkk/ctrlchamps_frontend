import { Library } from '@googlemaps/js-api-loader';

export const PLACES_COUNTRY_RESTRICTIONS = ['us', 'ca'];

export const PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export const PLACES_SCRIPT_LIBRARIES: Library[] = ['places', 'maps', 'marker'];

export const PLACES_DEBOUNCE_DELAY = 500;

export const PLACES_DETAILS_FIELDS = ['utc_offset_minutes', 'address_components', 'geometry'];

export const PLACES_DATE_FORMAT = 't';
