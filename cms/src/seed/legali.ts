/**
 * Version: 1.01 (collega le pagine anche in Impostazioni › Privacy e cookies)
 * Pagine Privacy Policy e Cookie Policy (CMP 1.00), in italiano e inglese.
 *
 * Fonti: le pagine https://serralunga.com/pages/privacy-policy e /pages/cookie-policy-1 (testi
 * iubenda, aggiornati all'11 agosto 2025) per titolare e struttura; i servizi elencati sono quelli
 * che questo sito usa davvero (moduli, newsletter con doppia conferma, reCAPTCHA, registro dei
 * consensi, codici di Sicurezza e tracciamento). I servizi del vecchio negozio Shopify (Shop Pay,
 * PayPal, Klaviyo, chat) non ci sono. Nessun dato legale inventato: titolare e recapiti arrivano da
 * Impostazioni del sito > Dati aziendali (riquadro accanto al testo), i tempi di conservazione non
 * stabiliti dal cliente sono descritti senza numeri. Testo da far verificare al consulente privacy.
 *
 * Si creano solo se mancano (seed:aggiorna): dopo si modificano dal pannello o dalla pagina.
 * Nei paragrafi, «## » all'inizio = titolo h2 (web/src/pages/[slug].astro).
 */
import type { Payload } from 'payload'

type Pagina = {
  slug: string
  mostraContatti: boolean
  it: { titolo: string; kicker: string; intro: string; paragrafi: string[]; seo: { titolo: string; descrizione: string } }
  en: { titolo: string; kicker: string; intro: string; paragrafi: string[]; seo: { titolo: string; descrizione: string } }
}

