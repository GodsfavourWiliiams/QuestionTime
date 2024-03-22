'use client';

import { AppContainer } from '@/components/core/AppContainer';
import React from 'react';

type Props = {};

const View = (props: Props) => {
  return (
    <>
      <AppContainer className="flex flex-col py-10 md:py-20 w-full gap-10">
        <h1>Table</h1>
        {/* <EditorTable /> */}
      </AppContainer>
    </>
  );
};

export default View;
