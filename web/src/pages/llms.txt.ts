import type { APIRoute } from 'astro'
import { elenco, globale, impostazioni, SITO, type Doc } from '../lib/cms'
import { piatto } from '../lib/testo'

/**
 * Version: 1.00
 * /llms.txt: riassunto del sito per gli assistenti (GEO/AEO). Chi è l'azienda, quali pagine
 * contano e dove trovarle, scritto con i contenuti pubblicati nel CMS: niente di inventato.
 */
export const GET: APIRoute = async () => {
  const [imp, home, prodotti, designer, casi, spunti, articoli, materiali] = await Promise.all([
    impostazioni('it'),
    globale('home', 0, 'it').catch(() => ({}) as Doc),
    elenco('prodotti', { depth: 0, 'where[schedaPubblicata][equals]': 'true' }).catch(() => []),
    elenco('designer', { depth: 0, 'where[schedaPubblicata][equals]': 'true' }).catch(() => []),
    elenco('case-history', { depth: 0 }).catch(() => []),
    elenco('spunti', { depth: 0 }).catch(() => []),
    elenco('articoli', { depth: 0, sort: '-data', limit: 50 }).catch(() => []),
    elenco('materiali', { depth: 0 }).catch(() => []),
  ])
  const a = imp.azienda || {}
  const riga = (titolo: string, url: string, nota?: string) => `- [${piatto(titolo)}](${SITO}${url})${nota ? `: ${piatto(nota).slice(0, 180)}` : ''}`
  const sezione = (titolo: string, righe: string[]) => (righe.length ? `## ${titolo}\n\n${righe.join('\n')}` : '')
  const corpo = [
    `# ${imp.nomeSito || 'Serralunga'}`,
    `> ${piatto(home.seo?.descrizione || home.hero?.testo || 'Arredi, vasi e illuminazione di design per esterni e interni, per progetti contract e hospitality.')}`,
    [
      a.ragioneSociale && `Ragione sociale: ${a.ragioneSociale}`,
      a.fondazione && `Anno di fondazione: ${a.fondazione}`,
      a.citta && `Sede: ${[a.indirizzo, a.cap, a.citta, a.provincia].filter(Boolean).join(', ')}, Italia`,
      a.email && `Contatto: ${a.email}`,
      'Lingue del sito: italiano (/) e inglese (/en/).',
    ].filter(Boolean).join('\n'),
    sezione('Pagine principali', [
      riga('Home', '/'),
      riga('Installazioni e case history', '/installazioni/'),
      riga('I designer', '/designer/'),
      riga('Spunti e idee', '/spunti-e-idee/'),
      riga('Journal', '/journal/'),
      riga('Materiali e colori', '/materiali/'),
    ]),
    sezione('Materiali', materiali.map((m) => riga(m.titolo, `/materiali/${m.slug}/`, m.seo?.descrizione || m.sottotitolo))),
    sezione('Prodotti', prodotti.map((p) => riga(p.nome, `/prodotti/${p.slug}/`, p.seo?.descrizione))),
    sezione('Designer', designer.map((d) => riga(d.nome, `/designer/${d.slug}/`, d.ruolo))),
    sezione('Case history', casi.map((c) => riga(c.nome, `/case-history/${c.slug}/`, c.seo?.descrizione))),
    sezione('Spunti e idee', spunti.map((s) => riga(s.titolo, `/spunti-e-idee/${s.slug}/`, s.estratto))),
    sezione('Journal', articoli.map((x) => riga(x.titolo, `/journal/${x.slug}/`, x.estratto))),
  ].filter(Boolean).join('\n\n')
  return new Response(`${corpo}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=900' } })
}
