import type { Metadata } from 'next';
import '../../styles/globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { Fredoka } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { FacebookPixel } from '@/components/FacebookPixel/FacebookPixel';
import { TikTokPixel } from '@/components/TikTokPixel/TikTokPixel';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font_fredoka',
});

const localeMetadata: Record<
  string,
  { title: string; description: string; keywords: string }
> = {
  uk: {
    title: 'FlexiFun – набір для розвитку FlexiFun Geometry',
    description:
      'FlexiFun Geometry – це інноваційний набір для розвитку дитини, який допомагає розвивати моторику та логічне мислення за допомогою системи відео вправ. Завдяки двом режимам вправ, тренажер адаптується до різних потреб користувачів, роблячи навчання цікавим і ефективним.',
    keywords:
      'FlexiFun Geometry, онлайн тренажер, розвиток моторики, логічне мислення, відео вправи, інноваційний тренажер, навчання, освіта',
  },
  sk: {
    title: 'FlexiFun – vývojový kit FlexiFun Geometry',
    description:
      'FlexiFun Geometry - je inovatívna súprava na rozvoj detí, ktorá pomáha rozvíjať motorické zručnosti a logické myslenie prostredníctvom systému video cvičení. Vďaka dvom režimom cvičenia sa simulátor prispôsobuje rôznym potrebám používateľov, vďaka čomu je tréning zaujímavý a efektívny.',
    keywords:
      'FlexiFun Geometry, online trenažér, rozvoj motoriky, logické myslenie, video cvičenia, inovatívny trenažér, učenie, vzdelávanie',
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { locale } = await params;
  const metadataValues = localeMetadata[locale] || localeMetadata.uk;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://flexifun.io'
    ),
    title: metadataValues.title,
    description: metadataValues.description,
    keywords: metadataValues.keywords,
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataValues.title,
      description: metadataValues.description,
      images: [
        {
          url: '/assets/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: metadataValues.title,
        },
      ],
    },
    openGraph: {
      title: metadataValues.title,
      description: metadataValues.description,
      type: 'website',
      images: [
        {
          url: '/assets/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: metadataValues.title,
        },
      ],
    },
    icons: {
      icon: [
        { url: '/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/assets/favicon.svg', type: 'image/svg+xml' },
        { url: '/assets/favicon.ico', type: 'image/x-icon' },
        { url: '/assets/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
    manifest: '/assets/site.webmanifest',
  };
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={`${fredoka.variable}`}>
          {children}
          <div id="__next"></div>
          <div id="portal-root"></div>
          <ToastContainer />
          <Suspense fallback={null}>
            <FacebookPixel />
            <TikTokPixel />
          </Suspense>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
