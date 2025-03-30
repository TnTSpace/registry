export const createWhatsAppUrl = (msg: string, phone: string) => {
  const url = new URL("https://api.whatsapp.com/send/")
  url.searchParams.set('phone', phone)
  url.searchParams.set('text', msg)
  return url.href
}