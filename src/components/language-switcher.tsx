'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="uppercase opacity-0"
      >
        FR
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="uppercase"
    >
      {i18n.language === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
} 