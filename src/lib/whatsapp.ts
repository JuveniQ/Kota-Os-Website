function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeSouthAfricanWhatsAppNumber(value: string) {
  const digits = digitsOnly(value);
  if (digits.startsWith("27")) return digits;
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  return digits;
}

export function createWhatsAppUrl(phone: string, message: string) {
  const normalizedPhone = normalizeSouthAfricanWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
}
