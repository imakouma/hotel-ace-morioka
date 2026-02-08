"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, type LanguageCode } from "@/contexts/LanguageContext";

/** バナーは縦の要素が多いため 4:3 で全体が切れずに見える */
const BANNER_ASPECT = "aspect-[4/3]";
const CARD_IMAGE_ASPECT = "aspect-[4/3]";

/** 参考画像の色（ご夕食クーポン!バナー） */
const HEADER_BG = "#315286";
const COUPON_BG = "#90846c";
/** 本家のクーポン文言色（若干黄色みのクリーム） */
const COUPON_TEXT_COLOR = "#EEE3C4";
const MAP_BTN_BG = "#F5A623";

const COUPON_SITE = "/coupon-page";
const bannerImage = `${COUPON_SITE}/title.png`;
const parkingImage = `${COUPON_SITE}/スクリーンショット 2026-02-06 3.15.05.png`;
const shopImages = [
  `${COUPON_SITE}/morioka-genkaitiba/IMG_2058.PNG`, // もりおか炭火居酒屋原価市場
  `${COUPON_SITE}/itiya/スクリーンショット 2026-02-08 17.09.17.png`, // 魚処　壱や　大通り店
  `${COUPON_SITE}/rikyuu/スクリーンショット 2026-02-08 17.09.30.png`, // やみつきホルモン利久
];

/** モーダル用の店舗詳細画像（MAP押下時に表示） */
const shopModalImages: string[][] = [
  [
    `${COUPON_SITE}/morioka-genkaitiba/スクリーンショット 2026-02-08 17.54.41.png`,
    `${COUPON_SITE}/morioka-genkaitiba/スクリーンショット 2026-02-08 17.55.24.png`,
    `${COUPON_SITE}/morioka-genkaitiba/スクリーンショット 2026-02-08 17.56.02.png`,
  ],
  [
    `${COUPON_SITE}/itiya/スクリーンショット 2026-02-08 18.02.07.png`,
    `${COUPON_SITE}/itiya/スクリーンショット 2026-02-08 18.02.20.png`,
    `${COUPON_SITE}/itiya/スクリーンショット 2026-02-08 18.02.33.png`,
    `${COUPON_SITE}/itiya/スクリーンショット 2026-02-08 18.02.45.png`,
  ],
  [
    `${COUPON_SITE}/rikyuu/スクリーンショット 2026-02-08 18.07.13.png`,
    `${COUPON_SITE}/rikyuu/スクリーンショット 2026-02-08 18.07.26.png`,
    `${COUPON_SITE}/rikyuu/スクリーンショット 2026-02-08 18.07.52.png`,
    `${COUPON_SITE}/rikyuu/スクリーンショット 2026-02-08 18.08.10.png`,
  ],
];

/** モーダル用の店舗説明文（参考画像の雰囲気に合わせる） */
const shopModalDescriptions = [
  "配布のクーポン券持参または、この画面の提示で岩手名物盛岡冷麺(ハーフ)か前沢牛60gどちらか無料!!",
  "注文時スタッフに提示でファーストドリンクかお刺身三点盛り人数分無料。",
  "注文時スタッフに提示で店舗お任せ一品料理無料!!",
];

/** クーポンページの多言語翻訳 */
const couponTranslations: Record<
  LanguageCode,
  {
    pageTitle: string;
    backToGuide: string;
    usageMessage: string;
    usageNote: string;
    bringCoupon: string;
    shop1Offer: string;
    shop2Offer1: string;
    shop2Or: string;
    shop2Offer2: string;
    shop3Offer: string;
    map: string;
    tel: string;
    showLargerMap: string;
    close: string;
  }
