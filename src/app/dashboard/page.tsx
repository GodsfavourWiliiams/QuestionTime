import React from 'react';
import { Metadata } from 'next';
import View from '@/components/pages/dashboard';

export const metadata: Metadata = {
  title: 'Question Time - Home',
  description: '',
};

export default function Home() {
  return <View />;
}
