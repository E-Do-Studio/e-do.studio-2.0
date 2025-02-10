"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { X, ArrowRight } from "lucide-react";

export function NewsletterPopup() {
  const { t } = useTranslation("popup");
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
    const isPopupClosed = localStorage.getItem("popupClosed") === "true";
    if (!isPopupClosed) {
      setShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("popupClosed", "true");
    setShowPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const data = new URLSearchParams({
      g: "XheCg2",
      email: email,
    });

    try {
      await fetch("https://manage.kmail-lists.com/ajax/subscriptions/subscribe", {
        method: "POST",
        body: data,
      });

      setIsSubmitted(true);
      setTimeout(() => setShowPopup(false), 2500);
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
    }
  };

  if (!mounted) return null;
  if (!showPopup) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 z-30 w-full animate-slideUp bg-black px-8 py-4",
        isSubmitted && "animate-slideDown"
      )}
    >
      <div className={cn("relative")}>
        {!isSubmitted ? (
          <div className="flex flex-col gap-4 lg:px-8 lg:py-4">
            {/* Texte et bouton de fermeture mobile */}
            <div className="flex justify-end">
              <button onClick={handleClose}>
                <X className="h-16 w-16 text-white" strokeWidth={1} />
              </button>
            </div>

            <div className="flex justify-between">
              <span className="font-abc-favorit text-2xl leading-8 text-white">
                {t("Enter your e-mail address to subscribe to the newsletter:")}
              </span>
            </div>

            {/* Formulaire */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative flex w-full items-center"
            >
              <input
                type="email"
                name="email"
                required
                className="w-full border-b bg-transparent pb-2 text-white outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <ArrowRight className="h-6 w-6 text-white" />
              </button>
            </form>

            {/* Bouton de fermeture desktop */}
            <div className="hidden text-right lg:block">
              <button onClick={handleClose}>
                <X className="h-6 w-6 text-black" />
              </button>
            </div>
          </div>
        ) : (
          <p className="font-abc-favorit text-2xl leading-8 text-white px-[50px] py-4">
            {t("Thank you for registering!")}
          </p>
        )}
      </div>
    </div>
  );
} 