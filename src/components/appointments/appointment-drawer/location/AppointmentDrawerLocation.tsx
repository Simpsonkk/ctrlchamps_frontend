import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import {
  PLACES_API_KEY,
  PLACES_SCRIPT_LIBRARIES,
} from 'src/components/create-appointment-fourth/places-autocomplete/constants';
import { getPlaceIdDetails } from 'src/components/create-appointment-fourth/places-autocomplete/helpers';
import { useLocales } from 'src/locales';
import { LAT_LNG_SPLIT, MAP_DEFAULT_ZOOM, MAP_OPTIONS, MAP_REDIRECT_TARGET } from './constants';
import { getMapRedirectUrl } from './helpers';
import { GoogleMapContainerStyles, GoogleMapWrapper, StyledAddress } from './styles';
import { LatLngWithAddress } from './types';

interface AppointmentDrawerLocationProps {
  placeId: string;
}

export default function AppointmentDrawerLocation({
  placeId,
}: AppointmentDrawerLocationProps): JSX.Element | null {
  const {
    currentLang: { value: placesAutocompleteLanguage },
  } = useLocales();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: PLACES_API_KEY,
    libraries: PLACES_SCRIPT_LIBRARIES,
    language: placesAutocompleteLanguage,
  });

  if (!isLoaded) return null;

  return <MapLocation placeId={placeId} />;
}

interface MapLocationProps extends AppointmentDrawerLocationProps {}

function MapLocation({ placeId }: MapLocationProps): JSX.Element | null {
  const [addressDetails, setAddressDetails] = useState<LatLngWithAddress | null>(null);

  useEffect(() => {
    try {
      getPlaceIdDetails(placeId)
        .then(async (data) => {
          const { address, city, country, latLng, state } = data;
          const [lat, lng] = latLng.split(LAT_LNG_SPLIT).map((item) => Number(item));
          setAddressDetails({ lat, lng, address: `${address}, ${city}, ${state}, ${country}` });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }, [placeId]);

  if (!addressDetails) {
    return null;
  }

  const onClickMarker = (): void => {
    window.open(getMapRedirectUrl(addressDetails), MAP_REDIRECT_TARGET);
  };

  return (
    <>
      <StyledAddress>{addressDetails.address}</StyledAddress>
      <GoogleMapWrapper>
        <GoogleMap
          center={addressDetails}
          options={MAP_OPTIONS}
          mapContainerStyle={GoogleMapContainerStyles}
          zoom={MAP_DEFAULT_ZOOM}
        >
          <Marker position={addressDetails} onClick={onClickMarker} />
        </GoogleMap>
      </GoogleMapWrapper>
    </>
  );
}
