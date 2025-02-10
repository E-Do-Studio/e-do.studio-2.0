"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const { t } = useTranslation("cookies");
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cookieChoice = localStorage.getItem("cookieChoice");
    if (!cookieChoice) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieChoice", "accepted");
    setShowBanner(false);
  };

  const handleRefuse = () => {
    localStorage.setItem("cookieChoice", "refused");
    setShowBanner(false);
  };

  if (!mounted || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black px-8 py-8 text-white lg:py-4">
      <div className="mx-auto flex max-w-[380px] flex-col lg:max-w-none lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2.5 lg:flex lg:space-x-5 lg:space-y-0">
          <p className="text-sm leading-[1.71] tracking-[0.25px] text-white/50">
            {t("We use cookies")}
          </p>
          <p className="text-sm leading-[1.71] tracking-[0.25px]">
            {t(
              "Cookies, small computer files, may be placed on your device. If you consent, the site manager may collect anonymous visit statistics to optimize navigation."
            )}
          </p>
        </div>

        <div className="mt-5 flex flex-col space-y-5 lg:ml-[50px] lg:mt-0 lg:flex-row lg:space-x-5 lg:space-y-0">
          <Button
            variant="outline"
            onClick={handleRefuse}
            className={cn(
              "h-auto w-full border-2 border-white px-3.5 py-3.5 text-white",
              "lg:h-[30px] lg:w-auto lg:px-[30px] lg:py-6"
            )}
          >
            {t("Refuse")}
          </Button>
          <Button
            onClick={handleAccept}
            className={cn(
              "h-auto w-full border-2 border-white bg-white px-3.5 py-3.5 text-black",
              "hover:border-white hover:bg-white/90",
              "focus:border-white focus:ring-0",
              "active:border-white",
              "lg:h-[30px] lg:w-auto lg:px-[30px] lg:py-6"
            )}
          >
            {t("Accept")}
          </Button>
        </div>
      </div>
    </div>
  );
} 