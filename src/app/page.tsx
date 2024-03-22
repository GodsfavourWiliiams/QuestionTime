import AuthenticationPage from '@/components/auth/Login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Login form.',
};
export default function Home() {
  return <AuthenticationPage />;
}
