const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905XXXXXXXXX";

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildProductQuoteMessage(productName: string, quoteNote?: string | null): string {
  const base = `Merhaba, "${productName}" için fiyat teklifi almak istiyorum.`;
  return quoteNote ? `${base} (${quoteNote})` : base;
}

export function buildQuickQuoteMessage(machineLabel: string, partName: string): string {
  return `Merhaba, ${machineLabel} için "${partName}" parçasının fiyat teklifini almak istiyorum.`;
}

export function openWhatsApp(message: string) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
