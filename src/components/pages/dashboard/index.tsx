'use client';

import { AppContainer } from '@/components/core/AppContainer';
import React from 'react';
import QuestionList from './QuestionList';

type Props = {};

const View = (props: Props) => {
  return (
    <>
      <AppContainer className="flex flex-col py-10 w-full gap-10">
        <QuestionList />
      </AppContainer>
    </>
  );
};

export default View;
