"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const TABS = ["mentions", "cgu", "cgv", "confidentialite"] as const;
type TabType = typeof TABS[number];

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-md transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted hover:bg-muted/80"
      )}
    >
      {children}
    </button>
  );
}

export default function LegalPage() {
  const { t } = useTranslation('layout');
  const [activeTab, setActiveTab] = useState<TabType>("mentions");

  const getPdfUrl = (tab: TabType) => {
    const baseUrl = (() => {
      switch (tab) {
        case "mentions":
          return "/img/mentions_legales.pdf";
        case "cgu":
          return "/img/CGU.pdf";
        case "cgv":
          return "/img/CGV.pdf";
        case "confidentialite":
          return "/img/politique_de_confidentialite.pdf";
      }
    })();

    // Cache uniquement le panneau de navigation (compteur de pages)
    return `${baseUrl}#navpanes=0`;
  };

  const renderContent = () => {
    const pdfUrl = getPdfUrl(activeTab);
    
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-4xl h-[600px] md:h-[800px] relative bg-white rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title={t(`legal.tabs.${activeTab}`)}
            frameBorder="0"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container pt-32 pb-16">
      <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
        {TABS.map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {t(`legal.tabs.${tab}`)}
          </TabButton>
        ))}
      </div>
      {renderContent()}
    </div>
  );
} 