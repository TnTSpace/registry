import type { iSection } from "$lib/interface"

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

export function convertHtmlToSections(htmlString: string): iSection[] {
  const sections: iSection[] = [];
  const regex = /<(h[1-6])>(.*?)<\/\1>/gi;
  let match;
  let lastIndex = 0;
  
  while ((match = regex.exec(htmlString)) !== null) {
    let [fullMatch, , title] = match;
    title = title.replace(/<strong>(.*?)<\/strong>/gi, "$1"); // Remove <strong> tags in headings
    const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const contentStart = match.index + fullMatch.length;
    
    if (sections.length > 0) {
      sections[sections.length - 1].content = htmlString.substring(lastIndex, match.index)
        .replace(/<strong>(.*?)<\/strong>/gi, "$1") // Remove <strong> tags
        .replace(/\*\*|\*/g, "") // Remove markdown bold/italic symbols
        .trim();
    }
    
    sections.push({ id, title, content: "" });
    lastIndex = contentStart;
  }
  
  if (sections.length > 0) {
    sections[sections.length - 1].content = htmlString.substring(lastIndex)
      .replace(/<strong>(.*?)<\/strong>/gi, "$1") // Remove <strong> tags
      .replace(/\*\*|\*/g, "") // Remove markdown bold/italic symbols
      .trim();
  }
  
  return sections;
}

export function toDatetimeLocal(dateString: string): string {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}