export const PAGINE_LEGALI: Pagina[] = [
  {
    slug: 'privacy-policy',
    mostraContatti: true,
    it: {
      titolo: 'Privacy Policy',
      kicker: 'Informativa sul trattamento dei dati personali',
      intro:
        'Come 1825 S.R.L., titolare del marchio Serralunga, tratta i dati personali di chi visita questo sito e di chi ci contatta per progetti contract, cataloghi e listini, ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR).',
      seo: {
        titolo: 'Privacy Policy | Serralunga',
        descrizione: 'Informativa privacy di Serralunga (1825 S.R.L.): dati raccolti dal sito e dai moduli contract, finalità, basi giuridiche, conservazione e diritti degli interessati.',
      },
      paragrafi: [
        '## Titolare del trattamento',
        'Il titolare del trattamento è 1825 S.R.L., titolare del marchio Serralunga. Ragione sociale, sede, partita IVA e recapiti sono indicati in questa pagina. Per qualsiasi domanda sui vostri dati potete scrivere all’indirizzo email indicato.',
        '## Quali dati trattiamo',
        'Dati di navigazione: i sistemi che fanno funzionare il sito ricevono, per il solo fatto della visita, dati come l’indirizzo IP, il tipo di browser e le pagine richieste. Servono al funzionamento e alla sicurezza del sito.',
        'Dati che ci fornite: quando compilate un modulo (richiesta di informazioni, catalogo, listino riservato, progetti contract) trattiamo i dati inseriti, come nome del referente, struttura o studio, email, città del progetto e contenuto della richiesta. Per la newsletter trattiamo email e, se li indicate, nome e azienda.',
        'Cookie e strumenti simili: sono descritti nella Cookie Policy. Quelli diversi dai cookie tecnici si attivano solo con il vostro consenso.',
        '## Perché li trattiamo e su quale base giuridica',
        'Rispondere alle richieste e inviare cataloghi, listini, campioni e informazioni sui prodotti che ci chiedete: esecuzione di misure precontrattuali adottate su vostra richiesta (art. 6.1.b GDPR).',
        'Inviare la newsletter Serralunga con novità di prodotto, progetti contract e cataloghi: solo con il vostro consenso, confermato con il link dell’email di conferma (art. 6.1.a GDPR). Potete annullare l’iscrizione in ogni momento con il link presente in ogni email.',
        'Proteggere il sito e i moduli da accessi abusivi e invii automatici (spam), anche con Google reCAPTCHA: legittimo interesse del titolare alla sicurezza (art. 6.1.f GDPR).',
        'Dimostrare i consensi ricevuti (registro dei consensi ai cookie e prova dell’iscrizione alla newsletter): obbligo di poter dimostrare il consenso (art. 7.1 GDPR).',
        'Statistiche sulle visite e misurazione delle campagne pubblicitarie tramite cookie: solo con il vostro consenso (art. 6.1.a GDPR e art. 122 del Codice privacy), come descritto nella Cookie Policy.',
        'Adempiere a obblighi di legge, ad esempio contabili e fiscali se la richiesta porta a un rapporto commerciale (art. 6.1.c GDPR).',
        '## Conferimento dei dati',
        'Per rispondere a una richiesta l’email è necessaria: senza non possiamo ricontattarvi. Gli altri campi sono facoltativi ma ci aiutano a dare una risposta precisa. L’iscrizione alla newsletter e i cookie non tecnici sono sempre facoltativi e il rifiuto non limita l’uso del sito.',
        '## Chi riceve i dati',
        'I dati sono trattati dal personale di 1825 S.R.L. autorizzato e istruito e dai fornitori che ci forniscono servizi tecnici, nominati responsabili del trattamento: gestione e ospitalità del sito, posta elettronica, Google (reCAPTCHA) e, solo con il vostro consenso, i servizi di statistica e marketing elencati nella Cookie Policy. I dati non vengono venduti né diffusi.',
        '## Trasferimenti fuori dall’Unione europea',
        'Alcuni fornitori (ad esempio Google, Microsoft, Meta e LinkedIn) possono trattare dati anche negli Stati Uniti o in altri Paesi fuori dallo Spazio economico europeo. In questi casi il trasferimento avviene con le garanzie previste dal GDPR: decisione di adeguatezza della Commissione europea (EU-U.S. Data Privacy Framework) per i fornitori aderenti oppure clausole contrattuali standard.',
        '## Per quanto tempo li conserviamo',
        'Richieste dai moduli: per il tempo necessario a gestirle e all’eventuale rapporto commerciale che ne segue, poi per i periodi previsti dalla legge.',
        'Newsletter: fino all’annullamento dell’iscrizione. La prova del consenso (data, pagina e indirizzo IP dell’iscrizione) si conserva per poter dimostrare il consenso ricevuto.',
        'Scelte sui cookie: nel vostro browser per al massimo 6 mesi; nel registro dei consensi l’indirizzo IP non è conservato in chiaro ma solo come impronta crittografica.',
        'Dati di navigazione: per il tempo strettamente necessario al funzionamento e alla sicurezza del sito.',
        '## I vostri diritti',
        'Potete chiedere in ogni momento l’accesso ai vostri dati, la rettifica, la cancellazione, la limitazione del trattamento, la portabilità e opporvi al trattamento basato sul legittimo interesse (articoli 15–22 GDPR). Potete revocare un consenso in qualsiasi momento, senza effetti sul trattamento svolto prima della revoca: per i cookie con «Gestisci preferenze cookie» in fondo a ogni pagina, per la newsletter con il link presente in ogni email. Per esercitare i diritti scrivete all’indirizzo email indicato in questa pagina.',
        'Se ritenete che il trattamento violi il GDPR potete proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it) o all’autorità di controllo del Paese in cui vivete o lavorate.',
        '## Modifiche a questa informativa',
        'Possiamo aggiornare questa informativa per cambiamenti del sito o della normativa. La versione e la data dell’ultimo aggiornamento sono indicate qui sotto; quando l’informativa sui cookie cambia, il banner vi chiede di nuovo il consenso.',
      ],
    },
    en: {
      titolo: 'Privacy Policy',
      kicker: 'Information on the processing of personal data',
      intro:
        'How 1825 S.R.L., owner of the Serralunga brand, processes the personal data of visitors to this site and of those who contact us about contract projects, catalogues and price lists, pursuant to Articles 13 and 14 of Regulation (EU) 2016/679 (GDPR).',
      seo: {
        titolo: 'Privacy Policy | Serralunga',
        descrizione: 'Serralunga (1825 S.R.L.) privacy policy: data collected by the site and contract forms, purposes, legal bases, retention and the rights of data subjects.',
      },
      paragrafi: [
        '## Data controller',
        'The data controller is 1825 S.R.L., owner of the Serralunga brand. Company name, registered office, VAT number and contact details are shown on this page. For any question about your data you can write to the email address shown.',
        '## What data we process',
        'Browsing data: simply by visiting the site, the systems that run it receive data such as the IP address, the browser type and the pages requested. They are needed for the site to work securely.',
        'Data you provide: when you fill in a form (information request, catalogue, reserved price list, contract projects) we process the data entered, such as contact name, venue or studio, email, project city and the content of the request. For the newsletter we process your email and, if given, your name and company.',
        'Cookies and similar tools: they are described in the Cookie Policy. Those other than technical cookies are only enabled with your consent.',
        '## Why we process them and on what legal basis',
        'Replying to requests and sending the catalogues, price lists, samples and product information you ask for: pre-contractual measures taken at your request (Art. 6.1.b GDPR).',
        'Sending the Serralunga newsletter with product news, contract projects and catalogues: only with your consent, confirmed through the link in the confirmation email (Art. 6.1.a GDPR). You can unsubscribe at any time with the link in every email.',
        'Protecting the site and forms from misuse and automated submissions (spam), also with Google reCAPTCHA: the controller’s legitimate interest in security (Art. 6.1.f GDPR).',
        'Proving the consents received (cookie consent log and proof of newsletter subscription): the obligation to be able to demonstrate consent (Art. 7.1 GDPR).',
        'Visit statistics and advertising campaign measurement through cookies: only with your consent (Art. 6.1.a GDPR and Art. 122 of the Italian Privacy Code), as described in the Cookie Policy.',
        'Complying with legal obligations, for example accounting and tax obligations if a request leads to a business relationship (Art. 6.1.c GDPR).',
        '## Providing your data',
        'Your email is needed to reply to a request: without it we cannot contact you. The other fields are optional but help us give a precise answer. Subscribing to the newsletter and accepting non-technical cookies are always optional, and refusing does not limit the use of the site.',
        '## Who receives the data',
        'The data are processed by authorised and trained staff of 1825 S.R.L. and by the suppliers of technical services, appointed as data processors: site management and hosting, email, Google (reCAPTCHA) and, only with your consent, the statistics and marketing services listed in the Cookie Policy. The data are not sold or disclosed.',
        '## Transfers outside the European Union',
        'Some providers (for example Google, Microsoft, Meta and LinkedIn) may also process data in the United States or in other countries outside the European Economic Area. In these cases the transfer takes place with the safeguards provided by the GDPR: the European Commission adequacy decision (EU-U.S. Data Privacy Framework) for participating providers, or standard contractual clauses.',
        '## How long we keep them',
        'Form requests: for the time needed to handle them and for any business relationship that follows, then for the periods required by law.',
        'Newsletter: until you unsubscribe. The proof of consent (date, page and IP address of the subscription) is kept so that the consent received can be demonstrated.',
        'Cookie choices: in your browser for no more than 6 months; in the consent log the IP address is not stored in clear text, only as a cryptographic hash.',
        'Browsing data: for the time strictly needed for the site to work securely.',
        '## Your rights',
        'At any time you can request access to your data, rectification, erasure, restriction of processing and portability, and object to processing based on legitimate interest (Articles 15–22 GDPR). You can withdraw consent at any time, without affecting processing carried out before the withdrawal: for cookies with “Manage cookie preferences” at the bottom of every page, for the newsletter with the link in every email. To exercise your rights, write to the email address shown on this page.',
        'If you believe the processing infringes the GDPR you can lodge a complaint with the Italian Data Protection Authority (www.garanteprivacy.it) or with the supervisory authority of the country where you live or work.',
        '## Changes to this policy',
        'We may update this policy following changes to the site or to the law. The version and the date of the last update are shown below; when the cookie policy changes, the banner asks for your consent again.',
      ],
    },
  },
  {
    slug: 'cookie-policy',
    mostraContatti: false,
    it: {
      titolo: 'Cookie Policy',
      kicker: 'Cookie e strumenti di tracciamento',
      intro:
        'Quali cookie usa questo sito, a cosa servono, chi li gestisce e come potete dare, negare o revocare il consenso in ogni momento, secondo l’art. 122 del Codice privacy e le Linee guida del Garante sui cookie (provvedimento n. 231 del 10 giugno 2021).',
      seo: {
        titolo: 'Cookie Policy | Serralunga',
        descrizione: 'Cookie Policy di Serralunga: cookie tecnici, di preferenze, statistica e marketing, fornitori, durata e come gestire o revocare il consenso dal sito.',
      },
      paragrafi: [
        '## Cosa sono i cookie',
        'I cookie sono piccoli file di testo che un sito salva nel browser per ricordare informazioni. Strumenti simili, come il localStorage o i pixel, funzionano in modo analogo; in questa pagina li chiamiamo tutti cookie.',
        '## Le categorie',
        'Necessari: servono al funzionamento e alla sicurezza del sito e a ricordare le vostre scelte sui cookie. Sono sempre attivi e non richiedono consenso.',
        'Preferenze: ricordano impostazioni e attivano contenuti esterni come le mappe. Solo con consenso.',
        'Statistiche: misurano in forma aggregata come vengono usate le pagine, per migliorarle. Solo con consenso.',
        'Marketing: misurano l’efficacia delle nostre campagne su Google, Meta (Facebook, Instagram) e LinkedIn e permettono di mostrare comunicazioni pertinenti; attivano anche i video incorporati. Solo con consenso.',
        '## Come funziona il consenso',
        'Alla prima visita un banner vi permette di accettare tutti i cookie, rifiutarli o scegliere per categoria. Chiudere il banner con la «X» equivale a rifiutare: restano attivi solo i cookie necessari. Scorrere la pagina non vale come consenso e il sito si può usare anche senza accettare.',
        'La scelta vale 6 mesi, sia per l’accettazione sia per il rifiuto; il banner ricompare prima se cambiamo questa informativa. Potete cambiare idea quando volete con «Gestisci preferenze cookie» in fondo a ogni pagina: se togliete un consenso, i cookie di quella categoria vengono cancellati e gli strumenti relativi non partono più.',
        'Con Google Consent Mode v2 i servizi Google ricevono lo stato del vostro consenso; finché non accettate, non vengono letti né scritti cookie di statistica o pubblicità.',
        '## Gestire i cookie dal browser',
        'Potete anche bloccare o cancellare i cookie dalle impostazioni del browser (Chrome, Safari, Firefox, Edge), senza però una scelta per categoria. Bloccare i cookie necessari può impedire il funzionamento di alcune parti del sito.',
        '## Titolare e diritti',
        'Il titolare del trattamento è 1825 S.R.L. I recapiti, le finalità e i diritti che potete esercitare sono descritti nella Privacy Policy.',
      ],
    },
    en: {
      titolo: 'Cookie Policy',
      kicker: 'Cookies and tracking tools',
      intro:
        'Which cookies this site uses, what they are for, who manages them and how you can give, refuse or withdraw consent at any time, under Art. 122 of the Italian Privacy Code and the Italian Data Protection Authority’s cookie guidelines (decision no. 231 of 10 June 2021).',
      seo: {
        titolo: 'Cookie Policy | Serralunga',
        descrizione: 'Serralunga Cookie Policy: technical, preference, statistics and marketing cookies, providers, duration and how to manage or withdraw consent on the site.',
      },
      paragrafi: [
        '## What cookies are',
        'Cookies are small text files that a site stores in the browser to remember information. Similar tools, such as localStorage or pixels, work in a similar way; on this page we call them all cookies.',
        '## The categories',
        'Necessary: required for the site to work securely and to remember your cookie choices. They are always active and do not require consent.',
        'Preferences: remember settings and enable external content such as maps. Only with consent.',
        'Statistics: measure in aggregate form how the pages are used, so we can improve them. Only with consent.',
        'Marketing: measure the effectiveness of our campaigns on Google, Meta (Facebook, Instagram) and LinkedIn and allow relevant communications to be shown; they also enable embedded videos. Only with consent.',
        '## How consent works',
        'On your first visit a banner lets you accept all cookies, reject them or choose by category. Closing the banner with the “X” is the same as rejecting: only necessary cookies stay active. Scrolling the page does not count as consent and the site can be used without accepting.',
        'Your choice lasts 6 months, whether you accept or reject; the banner appears again earlier if we change this policy. You can change your mind at any time with “Manage cookie preferences” at the bottom of every page: if you withdraw a consent, the cookies of that category are deleted and the related tools no longer run.',
        'With Google Consent Mode v2, Google services receive the state of your consent; until you accept, no statistics or advertising cookies are read or written.',
        '## Managing cookies from the browser',
        'You can also block or delete cookies in your browser settings (Chrome, Safari, Firefox, Edge), but without a choice by category. Blocking necessary cookies may stop parts of the site from working.',
        '## Controller and rights',
        'The data controller is 1825 S.R.L. Contact details, purposes and the rights you can exercise are described in the Privacy Policy.',
      ],
    },
  },
]

