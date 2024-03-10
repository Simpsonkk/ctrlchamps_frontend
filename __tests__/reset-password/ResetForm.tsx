import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import ResetPasswordForm from 'src/components/reset-password-form/ResetPasswordForm';
import { MIN_PASS_LENGTH } from 'src/components/reset-password-form/constants';

describe('ResetForm component validation', () => {
  it(`password should contain at least ${MIN_PASS_LENGTH} characters`, async () => {
    render(<ResetPasswordForm email="test@gmail.com" next={(): void => {}} />);

    const passInput = screen.getByTestId('password');
    const submitBtn = screen.getByTestId('reset btn');

    expect(passInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await user.type(passInput, '123');

    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('reset_password.errors.invalid_pass')).toBeInTheDocument();
    });
  });

  it('password and confirmPassword should match', async () => {
    render(<ResetPasswordForm email="test@gmail.com" next={(): void => {}} />);

    const passInput = screen.getByTestId('password');
    const confirmPassInput = screen.getByTestId('confirmPass');
    const submitBtn = screen.getByTestId('reset btn');

    await user.type(passInput, '123789798');
    await user.type(confirmPassInput, '1234890809');

    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('reset_password.errors.pass')).toBeInTheDocument();
    });
  });

  it('if valid fields should show alert with passed values', async () => {
    render(<ResetPasswordForm email="test@gmail.com" next={(): void => {}} />);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const form = screen.getByTestId('reset-form');
    const passInput = screen.getByTestId('password');
    const confirmPassInput = screen.getByTestId('confirmPass');

    expect(form).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(confirmPassInput).toBeInTheDocument();

    await user.type(passInput, '1234839764');
    await user.type(confirmPassInput, '1234839764');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('1234839764 1234839764');
    });
  });
});
