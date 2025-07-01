"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Linkedin } from 'lucide-react'

interface AddressSectionProps {
  className?: string;
}

function AddressSection({ className }: AddressSectionProps) {
  const { t } = useTranslation('layout');

  const transportOptions = [
    { label: t('footer.address.transport.metro_14'), icon: "14" },
    { label: t('footer.address.transport.metro_13'), icon: "13" },
  ];

  return (
    <div className={cn(className)}>
      <h3 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2">{t('footer.address.title')}</h3>
      <div className="space-y-0.5 text-gray-300 text-sm">
        <p>{t('footer.address.building')}</p>
        <p>{t('footer.address.city')}</p>
        <p>{t('footer.address.building_number')}</p>
        <div className="mt-1 sm:mt-2 space-y-0.5">
          {transportOptions.map((option) => (
            <div key={option.label} className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white flex items-center justify-center text-[10px] sm:text-xs text-white">
                {option.icon}
              </div>
              <span className="text-white text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ScheduleSectionProps {
  className?: string;
}

function ScheduleSection({ className }: ScheduleSectionProps) {
  const { t } = useTranslation('layout');

  return (
    <div className={cn(className)}>
      <h3 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2">{t('footer.schedule.title')}</h3>
      <div className="space-y-0.5 text-gray-300 text-sm">
        <p>{t('footer.schedule.weekdays')}</p>
        <p>{t('footer.schedule.hours')}</p>
        <p>{t('footer.schedule.weekend')}</p>
      </div>
    </div>
  );
}

interface ContactSectionProps {
  className?: string;
}

function ContactSection({ className }: ContactSectionProps) {
  const { t } = useTranslation('layout');

  return (
    <div className={cn(className)}>
      <h3 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2">{t('footer.contact.title')}</h3>
      <div className="space-y-1 sm:space-y-2 text-gray-300 text-sm">
        <Link
          href="/#contact"
          className="inline-block px-3 py-1 border border-gray-300 rounded-full hover:bg-white hover:text-black transition-colors"
        >
          {t('footer.contact.email_button')}
        </Link>
        <p>
          {t('footer.contact.phone_text')}{" "}
          <br />
          <Link href="tel:+33144041149" className="text-white">
            +33 1 44 04 11 49
          </Link>
        </p>
      </div>
    </div>
  );
}

interface SocialLinksProps {
  className?: string;
}

function SocialLinks({ className }: SocialLinksProps) {
  const { t, i18n } = useTranslation('layout');
  const socialLinks = [
    {
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://www.instagram.com/edostudio/",
      label: "Instagram"
    },
    {
      icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://www.facebook.com/EdoStudioAgency/",
      label: "Facebook"
    },
    {
      icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "https://www.linkedin.com/company/e-do/posts/?feedView=all",
      label: "LinkedIn"
    },
  ];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex items-center gap-3 sm:gap-4">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            className="text-white hover:text-gray-300 transition-colors p-1"
            aria-label={link.label}
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/legal"
          className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors"
        >
          {i18n.language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
        </Link>
        <Link
          href="/faq"
          className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors"
        >
          {i18n.language === 'fr' ? 'FAQ' : 'FAQ'}
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-black mt-6 sm:mt-8 relative z-20">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AddressSection className="sm:text-left" />
            <ScheduleSection className="sm:text-left" />
            <ContactSection className="sm:text-left col-span-1 sm:col-span-2 lg:col-span-1" />
          </div>
          <div className="w-full h-px bg-gray-800 my-3 sm:my-4" />
          <div className="flex flex-col items-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}