> = {
  ja: {
    pageTitle: "飲食店クーポン",
    backToGuide: "館内案内へ戻る",
    usageMessage: "配布のクーポン券を持参、またはこの画面の提示を注文時にスタッフへ渡してください。",
    usageNote: "※利用条件等は配布のクーポン券をご確認ください。",
    bringCoupon: "配布のクーポン券持参または、この画面の提示で",
    shop1Offer: "岩手名物盛岡冷麺(ハーフ)か前沢牛60gどちらか無料!!",
    shop2Offer1: "ファーストドリンクかお刺身三点盛り人数分無料",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "店舗お任せ一品料理無料!!",
    map: "MAP",
    tel: "TEL",
    showLargerMap: "拡大地図を表示",
    close: "閉じる",
  },
  en: {
    pageTitle: "Restaurant Coupon",
    backToGuide: "Back to facility guide",
    usageMessage: "Please bring the coupon ticket provided at check-in and hand it to the staff when ordering.",
    usageNote: "*Please check the distributed coupon for terms and conditions.",
    bringCoupon: "With your coupon ticket",
    shop1Offer: "50% OFF all items!!",
    shop2Offer1: "One chef's choice dish free",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Free sashimi assortment (5 kinds)!!",
    map: "MAP",
    tel: "TEL",
    showLargerMap: "Show larger map",
    close: "Close",
  },
  zh: {
    pageTitle: "餐饮优惠券",
    backToGuide: "返回馆内指南",
    usageMessage: "请务必携带入住时发放的优惠券，点餐时交给工作人员。",
    usageNote: "*使用条件等请参阅所发优惠券。",
    bringCoupon: "持发放的优惠券",
    shop1Offer: "全品半价!!",
    shop2Offer1: "店内推荐一品料理免费",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "刺身5种拼盘免费!!",
    map: "地图",
    tel: "电话",
    showLargerMap: "显示大地图",
    close: "关闭",
  },
  "zh-TW": {
    pageTitle: "餐飲優惠券",
    backToGuide: "返回館內指南",
    usageMessage: "請務必攜帶入住時發放的優惠券，點餐時交給工作人員。",
    usageNote: "*使用條件等請參閱所發優惠券。",
    bringCoupon: "持發放的優惠券",
    shop1Offer: "全品半價!!",
    shop2Offer1: "店內推薦一品料理免費",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "刺身5種拼盤免費!!",
    map: "地圖",
    tel: "電話",
    showLargerMap: "顯示大地圖",
    close: "關閉",
  },
  ko: {
    pageTitle: "식당 쿠폰",
    backToGuide: "시설 안내로 돌아가기",
    usageMessage: "체크인 시 받으신 쿠폰을 꼭 지참하시고 주문 시 스태프에게 전달해 주세요.",
    usageNote: "*이용 조건 등은 배포 쿠폰을 확인해 주세요.",
    bringCoupon: "배포 쿠폰을 지참하시면",
    shop1Offer: "전 품목 50% OFF!!",
    shop2Offer1: "매장 추천 일품 요리 무료",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "사시미 5종 모둠 무료!!",
    map: "지도",
    tel: "TEL",
    showLargerMap: "지도 크게 보기",
    close: "닫기",
  },
  fr: {
    pageTitle: "Coupon restaurant",
    backToGuide: "Retour au guide",
    usageMessage: "Veuillez apporter le coupon remis à l'enregistrement et le donner au personnel lors de la commande.",
    usageNote: "*Veuillez consulter le coupon pour les conditions.",
    bringCoupon: "Avec le coupon distribué",
    shop1Offer: "50% de réduction sur tout!!",
    shop2Offer1: "Un plat au choix du chef offert",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Assortiment de sashimi (5) offert!!",
    map: "CARTE",
    tel: "TEL",
    showLargerMap: "Agrandir la carte",
    close: "Fermer",
  },
  de: {
    pageTitle: "Restaurant-Gutschein",
    backToGuide: "Zurück zur Anleitung",
    usageMessage: "Bitte bringen Sie den bei der Anreise ausgehändigten Gutschein mit und übergeben Sie ihn beim Bestellen dem Personal.",
    usageNote: "*Bitte prüfen Sie die Bedingungen auf dem Gutschein.",
    bringCoupon: "Mit dem ausgehändigten Gutschein",
    shop1Offer: "50% Rabatt auf alles!!",
    shop2Offer1: "Ein Gericht nach Wahl des Küchenchefs kostenlos",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Sashimi-Set (5 Sorten) gratis!!",
    map: "KARTE",
    tel: "TEL",
    showLargerMap: "Karte vergrößern",
    close: "Schließen",
  },
  es: {
    pageTitle: "Cupón de restaurante",
    backToGuide: "Volver a la guía",
    usageMessage: "Por favor traiga el cupón entregado en el check-in y entréguelo al personal al hacer el pedido.",
    usageNote: "*Consulte el cupón para condiciones.",
    bringCoupon: "Con el cupón distribuido",
    shop1Offer: "50% de descuento en todo!!",
    shop2Offer1: "Un plato a elección del chef gratis",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Surtido de sashimi (5 tipos) gratis!!",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Ver mapa más grande",
    close: "Cerrar",
  },
  it: {
    pageTitle: "Coupon ristorante",
    backToGuide: "Torna alla guida",
    usageMessage: "Porti il coupon fornito al check-in e consegnilo al personale al momento dell'ordine.",
    usageNote: "*Consultare il coupon per i termini.",
    bringCoupon: "Con il coupon distribuito",
    shop1Offer: "50% di sconto su tutto!!",
    shop2Offer1: "Un piatto a scelta dello chef gratuito",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Assortimento di sashimi (5) gratuito!!",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Visualizza mappa più grande",
    close: "Chiudi",
  },
  th: {
    pageTitle: "คูปองร้านอาหาร",
    backToGuide: "กลับไปคู่มือโรงแรม",
    usageMessage: "กรุณานำคูปองที่ได้รับตอนเช็คอินมาและส่งให้พนักงานเมื่อสั่งอาหาร",
    usageNote: "*กรุณาตรวจสอบเงื่อนไขในคูปอง",
    bringCoupon: "นำคูปองที่แจกมา",
    shop1Offer: "เมนูทั้งหมดลด 50%!!",
    shop2Offer1: "อาหารจานเชฟเลือก 1 จาน ฟรี",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "ซาชิมิรวม 5 อย่าง ฟรี!!",
    map: "แผนที่",
    tel: "TEL",
    showLargerMap: "แสดงแผนที่ขนาดใหญ่",
    close: "ปิด",
  },
  vi: {
    pageTitle: "Phiếu giảm giá nhà hàng",
    backToGuide: "Quay lại hướng dẫn",
    usageMessage: "Vui lòng mang theo phiếu được phát khi nhận phòng và giao cho nhân viên khi gọi món.",
    usageNote: "*Vui lòng xem phiếu để biết điều kiện.",
    bringCoupon: "Mang theo phiếu được phát",
    shop1Offer: "Giảm 50% tất cả món!!",
    shop2Offer1: "Một món do đầu bếp chọn miễn phí",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Miễn phí sashimi tổng hợp (5 loại)!!",
    map: "BẢN ĐỒ",
    tel: "TEL",
    showLargerMap: "Hiện bản đồ lớn hơn",
    close: "Đóng",
  },
  id: {
    pageTitle: "Kupon restoran",
    backToGuide: "Kembali ke panduan",
    usageMessage: "Harap bawa kupon yang diberikan saat check-in dan serahkan ke staf saat memesan.",
    usageNote: "*Silakan periksa kupon untuk syarat dan ketentuan.",
    bringCoupon: "Dengan kupon yang dibagikan",
    shop1Offer: "Diskon 50% semua menu!!",
    shop2Offer1: "Satu hidangan pilihan chef gratis",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Gratis sashimi campur (5 jenis)!!",
    map: "PETA",
    tel: "TEL",
    showLargerMap: "Tampilkan peta lebih besar",
    close: "Tutup",
  },
  pt: {
    pageTitle: "Cupom de restaurante",
    backToGuide: "Voltar ao guia",
    usageMessage: "Traga o cupom fornecido no check-in e entregue-o à equipe ao fazer o pedido.",
    usageNote: "*Consulte o cupom para condições.",
    bringCoupon: "Com o cupom distribuído",
    shop1Offer: "50% de desconto em tudo!!",
    shop2Offer1: "Um prato à escolha do chef grátis",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Assortimento de sashimi (5) grátis!!",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Mostrar mapa maior",
    close: "Fechar",
  },
  tl: {
    pageTitle: "Coupon ng restaurant",
    backToGuide: "Bumalik sa gabay",
    usageMessage: "Mangyaring dalhin ang coupon na ibinigay sa check-in at ibigay sa staff kapag umorder.",
    usageNote: "*Mangyaring tingnan ang coupon para sa mga tuntunin.",
    bringCoupon: "Sa distributed coupon",
    shop1Offer: "50% OFF sa lahat ng items!!",
    shop2Offer1: "Isang putahe ng chef's choice libre",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Sashimi assortment (5 kinds) libre!!",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Ipakita ang mas malaking mapa",
    close: "Isara",
  },
  ms: {
    pageTitle: "Kupon restoran",
    backToGuide: "Kembali ke panduan",
    usageMessage: "Sila bawa kupon yang diberikan semasa daftar masuk dan serahkan kepada kakitangan ketika membuat pesanan.",
    usageNote: "*Sila rujuk kupon untuk syarat.",
    bringCoupon: "Dengan kupon yang diedarkan",
    shop1Offer: "Diskaun 50% semua menu!!",
    shop2Offer1: "Satu hidangan pilihan chef percuma",
    shop2Or: "",
    shop2Offer2: "",
    shop3Offer: "Sashimi campur (5 jenis) percuma!!",
    map: "PETA",
    tel: "TEL",
    showLargerMap: "Tunjukkan peta lebih besar",
    close: "Tutup",
  },
};

