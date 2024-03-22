'use client';

import React from 'react';
import Hero from '../core/Hero';

type Props = {
  children: React.ReactNode;
};

const DashboardContainer = (props: Props) => {
  const { children } = props;

  return (
    <div className="space-y-4">
      <Hero />
      {children}
    </div>
  );
};

export default DashboardContainer;
