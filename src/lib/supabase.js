import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.error('Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

export const supabase = createClient(url, anonKey)

// Brand contact details, kept in one place so every component stays consistent.
export const CONTACT = {
  email: 'myabovuk@gmail.com',
  whatsapp: '447776914170', // digits only, for wa.me links
  whatsappDisplay: '+44 7776 914170',
}

export const whatsappLink = (text = 'Hi ABOV, I would like a quote.') =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