function getCouponT(lang: LanguageCode) {
  const base = couponTranslations.en as Record<string, unknown>;
  const selected = (couponTranslations as Record<string, Record<string, unknown> | undefined>)[lang] ?? {};
  const merged: Record<string, unknown> = { ...base, ...selected };

  for (const key of Object.keys(base)) {
    const val = selected[key];
    if (typeof val === "string" && val.trim() === "") {
      merged[key] = base[key];
    }
  }

  return merged as typeof couponTranslations.en;
}

const shopsBase = [
  {
    nameKey: "shop1" as const,
    imageSrc: shopImages[0],
    branches: [
      {
        name: "もりおか炭火居酒屋原価市場",
        address: "〒020-0022 岩手県盛岡市大通２丁目７−１９ 白崎二番館 2F",
        tel: "019-601-9700",
        hours: "16:00～23:00（L.O.22:30）／土日祝 15:00～23:00",
        holiday: "年中無休（12/31〜1/1は休み）",
        validity: "チェックアウト当日まで有効",
        distance: "ホテルより徒歩約5分",
        lat: 39.7013056,
        lng: 141.1526944,
        placeUrl: "https://www.google.com/maps/place/%E7%9B%9B%E5%B2%A1%E7%82%AD%E7%81%AB%E5%B1%85%E9%85%92%E5%B1%8B+%E5%8E%9F%E4%BE%A1%E5%B8%82%E5%A0%B4/@39.7032885,141.1425842,17z/data=!3m2!4b1!5s0x5f85763011491bbb:0xe500d3922afd3b00!4m6!3m5!1s0x5f857630140187d5:0x3bb559f06d95d0fc!8m2!3d39.7032885!4d141.1451645!16s%2Fg%2F1hc629f8n?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D",
      },
    ],
    hours: "16:00～23:00（L.O.22:30）／土日祝 15:00～23:00",
    holiday: "年中無休（12/31〜1/1は休み）",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E3%80%92020-0022%20%E5%B2%A9%E6%89%8B%E7%9C%8C%E7%9B%9B%E5%B2%A1%E5%B8%82%E5%A4%A7%E9%80%9A%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%97%E2%88%92%EF%BC%91%EF%BC%99%20%E7%99%BD%E5%B4%8E%E4%BA%8C%E7%95%AA%E9%A4%A8%202F",
  },
  {
    nameKey: "shop2" as const,
    imageSrc: shopImages[1],
    branches: [
      {
        name: "魚処　壱や　大通り店",
        address: "〒020-0022 岩手県盛岡市大通り２丁目３−１４ 1F",
        tel: "019-601-3166",
        hours: "月〜土 18:00〜26:00(LO25:00)\n日曜日 18:00〜24:00",
        lat: 39.7016,
        lng: 141.1530,
        holiday: "木曜日 定休日",
        placeUrl: "https://www.google.com/maps/place/%E9%AD%9A%E5%87%A6+%E5%A3%B1%E3%82%84+%E5%A4%A7%E9%80%9A%E3%82%8A%E5%BA%97/data=!4m2!3m1!1s0x5f85770f102c181f:0x9ee4bf44873b2ebb?sa=X&ved=1t:242&ictx=111",
      },
    ],
    hours: "月〜土 18:00〜26:00(LO25:00)\n日曜日 18:00〜24:00",
    holiday: "木曜日 定休日",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E3%80%92020-0022%20%E5%B2%A9%E6%89%8B%E7%9C%8C%E7%9B%9B%E5%B2%A1%E5%B8%82%E5%A4%A7%E9%80%9A%E3%82%8A%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%93%E2%88%92%EF%BC%91%EF%BC%94%201F",
  },
  {
    nameKey: "shop3" as const,
    imageSrc: shopImages[2],
    branches: [
      {
        name: "やみつきホルモン利久　大通り店",
        address: "〒020-0022 岩手県盛岡市大通１丁目１０−２１ PIVOT盛岡大通りビル 2 1F",
        tel: "019-613-2929",
        hours: "日・土 11:30～22:30\n月〜金 11:30～14:30, 17:00～22:30",
        holiday: "年中無休",
        lat: 39.7020,
        lng: 141.1535,
        placeUrl:
          "https://www.google.com/maps/place/%E3%82%84%E3%81%BF%E3%81%A4%E3%81%8D%E3%83%9B%E3%83%AB%E3%83%A2%E3%83%B3+%E5%88%A9%E4%B9%85+%E7%9B%9B%E5%B2%A1%E5%A4%A7%E9%80%9A%E5%BA%97/data=!4m2!3m1!1s0x0:0xd4a293075b50f790?sa=X&ved=1t:2428&ictx=111",
      },
    ],
    hours: "日・土 11:30～22:30\n月〜金 11:30～14:30, 17:00～22:30",
    holiday: "年中無休",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E3%80%92020-0022%20%E5%B2%A9%E6%89%8B%E7%9C%8C%E7%9B%9B%E5%B2%A1%E5%B8%82%E5%A4%A7%E9%80%9A%EF%BC%91%E4%B8%81%E7%9B%AE%EF%BC%91%EF%BC%90%E2%88%92%EF%BC%92%EF%BC%91%20PIVOT%E7%9B%9B%E5%B2%A1%E5%A4%A7%E9%80%9A%E3%82%8A%E3%83%93%E3%83%AB%202%201F",
  },
];

