import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import EnterEmail from 'src/components/enter-email/EnterEmail';

describe('EnterEmail component validation', () => {
  it('should show invalid error message if value does not match email regex', async () => {
    render(<EnterEmail next={(): void => {}} />);

    const input = screen.getByTestId('enter-email');
    const form = screen.getByTestId('form');
    const submitBtn = screen.getByTestId('btn');

    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();

    await user.type(input, 'randomtesdsfl');

    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('reset_password.errors.invalid')).toBeInTheDocument();
    });
  });
});
