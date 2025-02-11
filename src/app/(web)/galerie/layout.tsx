import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'E-Do Studio - Galerie',
  description: 'Découvrez notre galerie de packshots automatisés',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'E-Do Studio - Galerie',
  },
}

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
