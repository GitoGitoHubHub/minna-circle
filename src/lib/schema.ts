/**
 * MinnaCircle 構造化データ（schema.org）ユーティリティ
 * - Organization / Place / Event のビルダ
 * - 必須プロパティに近い形で型ヒントを付与
 * - すべて JSON-LD オブジェクトを返します（@context 付き）
 */

type WithContext<T> = T & { "@context": "https://schema.org" };

export type OrganizationInput = {
  name: string;
  url: string;
  logo?: string; // 300x300 以上推奨（正方形ロゴ推奨）
  sameAs?: string[]; // SNS 等
};

export function buildOrganization(input: OrganizationInput): WithContext<{
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
    ...(input.logo ? { logo: input.logo } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
  };
}

export type PlaceInput = {
  name: string;
  streetAddress?: string;
  addressLocality?: string; // 区市町村
  addressRegion?: string;   // 都道府県
  postalCode?: string;
  addressCountry?: string;  // "JP" など
  latitude?: number;
  longitude?: number;
};

export function buildPlace(input: PlaceInput): WithContext<{
  "@type": "Place";
  name: string;
  address?: any;
  geo?: any;
}> {
  const address =
    input.streetAddress ||
    input.addressLocality ||
    input.addressRegion ||
    input.postalCode ||
    input.addressCountry
      ? {
          "@type": "PostalAddress",
          ...(input.streetAddress ? { streetAddress: input.streetAddress } : {}),
          ...(input.addressLocality ? { addressLocality: input.addressLocality } : {}),
          ...(input.addressRegion ? { addressRegion: input.addressRegion } : {}),
          ...(input.postalCode ? { postalCode: input.postalCode } : {}),
          ...(input.addressCountry ? { addressCountry: input.addressCountry } : {}),
        }
      : undefined;

  const geo =
    typeof input.latitude === "number" && typeof input.longitude === "number"
      ? {
          "@type": "GeoCoordinates",
          latitude: input.latitude,
          longitude: input.longitude,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: input.name,
    ...(address ? { address } : {}),
    ...(geo ? { geo } : {}),
  };
}

export type EventOffer = {
  price: number | string;  // 数値 or "無料"
  priceCurrency?: string;  // "JPY" など
  url?: string;            // 申込ページURL
  availability?: "InStock" | "SoldOut" | "PreOrder" | "LimitedAvailability";
};

export type EventInput = {
  name: string;
  description?: string;
  startDate: string; // ISO8601: "2025-08-17T19:00:00+09:00"
  endDate?: string;  // ISO8601（省略可だが推奨）
  eventStatus?: "EventScheduled" | "EventCancelled" | "EventPostponed" | "EventMovedOnline";
  eventAttendanceMode?: "OfflineEventAttendanceMode" | "OnlineEventAttendanceMode" | "MixedEventAttendanceMode";
  organizer?: OrganizationInput;
  location: PlaceInput; // オフライン前提。オンライン時は VirtualLocation を別途拡張
  offers?: EventOffer | EventOffer[];
  image?: string[];     // 代表画像
};

export function buildEvent(input: EventInput): WithContext<any> {
  const base: any = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    startDate: input.startDate,
    ...(input.endDate ? { endDate: input.endDate } : {}),
    ...(input.description ? { description: input.description } : {}),
    eventAttendanceMode: input.eventAttendanceMode ?? "OfflineEventAttendanceMode",
    eventStatus: input.eventStatus ?? "EventScheduled",
    location: buildPlace(input.location),
    ...(input.image?.length ? { image: input.image } : {}),
  };

  if (input.organizer) {
    base.organizer = buildOrganization(input.organizer);
  }

  if (input.offers) {
    const offersArr = Array.isArray(input.offers) ? input.offers : [input.offers];
    base.offers = offersArr.map((o) => ({
      "@type": "Offer",
      price: o.price,
      ...(o.priceCurrency ? { priceCurrency: o.priceCurrency } : {}),
      ...(o.url ? { url: o.url } : {}),
      ...(o.availability ? { availability: `https://schema.org/${o.availability}` } : {}),
    }));
  }

  return base;
}
