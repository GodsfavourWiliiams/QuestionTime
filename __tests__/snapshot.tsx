import AuthenticationPage from '@/components/auth/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

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

it('renders auth unchanged', () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <AuthenticationPage />
    </QueryClientProvider>
  );
  expect(container).toMatchSnapshot();
});
