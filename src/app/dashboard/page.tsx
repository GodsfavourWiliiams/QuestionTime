import React from 'react';
import { Metadata } from 'next';
import View from '@/components/pages/dashboard';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getQuestions } from '@/services';

export const metadata: Metadata = {
  title: 'Question Time - Home',
  description: '',
};

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-questions'],
    queryFn: async () => await getQuestions.getQuestions(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <View />
    </HydrationBoundary>
  );
}