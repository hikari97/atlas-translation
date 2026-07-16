import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang="en"
      suppressHydrationWarning
    >
      <Head>
        <meta
          name="description"
          content="Atlas Studio is an AI comic localization workspace for OCR, translation, editing, and export."
        />
        <meta name="theme-color" content="#2563eb" />
        <meta property="og:title" content="Atlas Studio" />
        <meta
          property="og:description"
          content="A production workspace for AI-assisted comic localization."
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
