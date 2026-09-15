import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/noto-sans-jp";
import "@fontsource-variable/noto-serif-jp";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { I18nProvider } from "@/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Surya Pratap Singh Chauhan — Security Researcher & Developer",
  description:
    "Information Security postgrad at NSUT. Applied cryptography research, C++ systems, and open-source security & language-learning tools. 3 peer-reviewed publications. 情報セキュリティ専攻の大学院生。",
  metadataBase: new URL("https://brodante.github.io"),
  openGraph: {
    title: "Surya Pratap Singh Chauhan — spsc://portfolio",
    description:
      "Security researcher · SDE · builder. Applied crypto, embedded C++, and open source. / セキュリティ研究者",
    url: "https://brodante.github.io/portfolio/",
    type: "website",
  },
};

const themeScript = `(function(){var t="dark";try{t=localStorage.getItem("spsc-theme")||"dark"}catch(e){}document.documentElement.dataset.theme=t;})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <CursorGlow />
          <Nav />
          <main id="top" className="relative z-10">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
