"use client"

import { LandingSection } from "@/components/layout/landing-section";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const LocationSection = () => {
    const { t } = useTranslation("home");

    return (
        <LandingSection title={t("location.title")}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-32 min-h-[600px]">
                <div className="flex-1 flex flex-col gap-1 text-gray-500">
                    <Link className="hover:underline w-fit" href="https://maps.google.com/?q=69+Boulevard+Victor+Hugo+93400+Saint+Ouen" target="_blank" rel="noopener noreferrer">
                        <h3>Parc d&apos;activités Victor Hugo</h3>
                        <h3>Batiment 6.7</h3>
                        <h3>93400 Saint-Ouen</h3>
                    </Link>
                    <div className="space-y-2">
                        <a
                            href="https://maps.google.com/?q=69+Boulevard+Victor+Hugo+93400+Saint+Ouen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block cursor-pointer"
                        >
                            <Image
                                src="/entree-victor-hugo.webp"
                                alt="Entrée Victor Hugo"
                                width={400}
                                height={300}
                                className="rounded-lg w-full h-48 object-cover md:grayscale md:transition-all md:duration-300 md:hover:grayscale-0"
                            />
                        </a>
                        <a
                            href="https://maps.google.com/?q=69+Boulevard+Victor+Hugo+93400+Saint+Ouen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-end hover:text-blue-500 transition-colors"
                        >
                            69 Boulevard Victor Hugo, 93400 Saint-Ouen
                        </a>
                    </div>
                    <div className="space-y-2">
                        <a
                            href="https://maps.google.com/?q=18+Rue+Louis+Blanc+93400+Saint+Ouen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block cursor-pointer"
                        >
                            <Image
                                src="/entree-louis-blanc.webp"
                                alt="Entrée Louis Blanc"
                                width={400}
                                height={300}
                                className="rounded-lg w-full h-48 object-cover md:grayscale md:transition-all md:duration-300 md:hover:grayscale-0"
                            />
                        </a>
                        <a
                            href="https://maps.google.com/?q=18+Rue+Louis+Blanc+93400+Saint+Ouen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-end hover:text-blue-500 transition-colors"
                        >
                            18 Rue Louis Blanc, 93400 Saint-Ouen
                        </a>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5244.773141109535!2d2.32734981223126!3d48.90802677121941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f6a786a45ab%3A0xe5eaaf6a57cac9ef!2sE-Do%20-%20Studio%20%2F%20Agence%20Digitale!5e0!3m2!1sfr!2sfr!4v1738158151145!5m2!1sfr!2sfr"
                    className="flex-1 w-full h-[400px] md:h-full md:min-h-[650px] rounded-lg"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </LandingSection>
    );
};