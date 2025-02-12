"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { HEADER_HEIGHT } from '@/lib/constants';

interface AddressSectionProps {
  className?: string;
}

function AddressSection({ className }: AddressSectionProps) {
  const { t } = useTranslation('layout');

  const transportOptions = [
    { label: t('footer.address.transport.metro_14'), icon: "14" },
    { label: t('footer.address.transport.metro_13'), icon: "13" },
    { label: t('footer.address.transport.activity_park'), icon: "P" },
    { label: t('footer.address.transport.parking'), icon: "P" },
  ];

  return (
    <div className={cn(className)}>
      <h3 className="text-white text-xl font-medium mb-6">{t('footer.address.title')}</h3>
      <div className="space-y-2 text-gray-300">
        <p>{t('footer.address.building')}</p>
        <p>{t('footer.address.city')}</p>
        <p>{t('footer.address.building_number')}</p>
        <div className="mt-6 space-y-2">
          {transportOptions.map((option) => (
            <div key={option.label} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-sm text-white">
                {option.icon}
              </div>
              <span className="text-white">{option.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4">{t('footer.address.direct_access')}</p>
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
      <h3 className="text-white text-xl font-medium mb-6">{t('footer.schedule.title')}</h3>
      <div className="space-y-2 text-gray-300">
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
  const router = useRouter();
  const pathname = usePathname();

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname !== '/') {
      router.push('/#contact');
      return;
    }

    const element = document.querySelector('#contact');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - HEADER_HEIGHT - 24;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={cn(className)}>
      <h3 className="text-white text-xl font-medium mb-6">{t('footer.contact.title')}</h3>
      <div className="space-y-4 text-gray-300">
        <Link
          href="/#contact"
          onClick={scrollToContact}
          className="inline-block px-4 py-2 border border-gray-300 rounded-full hover:bg-white hover:text-black transition-colors"
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
      icon: <Facebook className="w-5 h-5" />,
      href: "https://www.facebook.com/EdoStudioAgency/",
      label: "Facebook"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/edostudio/",
      label: "Instagram"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/e-do/posts/?feedView=all",
      label: "LinkedIn"
    },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex gap-6 items-center justify-center lg:justify-end">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            className="text-white hover:text-gray-300 transition-colors"
            aria-label={link.label}
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <Link
        href="/legal"
        className="text-gray-300 hover:text-white text-sm text-center lg:text-right transition-colors"
      >
        {i18n.language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
      </Link>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-background-footer mt-32">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-8">
          <div className="lg:col-span-4">
            <AddressSection />
          </div>
          <div className="lg:col-span-4">
            <ScheduleSection />
          </div>
          <div className="lg:col-span-4 flex flex-col justify-between">
            <ContactSection />
            <SocialLinks className="mt-8 lg:mt-auto pt-4 lg:pt-0" />
          </div>
        </div>
      </div>
    </footer>
  );
}