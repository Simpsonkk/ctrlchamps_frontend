import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';

import UpdatePassword from 'src/components/account-details/update-password-form/UpdatePassword';
import { MIN_PASSWORD_LENGTH } from 'src/constants';
import { store } from 'src/redux/store';

const ReduxProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <Provider store={store}>{children}</Provider>
);

describe('UpdatePassword component validation', () => {
  it(`password should contain at least ${MIN_PASSWORD_LENGTH} characters`, async () => {
    render(
      <ReduxProvider>
        <UpdatePassword userId="" onClose={() => {}} onSuccess={() => {}} />
      </ReduxProvider>
    );

    const oldPass = screen.getByTestId('oldPassword');

    expect(oldPass).toBeInTheDocument();

    await user.type(oldPass, '123456');

    await waitFor(() => {
      expect(screen.getByText('changePassword.errors.invalid_length')).toBeInTheDocument();
    });
  });

  it(`New password and confirm password should match`, async () => {
    render(
      <ReduxProvider>
        <UpdatePassword userId="" onClose={() => {}} onSuccess={() => {}} />
      </ReduxProvider>
    );

    const newPass = screen.getByTestId('newPassword');
    const confirmPass = screen.getByTestId('confirmPassword');

    expect(newPass).toBeInTheDocument();
    expect(confirmPass).toBeInTheDocument();

    await user.type(newPass, '12345678');
    await user.type(confirmPass, '12345688');

    await waitFor(() => {
      expect(screen.getByText('changePassword.errors.not_match')).toBeInTheDocument();
    });
  });

  it(`New password should be different from the old one`, async () => {
    render(
      <ReduxProvider>
        <UpdatePassword userId="" onClose={() => {}} onSuccess={() => {}} />
      </ReduxProvider>
    );

    const oldPass = screen.getByTestId('oldPassword');
    const newPass = screen.getByTestId('newPassword');
    const confirmPass = screen.getByTestId('confirmPassword');
    const submitBtn = screen.getByTestId('submitBtn');

    expect(oldPass).toBeInTheDocument();
    expect(newPass).toBeInTheDocument();
    expect(confirmPass).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await user.type(oldPass, '12345678');
    await user.type(newPass, '12345678');
    await user.type(confirmPass, '12345678');

    await waitFor(() => {
      expect(screen.getByText('changePassword.errors.invalid_pass')).toBeInTheDocument();
    });

    expect(submitBtn).toBeDisabled();
  });
});
