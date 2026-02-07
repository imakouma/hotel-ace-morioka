import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "ホテルエース盛岡 - ホテル館内のご案内",
  description: "ホテルエース盛岡の館内案内サイトです。盛岡駅から徒歩約10分、繁華街へ徒歩1分の好立地。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ホテル館内案内の構造化データ
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "ホテルエース盛岡",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JP",
      "addressRegion": "岩手県",
      "addressLocality": "盛岡市",
      "streetAddress": "中央通2丁目11-35",
      "postalCode": "020-0021"
    },
    "telephone": "019-654-3811",
    "url": "https://www.hotel-ace.co.jp/",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "朝食",
        "description": "ご朝食 (1F レストラン) 大人 1,200円（税込）／子供（小学生）800円（税込）。営業時間 6:45～9:00（最終入場8:45）。和洋の朝食バイキング。地元岩手の食材を活かした、栄養満点の朝食をお召し上がりいただけます。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "チェックイン・チェックアウト",
        "description": "チェックイン 15:00／チェックアウト 11:00。自動チェックイン機をご利用いただけます。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wi-Fi",
        "description": "館内全域で無料Wi-Fiをご利用いただけます。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "まんがライブラリィ",
        "description": "約2,900冊の漫画が読み放題（15:00～22:00）。ご宿泊の方はお部屋へお持ちいただけます。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "宿泊者限定サービス",
        "description": "フリードリンクコーナー（15:00～22:00）、おにぎりサービス（平日18:00～、先着約50名様）"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "館内設備",
        "description": "自動販売機、電子レンジ、製氷機、コインランドリー（洗濯機/1回200円 乾燥機/10分100円、洗剤はフロントにて無料配布）"
      }
    ]
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <ChatBot />
        </LanguageProvider>
      </body>
    </html>
  );
}
