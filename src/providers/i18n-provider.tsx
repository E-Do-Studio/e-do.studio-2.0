"use client";

import { I18nextProvider } from "react-i18next";
import i18next from "@/i18n/config";
import { useEffect, useState } from "react";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
} 