/** Crea le pagine legali che mancano (italiano pubblicato + inglese) e collega i link legali del footer. */
export async function completaPagineLegali(
  payload: Payload,
  cambiaStruttura: Payload['updateGlobal'],
  log: (m: string) => void,
) {
  for (const p of PAGINE_LEGALI) {
    const c = await payload.find({ collection: 'pagine', where: { slug: { equals: p.slug } }, limit: 1, depth: 0, draft: true })
    if (c.docs.length) continue
    const doc = (await payload.create({
      collection: 'pagine',
      locale: 'it',
      data: {
        titolo: p.it.titolo,
        slug: p.slug,
        kicker: p.it.kicker,
        intro: p.it.intro,
        paragrafi: p.it.paragrafi.map((testo) => ({ testo })),
        mostraContatti: p.mostraContatti,
        seo: p.it.seo,
        _status: 'published',
      } as never,
    })) as unknown as { id: number; paragrafi?: { id: string }[] }
    await payload.update({
      collection: 'pagine',
      id: doc.id,
      locale: 'en',
      data: {
        titolo: p.en.titolo,
        kicker: p.en.kicker,
        intro: p.en.intro,
        paragrafi: (doc.paragrafi || []).map((r, i) => ({ id: r.id, testo: p.en.paragrafi[i] || '' })),
        seo: p.en.seo,
        _status: 'published',
      } as never,
    })
    log(`creata la pagina /${p.slug}/ (italiano e inglese)`)
  }

  // Link legali del footer: le voci «Privacy» e «Cookie» erano senza pagina (seed 1.00).
  type Voce = { id?: string; etichetta?: string; link?: string | null }
  const imp = (await payload.findGlobal({ slug: 'impostazioni', locale: 'it', depth: 0 })) as unknown as { legali?: Voce[] }
  const legali: Voce[] = JSON.parse(JSON.stringify(imp.legali || []))
  const META: [RegExp, string, string][] = [
    [/^privacy/i, '/privacy-policy/', 'Privacy Policy'],
    [/^cookie/i, '/cookie-policy/', 'Cookie Policy'],
  ]
  let cambiato = false
  for (const [re, link, etichetta] of META) {
    const v = legali.find((x) => re.test(x.etichetta || '') || x.link === link)
    if (!v) {
      legali.push({ etichetta, link })
      cambiato = true
    } else if (!v.link) {
      v.link = link
      v.etichetta = etichetta
      cambiato = true
    }
  }
  if (cambiato) {
    await cambiaStruttura({ slug: 'impostazioni', locale: 'it', data: { legali } as never })
    log('footer: link legali a Privacy Policy e Cookie Policy')
  }

  // Impostazioni › Privacy e cookies: le due pagine, una volta sola finché i campi sono vuoti.
  const pc = (await payload.findGlobal({ slug: 'privacy-cookies', depth: 0 })) as unknown as { privacyLink?: string | null; cookieLink?: string | null }
  if (!pc.privacyLink || !pc.cookieLink) {
    await cambiaStruttura({ slug: 'privacy-cookies', data: { privacyLink: pc.privacyLink || '/privacy-policy/', cookieLink: pc.cookieLink || '/cookie-policy/', quandoBanner: 'sempre' } as never })
    log('privacy e cookies: collegate le pagine Privacy Policy e Cookie Policy')
  }
}
