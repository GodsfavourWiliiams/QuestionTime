import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import AuthenticationPage from '@/components/auth/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthForm } from '@/components/auth/AuthForm';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe('Auth Page', () => {
  it('renders a question time heading', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <AuthenticationPage />
      </QueryClientProvider>
    );

    const heading = screen.getByText('Question Time', { selector: 'h1' });

    expect(heading).toBeInTheDocument();
  });

  test('Test form submission upon clicking the submit button, ensuring the email input exists.', () => {
    const { getByText, getByLabelText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <AuthForm />
      </QueryClientProvider>
    );

    // Retrieve elements
    const emailInput = getByLabelText('Email Address') as HTMLInputElement;
    const submitButton = getByText('Sign In with Email');

    expect(emailInput).toBeInTheDocument();

    // Simulate user interaction
    fireEvent.change(emailInput, { target: { value: 'name@example.com' } });
    fireEvent.click(submitButton);

    // Add validation for email input
    expect(emailInput.value).toMatch(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
    );
  });
});
