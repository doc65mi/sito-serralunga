/**
 * Version: 1.01
 * Controllo SEO del sito: legge la sitemap, apre ogni pagina (HTML del server) e segnala i problemi di
 * title, description, H1 e gerarchia dei titoli, canonical, hreflang, Open Graph, dati strutturati, alt e link.
 * Uso: node tools/controllo-seo.mjs http://127.0.0.1:8091
 * Scrive l'elenco completo in controllo-seo-pagine.txt e controllo-seo-problemi.txt nella cartella corrente.
 */
import fs from 'node:fs'
const B = (process.argv[2] || process.env.B || 'http://127.0.0.1:8080').replace(/\/$/, '');
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
// Un attributo senza valore (alt) vale come stringa vuota.
const attr = (tag, n) => { const m = new RegExp(`\\b${n}=("([^"]*)"|'([^']*)')`, 'i').exec(tag); if (m) return m[2] ?? m[3]; return new RegExp(`\\s${n}(\\s|/?>)`, 'i').test(tag) ? '' : null; };
(async () => {
  // Sito in prova (BLOCCA_INDICIZZAZIONE=1): robots.txt chiude tutto e le pagine dichiarano noindex, ed è voluto.
  const inProva = /Disallow: \/\s*$/m.test(await (await fetch(B + '/robots.txt')).text());
  if (inProva) console.log('ATTENZIONE: il sito è chiuso ai motori di ricerca (BLOCCA_INDICIZZAZIONE=1). Al lancio va messo a 0.');
  const sm = await (await fetch(B + '/sitemap.xml')).text();
  let urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const origine = urls[0] ? new URL(urls[0]).origin : '';
  console.log('sitemap:', urls.length, 'indirizzi, origine', origine);
  const percorsi = [...new Set(urls.map((u) => new URL(u).pathname))];
  const titoli = new Map(), descr = new Map(); const problemi = []; const righe = [];
  const P = (p, t) => problemi.push(`${p}  ${t}`);
  for (const p of percorsi) {
    const r = await fetch(B + p, { redirect: 'manual' });
    if (r.status !== 200) { P(p, `stato ${r.status}`); continue; }
    const h = await r.text();
    const head = (/<head[^>]*>([\s\S]*?)<\/head>/i.exec(h) || [])[1] || '';
    const body = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
    const title = strip((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(head) || [])[1] || '');
    const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
    const meta = (k, v) => { const t = metas.find((x) => (attr(x, k) || '').toLowerCase() === v); return t ? attr(t, 'content') : null; };
    const links = [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
    const d = meta('name', 'description');
    const canon = (links.find((x) => attr(x, 'rel') === 'canonical') || '');
    const canonHref = canon ? attr(canon, 'href') : null;
    const alt = links.filter((x) => attr(x, 'rel') === 'alternate' && attr(x, 'hreflang')).map((x) => `${attr(x, 'hreflang')}`);
    const lang = attr((/<html\b[^>]*>/i.exec(h) || [''])[0], 'lang');
    const hs = [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => [Number(m[1]), strip(m[2])]);
    const h1 = hs.filter((x) => x[0] === 1);
    if (!title) P(p, 'title mancante'); else { if (title.length > 65) P(p, `title lungo ${title.length}: ${title}`); if (title.length < 20) P(p, `title corto ${title.length}: ${title}`); (titoli.get(title) || titoli.set(title, []).get(title)).push(p); }
    if (!d) P(p, 'description mancante'); else { if (d.length > 165) P(p, `description lunga ${d.length}`); if (d.length < 70) P(p, `description corta ${d.length}: ${d}`); (descr.get(d) || descr.set(d, []).get(d)).push(p); }
    if (h1.length !== 1) P(p, `H1: ${h1.length} (${h1.map((x) => x[1]).join(' | ').slice(0, 120)})`);
    else if (!h1[0][1]) P(p, 'H1 vuoto');
    let prec = 0; for (const [l, t] of hs) { if (prec && l > prec + 1) { P(p, `salto di titolo h${prec} -> h${l}: "${t.slice(0, 50)}"`); break; } prec = l; }
    if (hs[0] && hs[0][0] !== 1) P(p, `il primo titolo è h${hs[0][0]}: "${hs[0][1].slice(0, 50)}"`);
    if (hs.some((x) => !x[1])) P(p, 'titolo vuoto');
    if (!canonHref) P(p, 'canonical mancante'); else if (new URL(canonHref).pathname !== p) P(p, `canonical diverso: ${canonHref}`);
    const en = p.startsWith('/en/') || p === '/en';
    if (lang !== (en ? 'en' : 'it')) P(p, `lang=${lang}`);
    for (const k of ['it', 'en', 'x-default']) if (!alt.includes(k)) P(p, `hreflang ${k} mancante`);
    for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:locale', 'og:site_name']) if (!meta('property', k)) P(p, `${k} mancante`);
    if (!meta('name', 'twitter:card')) P(p, 'twitter:card mancante');
    if (!meta('name', 'viewport')) P(p, 'viewport mancante');
    const robots = meta('name', 'robots'); if (!inProva && robots && /noindex/.test(robots)) P(p, `robots ${robots} ma è in sitemap`);
    const ld = [...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
    const tipi = [];
    for (const j of ld) { try { const o = JSON.parse(j); const g = o['@graph'] || [o].flat(); g.forEach((x) => tipi.push([x['@type']].flat().join('+'))); } catch (e) { P(p, 'JSON-LD non valido'); } }
    if (!ld.length) P(p, 'JSON-LD mancante');
    if (!tipi.some((t) => /BreadcrumbList/.test(t)) && p !== '/' && p !== '/en/') P(p, 'BreadcrumbList mancante');
    const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    const senzaAlt = imgs.filter((x) => attr(x, 'alt') === null).length;
    // Le miniature dentro un pulsante con etichetta sono decorative: l'alt vuoto lì è corretto.
    const fuoriPulsanti = body.replace(/<(button|a)\b[^>]*aria-label=[^>]*>[\s\S]*?<\/\1>/gi, '');
    const imgsDaDescrivere = [...fuoriPulsanti.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    const altVuoto = imgsDaDescrivere.filter((x) => attr(x, 'alt') === '' && attr(x, 'aria-hidden') !== 'true' && attr(x, 'role') !== 'presentation').length;
    const senzaMisure = imgs.filter((x) => !attr(x, 'width') || !attr(x, 'height')).length;
    const nonLazy = imgs.filter((x) => attr(x, 'loading') !== 'lazy').length;
    if (senzaAlt) P(p, `${senzaAlt} immagini senza attributo alt`);
    if (altVuoto) P(p, `${altVuoto} immagini con alt vuoto`);
    if (senzaMisure) P(p, `${senzaMisure}/${imgs.length} immagini senza width/height`);
    const aVuoti = [...body.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].filter((m) => !strip(m[1]) && !attr(m[0], 'aria-label') && !/alt="[^"]+"/.test(m[1])).length;
    if (aVuoti) P(p, `${aVuoti} link senza testo`);
    righe.push(`${p} | T(${title.length}) ${title} | D(${d ? d.length : 0}) | h1="${h1[0] ? h1[0][1].slice(0, 40) : ''}" | h=${hs.map((x) => x[0]).join('')} | img ${imgs.length} (non lazy ${nonLazy}) | ld ${tipi.join(',')} | ${Math.round(h.length / 1024)}KB`);
  }
  const stessaLingua = (ps) => { const it = ps.filter((x) => !x.startsWith('/en/')); const en = ps.filter((x) => x.startsWith('/en/')); return it.length > 1 ? it : en.length > 1 ? en : null; };
  for (const [t, tutti] of titoli) { const ps = stessaLingua(tutti); if (ps) problemi.push(`TITLE DOPPIO (${ps.length}) "${t}": ${ps.slice(0, 6).join(' ')}`); }
  for (const [t, tutti] of descr) { const ps = stessaLingua(tutti); if (ps) problemi.push(`DESCRIPTION DOPPIA (${ps.length}) "${t.slice(0, 60)}…": ${ps.slice(0, 6).join(' ')}`); }
  fs.writeFileSync('controllo-seo-pagine.txt', righe.join('\n'));
  fs.writeFileSync('controllo-seo-problemi.txt', problemi.join('\n'));
  console.log('pagine', percorsi.length, 'problemi', problemi.length);
  const conta = {}; for (const x of problemi) { const k = x.replace(/^\S+\s+/, '').replace(/\d+/g, 'N').replace(/(: |[("]).*$/, '').trim(); conta[k] = (conta[k] || 0) + 1; }
  for (const [k, n] of Object.entries(conta).sort((a, b) => b[1] - a[1])) console.log(String(n).padStart(4), k);
})();
