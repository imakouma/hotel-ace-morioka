import type { Metadata } from "next";
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
  title: "ホテルグランテラス仙台国分町 - ホテル館内のご案内",
  description: "ホテルグランテラス仙台国分町の館内案内サイトです",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
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
    "name": "ホテルグランテラス仙台国分町",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JP",
      "addressRegion": "宮城県",
      "addressLocality": "仙台市青葉区",
      "streetAddress": "国分町2-2-2"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "朝食",
        "description": "ご朝食 (1F レストラン) 大人 1,200円（税込）／子供（小学生）800円（税込）。朝食会場は10階。営業時間 6:45～9:00（最終入場8:45）。当ホテルでは和洋の朝食バイキングをご用意しております。地元の食材を活かした、栄養満点の朝食バイキングをお召し上がりいただけます。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "チェックイン・チェックアウト",
        "description": "チェックイン 15:00／チェックアウト 10:00。BBH会員の方はチェックイン 14:00／チェックアウト 11:00。アーリーチェックイン 1時間につき1,000円（最大14:00まで）。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wi-Fi",
        "description": "館内全域でWi-Fiをご利用いただけます。Password: granteras01"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "サービスコーナー",
        "description": "自動販売機（アルコール類は5・7・9F）、電子レンジ、製氷機、喫煙コーナー、ズボンプレッサー（各階エレベーター前）、ランドリーコーナー（洗濯機/1回200円 乾燥機/10分100円、洗剤はフロントにて無料配布）"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "ロビー・施設",
        "description": "ヨーロピアン・アンティークの調度品が優雅なロビー。「スターバックス コーヒー」はロビーから直接お入りいただけます。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "提携駐車場",
        "description": "1. パーキングタウンマギー（仙台市青葉区国分町1丁目7-22、TEL: 022-261-3750、駐車料金：2,000円、高さ制限：2.40m、24h営業、割引適用時間：入庫から24h）。2. いなりパーキング（仙台市青葉区国分町2丁目2-9、TEL: 090-3120-2011、駐車料金：1,200円、高さ制限：1.78m、24h営業、割引適用時間：入庫から24h）。3. 大仙台駐車場（仙台市青葉区立町1-23、TEL: 022-222-7643、駐車料金：1,200円、高さ制限：2.40m、24h営業、割引適用時間：入庫から最大36h）"
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
