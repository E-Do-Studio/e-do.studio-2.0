"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface AddressSectionProps {
  className?: string;
}

function AddressSection({ className }: AddressSectionProps) {
  const transportOptions = [
    { label: "Mairie de Saint-Ouen", icon: "14" },
    { label: "Garibaldi", icon: "13" },
    { label: "Parc d'activités Victor Hugo", icon: "P" },
    { label: "Places de parking", icon: "P" },
  ];

  return (
    <div className={cn(className)}>
      <h3 className="text-white text-xl font-medium mb-6">Adresse</h3>
      <div className="space-y-2 text-gray-300">
        <p>Parc d&apos;activités Victor Hugo</p>
        <p>93400 Saint-Ouen</p>
        <p>Bâtiment 6.7</p>
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
        <p className="mt-4">Accès direct au Studio</p>
      </div>
    </div>
  );
}

interface ScheduleSectionProps {
  className?: string;
}

function ScheduleSection({ className }: ScheduleSectionProps) {
  return (
    <div className={cn(className)}>
      <h3 className="text-white text-xl font-medium mb-6">Schedule</h3>
      <div className="space-y-2 text-gray-300">
        <p>Du lundi au vendredi</p>
        <p>09h00 à 19h00</p>
        <p>Ouvert le week end sur RDV</p>
      </div>
    </div>
  );
}

interface ContactSectionProps {
  className?: string;
}

function ContactSection({ className }: ContactSectionProps) {
  return (
    <div className={cn(className)}>
      <h3 className="text-white text-xl font-medium mb-6">Contact us</h3>
      <div className="space-y-4 text-gray-300">
        <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-white hover:text-black transition-colors">
          Nous contacter par e-mail
        </button>
        <p>
          N&apos;hesitez pas à directement nous appeler au{" "}
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
  const socialLinks = [
    { label: "FACEBOOK", href: "https://www.facebook.com/EdoStudioAgency/" },
    { label: "INSTAGRAM", href: "https://www.instagram.com/edostudio/" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/company/e-do/posts/?feedView=all" },
  ];

  return (
    <div className={cn(`flex justify-between items-center`, className)}>
      {socialLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          className="text-white hover:text-white text-sm"
        >
          {link.label}
        </Link>
      ))}
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