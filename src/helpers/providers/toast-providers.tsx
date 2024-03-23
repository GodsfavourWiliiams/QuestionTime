"use client";

import React from "react";
import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      visibleToasts={3}
      toastOptions={{
        className: "",
        duration: 3500,
        style: {
          borderRadius: "16px",
          fontSize: "14px",
        },
      }}
    />
  );
};

export default ToastProvider;
