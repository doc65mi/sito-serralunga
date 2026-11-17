import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { it } from '@payloadcms/translations/languages/it'
import { buildConfig } from 'payload'
import { conEtichette } from './fields/etichette'
import sharp from 'sharp'

import { Contract, percorsoContract } from './collections/Contract'
import { CaseHistory } from './collections/CaseHistory'
import { Designer } from './collections/Designer'
import { Media } from './collections/Media'
import { Prodotti } from './collections/Prodotti'
import { Categorie } from './collections/Categorie'
import { Spunti } from './collections/Spunti'
import { Materiali } from './collections/Materiali'
import { Colori } from './collections/Colori'
import { Pagine } from './collections/Pagine'
import { SpaziFoto } from './collections/SpaziFoto'
import { Articoli } from './collections/Articoli'
import { endpointAi } from './ai/endpoints'
import { endpointStrumenti } from './strumenti/endpoints'
import { endpointSincronizza } from './strumenti/sincronizza'
import { Ai } from './globals/Ai'
import { PaginaJournal } from './globals/PaginaJournal'
import { Richieste } from './collections/Richieste'
import { IscrittiNewsletter } from './collections/IscrittiNewsletter'
import { Moduli } from './globals/Moduli'
import { endpointModuli } from './moduli/endpoints'
import { Users } from './collections/Users'
import { Home } from './globals/Home'
import { Impostazioni } from './globals/Impostazioni'
import { PaginaDesigner } from './globals/PaginaDesigner'
import { PaginaInstallazioni } from './globals/PaginaInstallazioni'
import { PaginaSpunti } from './globals/PaginaSpunti'
import { PaginaHeritage } from './globals/PaginaHeritage'
import { PagineHeritage } from './collections/PagineHeritage'
import { PaginaCatalogo } from './globals/PaginaCatalogo'
import { PaginaMateriali } from './globals/PaginaMateriali'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Senza barra finale: "https://dominio/" e "https://dominio" devono valere uguale.
const sitoPubblico = (process.env.SITO_URL || 'http://localhost:4321').trim().replace(/\/+$/, '')
// Sito e pannello sullo stesso indirizzo (CMS_URL vuoto): i link verso il sito sono relativi,
// così valgono da qualunque nome si apra il pannello (localhost, 127.0.0.1, dominio).
const versoSito = process.env.CMS_URL ? sitoPubblico : ''

// In locale lo stesso sito si apre sia come localhost sia come 127.0.0.1: valgono entrambi.
const origini = [...new Set([sitoPubblico, process.env.CMS_URL || ''].filter(Boolean).flatMap((u) => [u, u.replace('//localhost', '//127.0.0.1'), u.replace('//127.0.0.1', '//localhost')]))]

// L'email parte solo se il server SMTP è configurato (vedi .env.example).
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM || 'sito@serralunga.com',
      defaultFromName: 'Sito Serralunga',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_PORT === '465',
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      },
    })
  : undefined

export default buildConfig({
  serverURL: process.env.CMS_URL || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Serralunga Redazione', icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }] },
    components: {
      beforeNavLinks: ['/componenti/ModificaFrontend'],
      afterNavLinks: ['/componenti/VoceStrumenti'],
      actions: ['/componenti/AzioneFrontend'],
      beforeDashboard: ['/componenti/Cruscotto', '/componenti/Sincronizza', '/componenti/Strumenti'],
      graphics: { Logo: '/componenti/Logo', Icon: '/componenti/Icona' },
    },
    importMap: { baseDir: path.resolve(dirname) },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        if (globalConfig?.slug === 'home') return `${versoSito}/`
        if (globalConfig?.slug === 'pagina-designer') return `${versoSito}/designer/`
        if (globalConfig?.slug === 'pagina-installazioni') return `${versoSito}/installazioni/`
        if (globalConfig?.slug === 'pagina-spunti') return `${versoSito}/spunti-e-idee/`
        if (globalConfig?.slug === 'pagina-journal') return `${versoSito}/journal/`
        if (globalConfig?.slug === 'pagina-heritage') return `${versoSito}/heritage/`
        if (collectionConfig?.slug === 'pagine-heritage') return `${versoSito}/heritage/${data?.slug}/`
        if (globalConfig?.slug === 'pagina-materiali') return `${versoSito}/materiali/`
        if (collectionConfig?.slug === 'materiali') return `${versoSito}/materiali/${data?.slug}/`
        if (collectionConfig?.slug === 'articoli') return `${versoSito}/journal/${data?.slug}/`
        if (collectionConfig?.slug === 'spunti') return `${versoSito}/spunti-e-idee/${data?.slug}/`
        if (collectionConfig?.slug === 'prodotti') return `${versoSito}/prodotti/${data?.slug}/`
        if (collectionConfig?.slug === 'designer') return `${versoSito}/designer/${data?.slug}/`
        if (collectionConfig?.slug === 'pagine') return `${versoSito}/${data?.slug}/`
        if (collectionConfig?.slug === 'case-history') return `${versoSito}/case-history/${data?.slug}/`
        if (collectionConfig?.slug === 'contract') return `${versoSito}${percorsoContract(data?.sezione)}`
        return `${versoSito}/`
      },
      collections: ['prodotti', 'designer', 'case-history', 'spunti', 'articoli', 'materiali', 'pagine', 'contract', 'pagine-heritage'],
      globals: ['home', 'pagina-designer', 'pagina-installazioni', 'pagina-spunti', 'pagina-journal', 'pagina-materiali', 'pagina-heritage'],
      breakpoints: [
        { label: 'Telefono', name: 'telefono', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 1000, height: 1200 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  i18n: { supportedLanguages: { it, en }, fallbackLanguage: 'it' },
  // Contenuti in italiano e inglese: un campo inglese vuoto mostra il testo italiano.
  localization: {
    locales: [
      { code: 'it', label: 'Italiano' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'it',
    fallback: true,
  },
  // Righe degli elenchi chiuse con il proprio nome (fields/etichette.ts) invece di "Voce 01".
  collections: [Prodotti, Categorie, CaseHistory, Spunti, Materiali, Colori, Articoli, Pagine, Contract, PagineHeritage, Designer, Media, SpaziFoto, Richieste, IscrittiNewsletter, Users].map(conEtichette),
  globals: [Home, PaginaCatalogo, PaginaDesigner, PaginaInstallazioni, PaginaSpunti, PaginaMateriali, PaginaJournal, PaginaHeritage, Impostazioni, Moduli, Ai].map(conEtichette),
  endpoints: [...endpointAi, ...endpointStrumenti, ...endpointSincronizza, ...endpointModuli],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // In sviluppo lo schema si allinea da solo; in produzione si usano le migrazioni.
    push: process.env.NODE_ENV !== 'production',
    prodMigrations: migrations,
  }),
  email,
  sharp,
  cors: origini,
  // Il cookie di accesso vale solo per richieste che partono dal sito stesso.
  csrf: origini,
  upload: { limits: { fileSize: 200_000_000 } },
})
