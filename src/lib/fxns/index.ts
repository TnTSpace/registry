export const createWhatsAppUrl = (msg: string, phone: string) => {
  const url = new URL("https://api.whatsapp.com/send/")
  url.searchParams.set('phone', phone)
  url.searchParams.set('text', msg)
  return url.href
}

export function camelToNormalCase(input: string): string {
  if (!input) return '';

  // Insert space before capital letters, then capitalize the first letter
  const result = input
    .replace(/([a-z])([A-Z])/g, '$1 $2')       // split camelCase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')   // handle PascalCase acronyms like "HTMLParser"
    .replace(/^./, str => str.toUpperCase());   // capitalize first letter

  return result;
}

export function capitalize(word: string) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}