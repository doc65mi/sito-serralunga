/**
 * Version: 1.00
 * Testata del cruscotto: le azioni di tutti i giorni prima dell'elenco delle collezioni.
 */
import React from 'react'

const sito = (process.env.SITO_URL || '').replace(/\/$/, '')

const AZIONI = [
  { titolo: 'Modifica frontend', testo: 'Apri il sito e cambia testi, pulsanti e foto nella pagina.', href: `${sito}/`, primaria: true },
  { titolo: 'Nuovo articolo', testo: 'Scrivi un articolo del Journal o rivedi le bozze in arrivo.', href: '/admin/collections/articoli' },
  { titolo: 'Foto e video', testo: 'Carica i file: il sito li serve in AVIF nelle misure giuste.', href: '/admin/collections/media' },
  { titolo: 'Richieste ricevute', testo: 'Cataloghi, listini e contatti arrivati dai moduli.', href: '/admin/collections/richieste' },
  { titolo: 'Intelligenza artificiale', testo: 'Chiavi API, modelli e direttive di scrittura.', href: '/admin/globals/ai' },
  { titolo: 'Impostazioni del sito', testo: 'Menu, footer, dati aziendali e colore d’accento.', href: '/admin/globals/impostazioni' },
]

export default function Cruscotto() {
  return (
    <section className="sl-cruscotto" aria-label="Azioni principali">
      <p className="sl-cruscotto__kicker">Serralunga · Redazione</p>
      <h1 className="sl-cruscotto__titolo">Da dove vuoi cominciare</h1>
      <div className="sl-cruscotto__griglia">
        {AZIONI.map((a) => (
          <a key={a.titolo} className={`sl-azione${a.primaria ? ' sl-azione--primaria' : ''}`} href={a.href}>
            <span className="sl-azione__titolo">{a.titolo}</span>
            <span className="sl-azione__testo">{a.testo}</span>
            <span className="sl-azione__freccia" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
