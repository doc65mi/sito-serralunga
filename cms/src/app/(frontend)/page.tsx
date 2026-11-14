import { redirect } from 'next/navigation'

// Il sito pubblico è servito da Astro: qui si entra solo nel pannello.
export default function Index() {
  redirect('/admin')
}
