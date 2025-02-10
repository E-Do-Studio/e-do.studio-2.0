import { NewsletterPopup } from "@/components/newsletter-popup";
import { CookieBanner } from "@/components/cookie-banner";
import { I18nProvider } from "@/providers/i18n-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {children}
          <NewsletterPopup />
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
} 