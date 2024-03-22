import DashboardContainer from '@/components/layout/DashboardLayout';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <DashboardContainer>{children}</DashboardContainer>;
};

export default Layout;
