import { ChangeEvent, useState } from 'react';
import { getCaregiverFilterInitialState } from 'src/components/create-appointment-fourth/helpers';
import {
  AutocompletedLocation,
  CaregiverFilterState,
} from 'src/components/create-appointment-fourth/types';
import { AppointmentI } from 'src/redux/slices/appointmentSlice';

type CaregiverFilterReturnType = {
  caregiverFilter: CaregiverFilterState;
  handleSwitchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleServicesChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRatingsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLocationChange: (newLocation: AutocompletedLocation) => void;
};

export function useCaregiverFilter(appointment: AppointmentI): CaregiverFilterReturnType {
  const [caregiverFilter, setCaregiverFilter] = useState<CaregiverFilterState>(
    getCaregiverFilterInitialState(appointment)
  );

  const handleServicesChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;

    setCaregiverFilter((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        value === service.label ? { ...service, checked } : service
      ),
    }));
  };

  const handleRatingsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;

    setCaregiverFilter((prev) => ({
      ...prev,
      ratings: prev.ratings.map((rating) =>
        value === rating.label ? { ...rating, checked } : rating
      ),
    }));
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setCaregiverFilter((prev) => ({ ...prev, [name]: checked }));
  };

  const handleLocationChange = (newLocation: AutocompletedLocation): void => {
    setCaregiverFilter((prev) => ({ ...prev, location: newLocation }));
  };

  return {
    caregiverFilter,
    handleSwitchChange,
    handleServicesChange,
    handleRatingsChange,
    handleLocationChange,
  };
}

type CreateAppointmentFourthReturnType = {
  isDrawerOpen: boolean;
  handleDrawerOpen: (caregiverId: string) => void;
  handleDrawerClose: () => void;
  selectedCaregiverId: string | null;
};

export function useCreateAppointmentFourth(): CreateAppointmentFourthReturnType {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);

  const handleDrawerOpen = (caregiverId: string): void => {
    setIsDrawerOpen(true);
    setSelectedCaregiverId(caregiverId);
  };
  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  return {
    isDrawerOpen,
    handleDrawerClose,
    handleDrawerOpen,
    selectedCaregiverId,
  };
}
