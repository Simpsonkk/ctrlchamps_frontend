/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SignUpThirdForm from '..';

jest.mock('src/redux/store', () => ({
  useTypedSelector: () => ({
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address: '',
  }),
  useAppDispatch: () => jest.fn(),
}));

describe('SignUpThirdForm', () => {
  const onNextMock = jest.fn();
  beforeEach(() => {
    render(<SignUpThirdForm onNext={onNextMock} />);
  });

  it('shows error that all fields are required', async () => {
    await act(async () => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(screen.getByText('signUpThirdForm.countryRequired')).toBeInTheDocument();
    expect(screen.getByText('signUpThirdForm.stateRequired')).toBeInTheDocument();
    expect(screen.getByText('signUpThirdForm.cityRequired')).toBeInTheDocument();
    expect(screen.getByText('signUpThirdForm.zipCodeRequired')).toBeInTheDocument();
    expect(screen.getByText('signUpThirdForm.addressRequired')).toBeInTheDocument();

    expect(onNextMock).not.toHaveBeenCalled();
  });

  it('shows error that all text fields length is limited to 100 characters', async () => {
    await act(async () => {
      fireEvent.change(screen.getByTestId('state-input'), { target: { value: 'a'.repeat(101) } });
      fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'a'.repeat(101) } });
      fireEvent.change(screen.getByTestId('zipCode-input'), { target: { value: 'a'.repeat(101) } });
      fireEvent.change(screen.getByTestId('address-input'), { target: { value: 'a'.repeat(101) } });

      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(screen.getByText('signUpThirdForm.stateMaxLength')).toBeInTheDocument();
    expect(screen.getByText('signUpThirdForm.cityMaxLength')).toBeInTheDocument();
    expect(screen.getByText('signUpThirdForm.zipCodeMaxLength')).toBeInTheDocument();
    expect(screen.getByText('signUpThirdForm.addressMaxLength')).toBeInTheDocument();

    expect(onNextMock).not.toHaveBeenCalled();
  });

  it('submits form when fields are valid', async () => {
    await act(async () => {
      fireEvent.mouseDown(screen.getByTestId('country-select'));
    });
    const listbox = within(screen.getByRole('listbox'));
    await act(async () => {
      fireEvent.click(listbox.getByText('countries.canada'));
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId('state-input'), { target: { value: 'a'.repeat(10) } });
      fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'a'.repeat(10) } });
      fireEvent.change(screen.getByTestId('zipCode-input'), { target: { value: 'a'.repeat(10) } });
      fireEvent.change(screen.getByTestId('address-input'), { target: { value: 'a'.repeat(10) } });
      fireEvent.submit(screen.getByTestId('form'));
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('next-button'));
    });

    expect(onNextMock).toHaveBeenCalled();
  });
});