const shopNames: Record<string, string> = {
  shop1: "もりおか炭火居酒屋原価市場",
  shop2: "魚処　壱や",
  shop3: "やみつきホルモン利久",
};

const mainLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
  { code: "zh-TW", flag: "🇹🇼", label: "繁體中文" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
];

const otherLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
  { code: "th", flag: "🇹🇭", label: "ไทย" },
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt" },
  { code: "tl", flag: "🇵🇭", label: "Tagalog" },
  { code: "id", flag: "🇮🇩", label: "Bahasa Indonesia" },
  { code: "ms", flag: "🇲🇾", label: "Bahasa Melayu" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "pt", flag: "🇵🇹", label: "Português" },
];

export default function CouponPage() {
  const { language: selectedLanguage, setLanguage: setSelectedLanguage } = useLanguage();
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);
  const [openModalShopIndex, setOpenModalShopIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const t = getCouponT(selectedLanguage);

  const openModal = (index: number) => {
    setCurrentSlideIndex(0);
    setOpenModalShopIndex(index);
  };

  const closeModal = () => {
    setCurrentSlideIndex(0);
    setOpenModalShopIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOtherLanguages &&
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOtherLanguages(false);
      }
    };
    if (showOtherLanguages) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOtherLanguages]);

  // 全店舗のスライドショー（3秒ごとに自動切り替え）
  useEffect(() => {
    if (openModalShopIndex !== null && (openModalShopIndex === 0 || openModalShopIndex === 1 || openModalShopIndex === 2)) {
      const modalImages = shopModalImages[openModalShopIndex] ?? [];
      if (modalImages.length > 1) {
        const interval = setInterval(() => {
          setCurrentSlideIndex((prev) => (prev + 1) % modalImages.length);
        }, 3000);
        return () => clearInterval(interval);
      }
    }
  }, [openModalShopIndex]);

  return (
    <div className="min-h-screen bg-[#F2EDCF]">
      {/* ヘッダー（タイトル＋言語翻訳機能・館内案内に戻るはバナー左上に配置） */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <h1 className="min-w-0 shrink text-base font-bold text-gray-900 sm:text-lg">
            {t.pageTitle}
          </h1>
          <div className="flex-1 min-w-0" aria-hidden />
          {/* 言語選択（ホームと同じ） */}
          <div ref={languageDropdownRef} className="flex shrink-0 items-center space-x-0.5 sm:space-x-1 relative flex-nowrap">
            <button
              onClick={() => setShowOtherLanguages(!showOtherLanguages)}
              className={`flex flex-col items-center rounded p-0.5 sm:p-1 transition-colors ${
                showOtherLanguages ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              title="Other Languages"
            >
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-base sm:text-lg leading-none">🌐</span>
              <span className="mt-0.5 text-[8px] sm:text-[10px] leading-tight text-gray-700">Another</span>
            </button>
            {showOtherLanguages && (
              <div className="absolute top-full right-0 z-50 mt-2 max-h-[60vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg sm:max-h-[300px] sm:w-auto sm:max-w-none">
                <div className="grid grid-cols-2 gap-2">
                  {otherLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Language button clicked:', lang.code);
                        setSelectedLanguage(lang.code);
                        setShowOtherLanguages(false);
                      }}
                      className={`flex flex-col items-center rounded p-1.5 sm:p-2 transition-colors ${
                        selectedLanguage === lang.code ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      title={lang.label}
                    >
                      <span className="mb-1 text-base sm:text-lg leading-none">{lang.flag}</span>
                      <span className="text-center text-[10px] sm:text-xs leading-tight text-gray-700">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {mainLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Language button clicked:', lang.code);
                  setSelectedLanguage(lang.code);
                  setShowOtherLanguages(false);
                }}
                className={`flex flex-col items-center rounded p-0.5 sm:p-1 transition-colors ${
                  selectedLanguage === lang.code ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                title={lang.label}
              >
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-base sm:text-lg leading-none">{lang.flag}</span>
                <span className="mt-0.5 text-[8px] sm:text-[10px] leading-tight text-gray-700">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* メインバナー（ご夕食クーポン!）・スマホでは館内案内に戻るを上に分離、PCでは左上にオーバーレイ */}
        <section className="mb-6 -mx-4 sm:-mx-6 relative">
          {/* スマホ版：館内案内に戻るをバナー上に表示（重なり防止） */}
          <Link
            href="/"
            className="sm:hidden mb-3 flex items-center gap-2 px-1 transition-opacity hover:opacity-90 hover:underline"
            style={{ color: "#304E84" }}
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M15 3h6v18h-6" />
              <path d="M10 17l5-5-5-5" />
              <path d="M13.8 12H3" />
            </svg>
            <span className="text-sm font-semibold leading-tight">{t.backToGuide}</span>
          </Link>
          <div className={`relative w-full overflow-hidden ${BANNER_ASPECT} max-h-[380px] bg-[#F2EDCF] sm:max-h-[420px]`}>
            <Image
              src={encodeURI(bannerImage)}
              alt="ご夕食クーポン!"
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
            />
            {/* PC版：バナー左上に鳥アイコン＋館内案内に戻るをオーバーレイ */}
            <Link
              href="/"
              className="hidden sm:flex absolute left-4 top-4 z-10 flex-col items-center gap-2 transition-opacity hover:opacity-90 hover:underline"
              style={{ color: "#304E84" }}
            >
              <svg
                className="h-8 w-8 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M15 3h6v18h-6" />
                <path d="M10 17l5-5-5-5" />
                <path d="M13.8 12H3" />
              </svg>
              <span className="text-center text-sm font-semibold leading-tight">{t.backToGuide}</span>
            </Link>
          </div>
        </section>

        {/* 利用案内（参考画像の説明文） */}
        <section className="mb-8">
          <p className="text-center text-[15px] font-medium leading-relaxed sm:text-base" style={{ color: "#c26c36" }}>
            {t.usageMessage}
          </p>
          <p className="mt-1 text-center text-xs text-gray-600">
            {t.usageNote}
          </p>
        </section>

        {/* 3店舗クーポンカード（MAPボタン下端揃え） */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {shopsBase.map((shop, i) => {
            const name = shopNames[shop.nameKey] ?? "";
            const couponContent =
              i === 0 ? (
                <>
                  {t.bringCoupon}
                  <br />
                  <span className="text-white">{t.shop1Offer}</span>
                </>
              ) : i === 1 ? (
                <>
                  {t.bringCoupon}
                  <br />
                  <span className="text-white">
                    {t.shop2Offer1}
                    {t.shop2Or && t.shop2Offer2 ? (
                      <>
                        <br />
                        {t.shop2Or}
                        <br />
                        {t.shop2Offer2}
                      </>
                    ) : null}
                  </span>
                </>
              ) : (
                <>
                  {t.bringCoupon}
                  <br />
                  <span className="text-white">{t.shop3Offer}</span>
                </>
              );
            return (
              <article
                key={i}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* 店舗名ヘッダー（紺色） */}
                <div
                  className="flex items-center justify-center px-4 py-3 text-center text-white font-semibold"
                  style={{ backgroundColor: HEADER_BG }}
                >
                  <span className="text-sm sm:text-base">{name}</span>
                </div>

                {/* 料理画像（coupon-site フォルダの写真） */}
                <div className={`relative w-full ${CARD_IMAGE_ASPECT} bg-gray-100`}>
                  <Image
                    src={encodeURI(shop.imageSrc)}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>

                {/* クーポン内容（ベージュ・スマホは文字大きく見やすく） */}
                <div
                  className="flex h-34 flex-col items-center justify-center px-4 py-3 text-center text-base font-bold leading-relaxed sm:h-36 sm:text-sm"
                  style={{ backgroundColor: COUPON_BG, color: COUPON_TEXT_COLOR }}
                >
                  {couponContent}
                </div>

                {/* 店舗情報（白背景・MAPを下端で横揃え・MAP下に余白） */}
                <div className="flex min-h-0 flex-1 flex-col bg-white px-4 pt-3 pb-3 text-sm text-gray-900">
                  <div className="min-h-0 flex-1">
                    {shop.branches.map((b, j) => (
                      <div key={j} className={j > 0 ? "mt-3 pt-3 border-t border-gray-200" : ""}>
                        {"name" in b && b.name != null && (
                          <p className="font-semibold text-gray-900">{b.name}</p>
                        )}
                        {"hours" in b && b.hours != null && (
                          <p className="mt-1 text-xs whitespace-pre-line">{b.hours}</p>
                        )}
                        {"holiday" in b && b.holiday != null && (
                          <p className="mt-0.5 text-xs">定休日：{b.holiday}</p>
                        )}
                        <p className="mt-1">{b.address}</p>
                        <p className="mt-0.5">{t.tel} {b.tel}</p>
                        {"validity" in b && b.validity != null && (
                          <p className="mt-1 text-xs">{b.validity}</p>
                        )}
                        {"distance" in b && b.distance != null && (
                          <p className="mt-0.5 text-xs">{b.distance}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* MAPボタン（モーダルを開く・外部へ飛ばない） */}
                  <button
                    type="button"
                    onClick={() => openModal(i)}
                    className="mt-4 flex w-full shrink-0 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: MAP_BTN_BG }}
                  >
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {t.map}
                  </button>
                </div>
              </article>
            );
          })}
        </section>


      </main>

      {/* 店舗詳細モーダル（MAP押下時・外部へ飛ばず画面内で表示） */}
      {openModalShopIndex !== null && (() => {
        const shop = shopsBase[openModalShopIndex];
        const modalName = shopNames[shopsBase[openModalShopIndex].nameKey] ?? "";
        const modalImages = shopModalImages[openModalShopIndex] ?? [];
        const description = shopModalDescriptions[openModalShopIndex];
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="flex max-h-[90vh] w-full max-w-xl min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ヘッダー（店舗名＋閉じる） */}
              <div
                className="flex shrink-0 items-center justify-between px-4 py-3 text-white"
                style={{ backgroundColor: HEADER_BG }}
              >
                <h2 id="modal-title" className="text-lg font-semibold">
                  {modalName}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded p-1 text-white/90 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label={t.close}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
                {/* モーダル用画像（横長画像も全体が見えるよう object-contain） */}
                {(openModalShopIndex === 0 || openModalShopIndex === 1 || openModalShopIndex === 2) && modalImages.length > 1 ? (
                  // 全店舗：スライドショー
                  <div className="relative w-full min-h-[200px] overflow-hidden bg-gray-100" style={{ aspectRatio: "16/9" }}>
                    {modalImages.map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          idx === currentSlideIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={encodeURI(src)}
                          alt={`${modalName} ${idx + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 800px"
                          unoptimized
                        />
                      </div>
                    ))}
                    {/* インジケーター */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {modalImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlideIndex(idx);
                          }}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentSlideIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                          }`}
                          aria-label={`スライド ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : modalImages.length <= 1 ? (
                  <div
                    className={`relative w-full min-h-[200px] overflow-hidden ${openModalShopIndex === 1 ? '' : 'bg-gray-100'}`}
                    style={{ aspectRatio: "16/9" }}
                  >
                    <Image
                      src={encodeURI(modalImages[0] ?? "")}
                      alt={modalName}
                      fill
                      className={openModalShopIndex === 1 ? "object-cover" : "object-contain"}
                      sizes="(max-width: 768px) 100vw, 800px"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                    {modalImages.map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className="relative w-full min-h-[180px] overflow-hidden"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <Image
                          src={encodeURI(src)}
                          alt={modalName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="min-w-0 px-4 py-4">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {description}
                  </p>
                  {openModalShopIndex === 0 && (
                    <a
                      href="https://www.hotpepper.jp/strJ001143787/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#304E84] underline underline-offset-2"
                    >
                      公式HP
                    </a>
                  )}
                  {openModalShopIndex === 2 && (
                    <a
                      href="https://www.hotpepper.jp/strJ001185245/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#304E84] underline underline-offset-2"
                    >
                      公式HP
                    </a>
                  )}
                  {openModalShopIndex === 1 && (
                    <a
                      href="https://www.hotpepper.jp/strJ001250661/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#304E84] underline underline-offset-2"
                    >
                      公式HP
                    </a>
                  )}
                  {/* 全店舗分を表示（利久は4店舗・晴れの日2店舗・ぼんてん1店舗） */}
                  {shop.branches.map((branch, branchIndex) => {
                    const branchAddress = branch.address || ("name" in branch && typeof branch.name === "string" ? branch.name : "") || modalName;
                    const branchMapUrl =
                      "placeUrl" in branch && typeof branch.placeUrl === "string"
                        ? branch.placeUrl
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branchAddress)}`;
                    
                    // 緯度経度がある場合はそれを使用、ない場合は住所で検索
                    const branchMapEmbedUrl = ("lat" in branch && "lng" in branch && branch.lat !== 0 && branch.lng !== 0)
                      ? `https://www.google.com/maps?q=${branch.lat},${branch.lng}&z=17&output=embed`
                      : `https://www.google.com/maps?q=${encodeURIComponent(branchAddress)}&z=17&output=embed`;
                    
                    const branchLabel = "name" in branch && branch.name != null ? branch.name : `${modalName} ${branchIndex + 1}`;
                    return (
                      <div
                        key={branchIndex}
                        className={`min-w-0 ${branchIndex > 0 ? "mt-6 border-t border-gray-200 pt-4" : "mt-4 border-t border-gray-200 pt-4"}`}
                      >
                        <div className="text-sm text-gray-900">
                          {"name" in branch && branch.name != null && (
                            <p className="font-semibold">{branch.name}</p>
                          )}
                          <p className="mt-1">{branch.address}</p>
                          <p className="mt-1">{t.tel} {branch.tel}</p>
                          {"hours" in branch && branch.hours != null && (
                            <p className="mt-2 text-xs text-gray-600 whitespace-pre-line">{branch.hours}</p>
                          )}
                          {"holiday" in branch && branch.holiday != null && (
                            <p className="mt-0.5 text-xs text-gray-600 whitespace-pre-line">{branch.holiday}</p>
                          )}
                        </div>
                        {/* 各店舗のミニマップ（見切れ防止のためmin-w-0と十分な高さを確保） */}
                        <div className="mt-3 w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                          <iframe
                            title={branchLabel}
                            src={branchMapEmbedUrl}
                            width="100%"
                            height="240"
                            style={{ border: 0, display: "block", minHeight: 240 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="block w-full"
                          />
                        </div>
                        {/* 各店舗の拡大地図を表示 */}
                        <a
                          href={branchMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: MAP_BTN_BG }}
                        >
                          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          {t.showLargerMap}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
