export const BUSINESS_ADDRESS = {
  line: "Mahmudiye Mahallesi Armağan Sk. No:19, İnegöl/Bursa",
  street: "Mahmudiye Mahallesi, Armağan Sokak No:19",
  district: "İnegöl",
  region: "Bursa",
  country: "TR",
} as const;

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(BUSINESS_ADDRESS.line);
