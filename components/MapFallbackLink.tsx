"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Android の WebView では Google マップの https が ERR_BLOCKED_BY_RESPONSE で
 * ブロックされるため、Android のときは geo: URI でマップアプリを開く。
 */
const HOTEL_GEO_LAT = 39.7032885;
const HOTEL_GEO_LNG = 141.1451645;
const HOTEL_ADDRESS = "岩手県盛岡市中央通2丁目11-35 ホテルエース盛岡";

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

type MapFallbackLinkProps = {
  address: string;
  lat?: number;
  lng?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

/** 住所・任意で緯度経度を渡して地図リンクを表示。Android では geo: でアプリを開く。 */
export function MapFallbackLinkGeneric({
  address,
  lat,
  lng,
  className = "mt-2 inline-block text-sm font-medium text-[#304E84] underline underline-offset-2",
  style,
  children,
}: MapFallbackLinkProps) {
  const defaultHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const [href, setHref] = useState<string>(defaultHref);

  useEffect(() => {
    if (isAndroid()) {
      if (lat != null && lng != null) {
        setHref(`geo:${lat},${lng}?q=${encodeURIComponent(address)}`);
      } else {
        setHref(`geo:0,0?q=${encodeURIComponent(address)}`);
      }
    }
  }, [address, lat, lng]);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  );
}

/** メインページ用：ホテルエース盛岡の地図を開くリンク */
export function MapFallbackLink() {
  return (
    <MapFallbackLinkGeneric address={HOTEL_ADDRESS} lat={HOTEL_GEO_LAT} lng={HOTEL_GEO_LNG}>
      地図を開く（Androidで表示されない場合）
    </MapFallbackLinkGeneric>
  );
}
