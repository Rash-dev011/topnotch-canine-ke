// Builds the Top Notch Canine static pages into the site folder.
// Usage (from the repo root): node build/build.mjs .
// Switches for the form, analytics, proof and domain live in build/site.config.mjs.
import fs from 'node:fs';
import path from 'node:path';
import CFG from './site.config.mjs';

const SITE = process.argv[2] || '.';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// WhatsApp opens with a starter message, so the visitor only fills in the blanks
const WA = 'https://wa.me/254721448555?text=' + encodeURIComponent('Hello Top Notch Canine, I would like a quote for a K9 team.\nSite: \nDates: \nWhat we need: ');
const GA = CFG.ga4Id ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(CFG.ga4Id)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(CFG.ga4Id)}');</script>
` : '';
const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const ORIGIN = 'https://topnotchk9capability.co.ke';
const TEL = '+254721448555';
const TEL_TXT = '+254 721 448 555';
const EMAIL = 'clientservice@topnotchk9capability.co.ke';
const LINKEDIN = 'https://www.linkedin.com/in/bonifance-mokua-00540459';

const icon = {
  arrow: '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  phone: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.6 2.5 4 3.3c-.9.3-1.4 1.2-1.2 2.1 1.4 5.6 5.2 9.4 10.8 10.8.9.2 1.8-.3 2.1-1.2l.8-2.6-3.6-1.6-1.6 1.7c-2-1-3.6-2.6-4.6-4.6l1.7-1.6Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  menu: '<svg class="i-open" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" stroke-width="1.6"/></svg><svg class="i-close" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 4l10 10M14 4 4 14" stroke="currentColor" stroke-width="1.6"/></svg>',
  plus: '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="1.8"/></svg>',
  mail: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 4.5h15v11h-15z M2.5 5l7.5 6 7.5-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  chat: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 0 0-6.5 11.2L2.5 17.5l3.9-1A7.5 7.5 0 1 0 10 2.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
};
const btn = (href, text, cls = 'btn--red') => `<a class="btn ${cls}" href="${href}">${text}${icon.arrow}</a>`;
const more = (href, text) => `<a class="more" href="${href}">${text}${icon.arrow}</a>`;

const NAV = [
  ['services.html', 'Services'],
  ['breeds.html', 'Breeds'],
  ['about.html', 'About'],
  ['contact.html#careers', 'Careers'],
  ['contact.html', 'Contact'],
];

const LD = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Top Notch Canine Capability",
  "description": "K9 security provider in Kenya: detection dog training, supply of trained dogs and dog handler training.",
  "url": "${ORIGIN}",
  "logo": "${ORIGIN}/images/logo.svg",
  "image": "${ORIGIN}/images/og-image.jpg",
  "telephone": "${TEL}",
  "email": "${EMAIL}",
  "address": { "@type": "PostalAddress", "streetAddress": "Balozi Road, Bishop Court", "addressLocality": "Kitengela", "addressCountry": "KE" },
  "openingHours": "Mo-Su 06:00-20:00",
  "sameAs": ["https://wa.me/254721448555"],
  "foundingDate": "2016",
  "founder": { "@type": "Person", "name": "Bonifance Mokua", "jobTitle": "Director and head of training", "sameAs": ["${LINKEDIN}"] },
  "areaServed": ["Kenya", "Uganda", "Tanzania"]
}
</script>`;

function page({ file, title, description, current, body, ld = false, noindex = false, preload }) {
  const url = file === 'index.html' ? `${ORIGIN}/` : `${ORIGIN}/${file}`;
  const nav = NAV.map(([href, label]) => {
    const isCur = current && href === current;
    return `<li><a href="${href}"${isCur ? ' aria-current="page"' : ''}>${label}</a></li>`;
  }).join('');
  { let seen = false; body = body.replace(/<div class="split__photo" data-reveal>/g, (m) => { if (seen) return '<div class="split__photo">'; seen = true; return m; }); }
  return `<!doctype html>
<html lang="en-KE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="A Top Notch Canine detection dog searching an aircraft cabin, beside the company logo">
<meta property="og:site_name" content="Top Notch Canine Capability">
<meta property="og:locale" content="en_KE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ORIGIN}/images/og-image.jpg">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32.png">
<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
<meta name="theme-color" content="#ffffff">
<link rel="preload" href="assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload ? `<link rel="preload" href="${preload}" as="image">\n` : ''}<link rel="stylesheet" href="css/tnc.css">
<script>document.documentElement.classList.add('js')</script>
${GA}${ld ? LD + '\n' : ''}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="header">
  <div class="wrap header__inner">
    <a class="brand" href="index.html" aria-label="Top Notch Canine Capability, home">
      <img src="images/logo.svg" alt="" width="58" height="55">
      <span class="brand__name"><strong>Top Notch</strong><span>Canine Capability</span></span>
    </a>
    <div class="header__right">
      <a class="header__call" href="tel:${TEL}">${icon.phone}<span>Call ${TEL_TXT}</span></a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav">${icon.menu}<span class="nav__toggle-label">Menu</span></button>
      <nav class="nav" id="site-nav" aria-label="Main">
        <ul class="nav__list">${nav}</ul>
        <a class="btn btn--red btn--sm" href="contact.html#request">Request a K9 team${icon.arrow}</a>
      </nav>
    </div>
  </div>
</header>
<main id="main">
${body.trim()}
</main>
<footer class="footer">
  <div class="wrap footer__inner">
    <div class="footer__cols">
      <div>
        <h2>Services</h2>
        <ul>
          <li><a href="services.html#services">Detection dog training</a></li>
          <li><a href="services.html#services">Supply of trained dogs</a></li>
          <li><a href="services.html#services">Dog handler training</a></li>
          <li><a href="services.html#process">How a deployment runs</a></li>
          <li><a href="services.html#home">Walking and sitting</a></li>
        </ul>
      </div>
      <div>
        <h2>Company</h2>
        <ul>
          <li><a href="about.html">About us</a></li>
          <li><a href="breeds.html">Working breeds</a></li>
          <li><a href="contact.html#careers">Careers</a></li>
          <li><a href="services.html#faq">Questions</a></li>
        </ul>
      </div>
      <div>
        <h2>Contact</h2>
        <ul>
          <li><a href="contact.html#request">Request a K9 team</a></li>
          <li><a href="mailto:${EMAIL}">Email us</a></li>
          <li><a href="${WA}" rel="noopener">WhatsApp</a></li>
          <li><a href="https://maps.google.com/?q=Balozi+Road+Bishop+Court+Kitengela" rel="noopener">Balozi Road, Kitengela</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__brand">
      <img src="images/logo-light.svg" alt="Top Notch Canine Capability" width="84" height="80" loading="lazy">
      <a class="tel" href="tel:${TEL}">${TEL_TXT}</a>
      <p>Open every day, 06:00 to 20:00<br>Kenya, Uganda and Tanzania</p>
    </div>
    <div class="footer__legal">
      <span>&copy; <span data-year>2026</span> Top Notch Canine Capability <span class="footer__credit">&middot; Some photographs: G-R Mottez and Pedro Sanz on <a href="https://unsplash.com" rel="noopener">Unsplash</a></span></span>
      <nav aria-label="Legal"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></nav>
    </div>
  </div>
</footer>
<nav class="actionbar" aria-label="Quick actions" data-shown="false">
  <a href="tel:${TEL}">${icon.phone}Call</a>
  <a href="contact.html#request">Request a K9 team</a>
</nav>
<script src="js/tnc.js" defer></script>
</body>
</html>
`;
}

const hero = ({ h1, text, img, srcset, alt, pos, actions, page: isPage = true, full = false, stock = false, creds = '' }) => `
<section class="hero${isPage ? ' hero--page' : ''}${full ? ' hero--full' : ''}${stock ? ' hero--stock' : ''}" aria-labelledby="hero-h">
  <div class="hero__media" style="--pos: ${pos || '50% 35%'}"><img src="${img}"${srcset ? ` srcset="${srcset}" sizes="100vw"` : ''} alt="${alt}" fetchpriority="high"></div>
  <div class="wrap hero__inner">
    <div class="hero__panel">
      <h1 id="hero-h">${h1}</h1>
      <p class="hero__text">${text}</p>
      <div class="actions">${actions}</div>
    </div>
  </div>
  ${creds}
</section>`;

const closing = (h = 'Put a trained dog team on your site', photo = 'shepherd-leap', pos = '50% 45%') => `
<section class="band band--photo" aria-labelledby="close-h">
  <div class="band__bg" style="--pos: ${pos}"><img src="images/stock/${photo}-1200.jpg" srcset="images/stock/${photo}-1200.jpg 1200w, images/stock/${photo}-2400.jpg 2400w" sizes="100vw" alt="" loading="lazy"></div>
  <div class="section"><div class="wrap band__inner">
    <div>
      <h2 id="close-h">${h}</h2>
      <p class="lede" style="margin-top:20px">Tell us the site, what you need found or guarded, and for how long. Open every day, 06:00 to 20:00.</p>
      <div class="actions">${btn('contact.html#request', 'Request a K9 team')}<a class="link" href="${WA}" rel="noopener">Message us on WhatsApp</a></div>
    </div>
    <div class="band__contact">
      <span class="muted" style="color:var(--on-dark-muted)">For an urgent deployment, call</span>
      <a class="tel" href="tel:${TEL}">${TEL_TXT}</a>
    </div>
  </div></div>
</section>`;

const drive = (n, label) => `<span class="drive"><i aria-hidden="true">${[1, 2, 3, 4].map((i) => `<b${i <= n ? ' class="on"' : ''}></b>`).join('')}</i>${label}</span>`;

// Request form: posts to Web3Forms when a key is set, otherwise opens the visitor's email app
const FORM_OPEN = CFG.web3formsKey
  ? `<form class="form" action="https://api.web3forms.com/submit" method="post" data-endpoint="https://api.web3forms.com/submit" data-thanks="thanks.html" novalidate>
        <input type="hidden" name="access_key" value="${esc(CFG.web3formsKey)}">
        <input type="hidden" name="subject" value="K9 team request from the website">
        <input type="hidden" name="from_name" value="Top Notch Canine website">
        <input type="hidden" name="redirect" value="${ORIGIN}/thanks.html">
        <input type="checkbox" name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">`
  : `<form class="form" action="mailto:${EMAIL}" method="post" enctype="text/plain" data-endpoint="" novalidate>`;

// Proof: confirmed case studies and the Google reviews link, from site.config.mjs
const PROOF = (CFG.caseStudies.length || CFG.googleReviewsUrl) ? `
<section class="section" aria-labelledby="proof-h">
  <div class="wrap">
    <div class="head head--stack"><h2 id="proof-h">Recent K9 deployments</h2></div>
    ${CFG.caseStudies.length ? `<ul class="rows">${CFG.caseStudies.map((c) => `
      <li><span class="rows__name">${esc(c.client)}<small class="rows__sub">${esc(c.sector)}</small></span><p>${esc(c.work)}</p><span class="rows__meta">${esc(c.result)}</span></li>`).join('')}
    </ul>` : ''}
    ${CFG.googleReviewsUrl ? `<p style="margin-top:28px">${more(esc(CFG.googleReviewsUrl), 'Read our Google reviews')}</p>` : ''}
  </div>
</section>` : '';

// ---------- Home ----------
const home = page({
  file: 'index.html',
  title: 'Top Notch Canine Capability: K9 security dogs and handlers in Kenya',
  description: 'Detection dog training, trained patrol dogs and handler courses for airports, sea ports, hotels and security firms, from Kitengela since 2016.',
  ld: true,
  preload: 'images/stock/malinois-handler-2400.jpg',
  body: `
${hero({
  page: false,
  full: true,
  h1: 'Trained security dogs and handlers for East Africa',
  text: 'Narcotics and explosives detection, patrol dogs and handler courses for airports, sea ports, hotels and security firms. In Kenya, Uganda and Tanzania since 2016.',
  img: 'images/stock/malinois-handler-1200.jpg',
  srcset: 'images/stock/malinois-handler-1200.jpg 1200w, images/stock/malinois-handler-2400.jpg 2400w',
  alt: 'A Belgian Malinois on a handler\'s lead',
  pos: '62% 40%',
  actions: btn('contact.html#request', 'Request a K9 team') + '<a class="link" href="services.html">See the services</a>',
  creds: `<div class="creds"><div class="wrap"><ul class="creds__list">
    <li><strong>NASDU standard</strong><span>Dogs and handlers recertified yearly</span></li>
    <li><strong>Ex-Military Police</strong><span>Head of training, IED and EDD certified</span></li>
    <li><strong>Since 2016</strong><span>Kenya, Uganda and Tanzania</span></li>
    <li><strong>Open every day</strong><span>06:00 to 20:00, Kitengela</span></li>
  </ul></div></div>`,
})}

<section class="section" aria-labelledby="intro-h">
  <div class="wrap intro">
    <div class="intro__body">
      <h2 id="intro-h">K9 teams for sites that cannot miss a threat</h2>
      <p class="lede">Top Notch Canine Capability trains, certifies and deploys working dogs and their handlers from our kennels in Kitengela.</p>
      <p class="measure">Every dog is assessed for drive, temperament and health, trained to NASDU standards and certified before it is placed. Our clients are security firms, airports, sea ports, hotels, agencies and companies building a dog unit of their own.</p>
      <ul class="ticks">
        <li>Detection of cocaine, heroin, cannabis, methamphetamine and explosives</li>
        <li>Patrol, VIP protection and crowd deterrence dogs</li>
        <li>Handler courses for new handlers and refreshers</li>
        <li>Veterinary care, equipment and K9 unit consultation</li>
      </ul>
    </div>
    <aside class="record" aria-label="Head of training">
      <p class="record__statement">Trained to the standard of airport and sea-port K9 security in Mogadishu.</p>
      <p style="padding:0 28px 24px;color:var(--muted);font-size:0.9375rem">Our head of training ran K9 screening at Aden Adde International Airport and Mogadishu sea port, led six UNMAS trainers for the Somali Police Force, and served in the Kenya Defence Forces Military Police K9 unit.</p>
      <div class="record__photo"><img src="images/founder.jpg" alt="Bonifance Mokua in Military Police uniform with a shepherd dog" loading="lazy"></div>
      <div class="record__foot">
        <p><strong>Bonifance Mokua</strong>Director and head of training<br><a class="link" href="about.html">Read his full profile</a></p>
        <img src="images/logo.svg" alt="" width="52" height="49" loading="lazy">
      </div>
    </aside>
  </div>
</section>

<section class="section section--stone" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="head">
      <h2 id="svc-h">Detection, patrol and handler training</h2>
      <p>Three services most of our clients start with. Veterinary care, equipment and consultation sit alongside them.</p>
    </div>
    <ul class="services">
      <li class="service">
        <div class="service__photo" data-reveal><img src="images/action-springer-luggage.jpg" alt="A black Labrador in a yellow harness searching a bag" loading="lazy"></div>
        <h3><a href="services.html#services">Detection dog training</a></h3>
        <p>Narcotics and explosives, to NASDU standards, with yearly recertification.</p>
        ${more('services.html#services', 'Detection training')}
      </li>
      <li class="service">
        <div class="service__photo" data-reveal><img src="images/svc-supply-dogs.jpg" alt="A Belgian Malinois facing the camera" loading="lazy" style="object-position:50% 25%"></div>
        <h3><a href="services.html#services">Supply of trained dogs</a></h3>
        <p>Patrol, VIP protection, detection and crowd deterrence dogs, with health records.</p>
        ${more('services.html#services', 'Trained dogs')}
      </li>
      <li class="service">
        <div class="service__photo" data-reveal><img src="images/svc-handler-training.jpg" alt="A handler running bite-work training with a young Rottweiler on a lead" loading="lazy" style="object-position:40% 50%"></div>
        <h3><a href="services.html#services">Dog handler training</a></h3>
        <p>Obedience, off-leash control, search procedure and handler safety.</p>
        ${more('services.html#services', 'Handler courses')}
      </li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="field-h">
  <div class="wrap">
    <div class="head">
      <h2 id="field-h">Dog teams at airports, ports and checkpoints</h2>
      <p>Where our teams work: aircraft cabins, bus checkpoints, luggage halls and cargo sheds.</p>
    </div>
    <div class="field">
      <figure class="field__big"><img src="images/action-malinois-handler.jpg" alt="A shepherd dog searching the luggage rack above a bus window" loading="lazy" style="object-position:50% 30%"><figcaption><strong>Search dogs at bus checkpoints</strong>Seats and luggage racks checked before the bus moves on.</figcaption></figure>
      <figure class="field__side"><img src="images/action-dog-aircraft.jpg" alt="A Springer Spaniel sniffing a row of suitcases" loading="lazy" style="object-position:50% 45%"><figcaption><strong>Detection dogs on luggage and cargo</strong>Suitcases screened in rows, the handler beside the dog.</figcaption></figure>
    </div>
  </div>
</section>


<section class="section section--stone" aria-labelledby="clients-h">
  <div class="wrap">
    <div class="head head--stack"><h2 id="clients-h">Security firms and hotels that use our dog teams</h2></div>
    <ul class="clients">
      <li>H-Hour Security<span>Security operations</span></li>
      <li>Radar Security<span>Security contractor</span></li>
      <li>Ismax Security Services<span>Security services</span></li>
      <li>Back Track Ltd<span>Security and logistics</span></li>
      <li>Dusit D2 Hotel<span>Hospitality</span></li>
    </ul>
  </div>
</section>
${PROOF}
<section class="section" aria-labelledby="breeds-h">
  <div class="wrap split split--flip">
    <div class="split__photo" data-reveal><img src="images/breed-rottweiler.jpg" alt="A Rottweiler sitting in frosted grass" loading="lazy" style="object-position:48% 50%"></div>
    <div class="split__body">
      <h2 id="breeds-h">The working breeds we deploy most</h2>
      <ul class="rows">
        <li><span class="rows__name">Belgian Malinois</span><p>Patrol and detection. Our most deployed dog.</p></li>
        <li><span class="rows__name">Labrador Retriever</span><p>Narcotics, explosives and cargo screening.</p></li>
        <li><span class="rows__name">Rottweiler</span><p>Property guarding and deterrence.</p></li>
      </ul>
      ${more('breeds.html', 'See all ten breeds')}
    </div>
  </div>
</section>

${closing(undefined, 'shepherd-leap')}
`,
});

// ---------- Services ----------
const services = page({
  file: 'services.html',
  current: 'services.html',
  title: 'K9 services: detection training, trained dogs and handler courses | Top Notch Canine',
  description: 'Detection dog training to NASDU standards, certified patrol and detection dogs, handler courses, vet care and K9 consultation in Kenya, Uganda and Tanzania.',
  preload: 'images/action-springer-luggage.jpg',
  body: `
${hero({
  h1: 'K9 training, trained dogs and handler courses',
  text: 'Detection training to NASDU standards, certified patrol and detection dogs, handler courses and vet care, for clients in Kenya, Uganda and Tanzania.',
  img: 'images/action-springer-luggage.jpg',
  alt: 'A black Labrador in a yellow harness searching a bag',
  pos: '55% 40%',
  actions: btn('contact.html#request', 'Request a K9 team') + '<a class="link" href="#faq">Read the questions</a>',
})}

<section class="section" id="services" aria-labelledby="six-h">
  <div class="wrap">
    <div class="head">
      <h2 id="six-h">Six services for security teams</h2>
      <p>For security firms, agencies, hotels and companies that run their own dog unit.</p>
    </div>
    <ul class="rows">
      <li><span class="rows__name">Detection dog training</span><p>Cocaine, heroin, cannabis, methamphetamine and explosives, to NASDU standards, recertified yearly.</p></li>
      <li><span class="rows__name">Supply of trained dogs</span><p>Patrol, VIP protection, detection and crowd control dogs, each with health records.</p></li>
      <li><span class="rows__name">Dog handler training</span><p>Obedience, off-leash control, search procedure and handler safety, for one handler or a team.</p></li>
      <li><span class="rows__name">Veterinary care</span><p>Checks, vaccinations, injury care and pre-deployment clearance.</p></li>
      <li><span class="rows__name">Equipment and accessories</span><p>Harnesses, patrol vests, muzzles, bite sleeves and travel kennels.</p></li>
      <li><span class="rows__name">K9 consultation</span><p>Breeds, handler ratios and kennels for a unit of your own.</p></li>
    </ul>
  </div>
</section>

<section class="band section" id="process" aria-labelledby="process-h">
  <div class="wrap">
    <div class="head">
      <h2 id="process-h">How a deployment runs, in four steps</h2>
      <p style="color:var(--on-dark-muted)">From the first site visit to the quarterly review.</p>
    </div>
    <ol class="steps">
      <li><h3>K9 assessment of your site</h3><p>Your site, the threat and what you need covered.</p></li>
      <li><h3>The deployment plan</h3><p>Team size, patrol routes and the schedule.</p></li>
      <li><h3>Team deployment</h3><p>Certified handlers and dogs, each with NASDU papers.</p></li>
      <li><h3>Reports and quarterly reviews</h3><p>Written incident reports and a review every quarter.</p></li>
    </ol>
  </div>
</section>

<section class="section" id="home" aria-labelledby="home-h">
  <div class="wrap split">
    <div class="split__photo" data-reveal><img src="images/svc-supply-dogs.jpg" alt="A Belgian Malinois facing the camera" loading="lazy" style="object-position:50% 25%"></div>
    <div class="split__body">
      <h2 id="home-h">Dog walking and sitting in Nairobi</h2>
      <p class="lede">Run by our own certified handlers, for households in Nairobi only.</p>
      <ul class="rows">
        <li><span class="rows__name">Dog walking</span><p>Morning, afternoon or evening walks on assessed routes, with a note on behaviour after each one.</p></li>
        <li><span class="rows__name">Dog sitting</span><p>Day care with drop-off and pick-up, overnight boarding at our kennels, or a sitter in your home.</p></li>
      </ul>
      ${more('contact.html#request', 'Book walking or sitting')}
    </div>
  </div>
</section>

<section class="section section--stone" id="faq" aria-labelledby="faq-h">
  <div class="wrap">
    <div class="head head--stack"><h2 id="faq-h">Questions clients ask</h2></div>
    <div class="faq">
      ${[
        ['How long does it take to train a detection dog?', 'Basic detection imprinting takes 6 to 8 weeks. Full certification to NASDU standards takes 3 to 4 months, then the dog is recertified every year.'],
        ['Do you supply guard dogs for homes?', 'Yes, for homes in Nairobi and across Kenya. Each dog comes with a handler session, so your family or guards know how to work with it safely.'],
        ['Can you train my existing dog?', 'Only after a temperament and drive assessment: not every dog suits security or detection work. If yours does, we design a programme for it; if not, we say so and advise you.'],
        ['Which areas do you serve?', 'We are based in Kitengela and work across Nairobi and Kenya, including Mombasa, Kisumu, Eldoret and Nakuru, and in Uganda and Tanzania.'],
        ['Is dog walking or sitting available outside Nairobi?', 'Not yet. Walking and sitting are run by our own handlers in Nairobi only. Outside Nairobi, contact us and we will tell you what we can do.'],
        ['How much does a trained guard dog cost?', 'It depends on the breed, the level of training and certification. A dog trained in obedience costs less than a NASDU-certified patrol or detection dog. Message us on WhatsApp for a quote.'],
        ['Is handler training open to individuals?', 'Yes. We train dog owners, security companies building a K9 unit, and government agencies, at individual and group rates. The NASDU pathway is open to every qualifying candidate.'],
      ].map(([q, a]) => `<details><summary>${q}${icon.plus}</summary><p>${a}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>

${closing(undefined, 'shepherd-grass', '50% 55%')}
`,
});

// ---------- Breeds ----------
const BREEDS = [
  ['breed-gsd', 'German Shepherd', 'Patrol, detection, protection and police work', 'Germany', 3, 'High'],
  ['breed-mali', 'Belgian Malinois', 'Patrol, detection, VIP and search and rescue', 'Belgium', 4, 'Extreme'],
  ['breed-lab', 'Labrador Retriever', 'Narcotics, explosives and search and rescue', 'UK and Canada', 3, 'High'],
  ['breed-springer', 'Springer Spaniel', 'Vehicles, luggage and cargo searches', 'England', 3, 'High'],
  ['breed-cocker', 'Cocker Spaniel', 'Passive detection in public places', 'England', 2, 'Medium to high'],
  ['breed-dutch', 'Dutch Shepherd', 'Patrol, protection and military detection', 'Netherlands', 4, 'Extreme'],
  ['breed-rott', 'Rottweiler', 'Property guarding and deterrence', 'Germany', 3, 'High'],
  ['breed-belgian', 'Belgian Shepherd', 'Patrol, protection and detection', 'Belgium', 3, 'High'],
  ['breed-ovcharka', 'Russian Mountain Dog', 'Estate and perimeter guarding', 'Russia and the Caucasus', 0, 'Territorial'],
  ['breed-boerboel', 'South African Mastiff', 'Farm and property guarding', 'South Africa', 3, 'High'],
];
const breeds = page({
  file: 'breeds.html',
  current: 'breeds.html',
  title: 'Ten working dog breeds for security work | Top Notch Canine',
  description: 'Belgian Malinois, German Shepherd, Labrador, Springer Spaniel, Rottweiler and more: the ten working breeds we train for detection, patrol and guarding.',
  preload: 'images/stock/shepherd-grass-1200.jpg',
  body: `
${hero({
  h1: 'Ten working dog breeds for security work',
  text: 'From breeders with working pedigrees in Belgium, the Netherlands and Germany. Each dog is screened for drive, health and temperament before training starts.',
  stock: true,
  img: 'images/stock/shepherd-grass-1200.jpg',
  srcset: 'images/stock/shepherd-grass-1200.jpg 1200w, images/stock/shepherd-grass-2400.jpg 2400w',
  alt: 'A German Shepherd running across dry grassland',
  pos: '50% 50%',
  actions: btn('contact.html#request', 'Request a K9 team') + '<a class="link" href="#all">See all ten breeds</a>',
})}

<section class="section" id="all" aria-labelledby="all-h">
  <div class="wrap">
    <div class="head">
      <h2 id="all-h">All ten breeds and their jobs</h2>
      <p>Drive is how hard a dog works for its reward. High-drive dogs suit detection and patrol; territorial breeds suit perimeters.</p>
    </div>
    <div class="table-wrap" role="region" aria-labelledby="all-h" tabindex="0">
      <table class="breeds">
        <thead><tr><th scope="col">Breed</th><th scope="col">Work</th><th scope="col">Origin</th><th scope="col">Drive</th></tr></thead>
        <tbody>
          ${BREEDS.map(([id, n, w, o, d, dl]) => `<tr id="${id}"><th scope="row">${n}</th><td>${w}</td><td>${o}</td><td class="drive">${dl}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section section--stone" aria-labelledby="det-h">
  <div class="wrap split">
    <div class="split__photo" data-reveal><img src="images/action-dog-aircraft.jpg" alt="A Springer Spaniel sniffing a row of suitcases" loading="lazy"></div>
    <div class="split__body">
      <h2 id="det-h">Detection breeds that search by scent</h2>
      <p class="lede">Labradors and Springer Spaniels search aircraft, cargo, vehicles and luggage. Their friendly look suits airports and crowds.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="mali-h">
  <div class="wrap split split--flip">
    <div class="split__photo" data-reveal><img src="images/action-detection-vest.jpg" alt="A Belgian Malinois searching the seats of an aircraft cabin" loading="lazy"></div>
    <div class="split__body">
      <h2 id="mali-h">Our most deployed dog</h2>
      <p class="lede">The Belgian Malinois has the drive, speed and stamina for patrol, detection and VIP work in one dog, which is why most of our teams work with one.</p>
    </div>
  </div>
</section>

<section class="section section--stone" aria-labelledby="guard-h">
  <div class="wrap">
    <div class="head">
      <h2 id="guard-h">Guard breeds for property and estates</h2>
      <p>Large, territorial dogs whose size alone keeps most intruders off a perimeter.</p>
    </div>
    <ul class="trio">
      <li><h3>Rottweiler</h3><p>Property guarding and deterrence, with a steady temperament.</p></li>
      <li><h3>South African Mastiff</h3><p>The Boerboel, bred in South Africa to guard farms.</p></li>
      <li><h3>Russian Mountain Dog</h3><p>The Caucasian Ovcharka, a heavy estate guard.</p></li>
    </ul>
  </div>
</section>

${closing(undefined, 'shepherd-leap')}
`,
});

// ---------- About ----------
const about = page({
  file: 'about.html',
  current: 'about.html',
  title: 'About Top Notch Canine Capability: K9 security company in Kitengela',
  description: 'Since 2016 we have trained and supplied patrol, detection, tracking and search-and-rescue dogs and their handlers for security firms, hotels and agencies in East Africa.',
  preload: 'images/action-malinois-handler.jpg',
  body: `
${hero({
  h1: 'K9 security company in Kitengela',
  text: 'Since 2016 we have trained and supplied patrol, detection, tracking and search-and-rescue dogs, and their handlers, for security firms, hotels and agencies in East Africa.',
  img: 'images/action-malinois-handler.jpg',
  alt: 'A shepherd dog searching the luggage rack above a bus window',
  pos: '50% 30%',
  actions: btn('contact.html#request', 'Request a K9 team') + '<a class="link" href="services.html">See the services</a>',
})}

<section class="section" aria-labelledby="founder-h">
  <div class="wrap founder">
    <div class="founder__photo"><img src="images/founder.jpg" alt="Bonifance Mokua in uniform beside a shepherd dog" loading="lazy"></div>
    <div class="founder__body">
      <h2 id="founder-h">Bonifance Mokua, director and head of training</h2>
      <p class="lede">A retired Military Police officer and certified IED and EDD trainer. He founded Top Notch Canine Capability in 2016.</p>
      <ul class="timeline">
        <li><strong>2016 to now</strong><span>Director and head of training, Top Notch Canine Capability, Kitengela</span></li>
        <li><strong>Mogadishu</strong><span>K9 security for cargo and aircraft screening at Aden Adde International Airport and the sea port</span></li>
        <li><strong>UNMAS, Somalia</strong><span>IED and EDD specialist, leading six trainers for the Somali Police Force</span></li>
        <li><strong>Kenya Defence Forces</strong><span>Military Police K9 unit</span></li>
      </ul>
      <div class="social" style="margin-top:28px"><a href="mailto:mokua@topnotchk9capability.co.ke" aria-label="Email Bonifance Mokua" title="Email Bonifance">${icon.mail}</a><a href="${LINKEDIN}" rel="noopener" aria-label="Bonifance Mokua on LinkedIn" title="LinkedIn profile">${icon.linkedin}</a></div>
    </div>
  </div>
</section>

<section class="section section--stone" aria-labelledby="team-h">
  <div class="wrap split split--flip">
    <div class="split__photo" data-reveal><img src="images/svc-handler-training.jpg" alt="A handler running bite-work training with a young Rottweiler on a lead" loading="lazy" style="object-position:40% 50%"></div>
    <div class="split__body">
      <h2 id="team-h">Our team</h2>
      <p class="lede">Our handlers and trainers are active and retired members of specialised police and military units across Kenya.</p>
      <p class="measure">Handlers and dogs train together at our kennels in Kitengela and are re-certified to NASDU standards every year.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="certs-h">
  <div class="wrap">
    <div class="head">
      <h2 id="certs-h">Certifications and memberships</h2>
      <p>Handlers and dogs are re-certified to NASDU standards every year.</p>
    </div>
    <ul class="rows">
      <li><span class="rows__name">NASDU</span><p>National Association of Security Dog Users, the standard for security dog work.</p></li>
      <li><span class="rows__name">PROSAK</span><p>Protective and Safety Association of Kenya.</p></li>
      <li><span class="rows__name">EAKC</span><p>East Africa Kennel Club, for pedigree and temperament.</p></li>
      <li><span class="rows__name">IED and EDD</span><p>Explosive detection certification from UN and military service.</p></li>
    </ul>
  </div>
</section>

<section class="section section--stone" aria-labelledby="clients-h">
  <div class="wrap">
    <div class="head head--stack"><h2 id="clients-h">Clients in security, hotels and logistics</h2></div>
    <ul class="clients">
      <li>H-Hour Security<span>Security operations</span></li>
      <li>Radar Security<span>Security contractor</span></li>
      <li>Ismax Security Services<span>Security services</span></li>
      <li>Back Track Ltd<span>Security and logistics</span></li>
      <li>Dusit D2 Hotel<span>Hospitality</span></li>
    </ul>
  </div>
</section>
${PROOF}
${closing(undefined, 'shepherd-grass', '50% 55%')}
`,
});

// ---------- Contact ----------
const contact = page({
  file: 'contact.html',
  current: 'contact.html',
  title: 'Contact our K9 team in Kitengela | Top Notch Canine',
  description: 'Request a K9 team, call +254 721 448 555 or message us on WhatsApp. Open every day, 06:00 to 20:00, Balozi Road, Kitengela.',
  ld: true,
  preload: 'images/action-dog-aircraft.jpg',
  body: `
${hero({
  h1: 'Contact our K9 team in Kitengela',
  text: 'Send the request below. For an urgent deployment, call <span class="nowrap">+254 721 448 555</span>.',
  img: 'images/action-dog-aircraft.jpg',
  alt: 'A Springer Spaniel sniffing a row of suitcases',
  pos: '50% 45%',
  actions: btn('#request', 'Request a K9 team') + '<a class="link" href="#careers">See open jobs</a>',
})}

<section class="section" id="request" aria-labelledby="req-h">
  <div class="wrap form-grid">
    <div>
      <div class="head head--stack" style="margin-bottom:36px">
        <h2 id="req-h">Request a K9 team</h2>
        <p>Tell us the site, what you need found or guarded, and for how long.</p>
      </div>
      ${FORM_OPEN}
        <div class="field-row">
          <label for="f-name">Name</label>
          <input class="input" id="f-name" name="name" autocomplete="name" required aria-describedby="f-name-err" data-missing="Write the name we should reply to.">
          <p class="error" id="f-name-err" aria-live="polite"></p>
        </div>
        <div class="field-row">
          <label for="f-org">Organisation <span class="opt">(optional)</span></label>
          <input class="input" id="f-org" name="organisation" autocomplete="organization" aria-describedby="f-org-err">
          <p class="error" id="f-org-err" aria-live="polite"></p>
        </div>
        <div class="field-row">
          <label for="f-email">Email</label>
          <input class="input" id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="f-email-err" data-missing="Write an email address we can reply to." data-mismatch="Write an email address with an @, like name@company.co.ke.">
          <p class="error" id="f-email-err" aria-live="polite"></p>
        </div>
        <div class="field-row">
          <label for="f-phone">Phone</label>
          <input class="input" id="f-phone" name="phone" type="tel" autocomplete="tel" required pattern="[0-9 +()-]{7,}" aria-describedby="f-phone-err" data-missing="Write a number we can call." data-mismatch="Write a phone number using digits, like 0721 448 555.">
          <p class="error" id="f-phone-err" aria-live="polite"></p>
        </div>
        <div class="field-row field-row--full">
          <label for="f-service">Service</label>
          <select class="input" id="f-service" name="service" required aria-describedby="f-service-err" data-missing="Choose the service you need.">
            <option value="">Choose a service</option>
            <option>Detection dog training</option>
            <option>Supply of trained dogs</option>
            <option>Dog handler training</option>
            <option>Veterinary care</option>
            <option>Equipment and accessories</option>
            <option>K9 consultation</option>
            <option>Dog walking (Nairobi)</option>
            <option>Dog sitting (Nairobi)</option>
            <option>Not sure yet</option>
          </select>
          <p class="error" id="f-service-err" aria-live="polite"></p>
        </div>
        <div class="field-row field-row--full">
          <label for="f-site">Site and dates</label>
          <input class="input" id="f-site" name="site" required aria-describedby="f-site-err" placeholder="For example: cargo shed, Mombasa, from 1 March" data-missing="Write where the team is needed and from when.">
          <p class="error" id="f-site-err" aria-live="polite"></p>
        </div>
        <div class="field-row field-row--full">
          <label for="f-need">What you need</label>
          <textarea class="input" id="f-need" name="message" required aria-describedby="f-need-err" data-missing="Write what the team should search for or guard."></textarea>
          <p class="error" id="f-need-err" aria-live="polite"></p>
        </div>
        <div class="form__foot">
          <button class="btn btn--red" type="submit">Send the request${icon.arrow}</button>
          <p class="form__status" role="status"></p>
        </div>
      </form>
    </div>
    <aside aria-labelledby="direct-h">
      <h2 id="direct-h" class="visually-hidden">Contact details</h2>
      <ul class="contact-list">
        <li><small>Phone</small><a href="tel:${TEL}">${TEL_TXT}</a><br><a href="tel:+254754448555">+254 754 448 555</a><br><a href="tel:+254202448555">020 2448 555</a></li>
        <li><small>Email</small><a href="mailto:${EMAIL}">${EMAIL}</a><br><a href="mailto:mokua@topnotchk9capability.co.ke">mokua@topnotchk9capability.co.ke</a></li>
        <li><small>WhatsApp</small><a href="${WA}" rel="noopener">Message us on WhatsApp</a></li>
        <li><small>Kennels and office</small>Balozi Road, Bishop Court, Kitengela<br><a class="link" href="https://maps.google.com/?q=Balozi+Road+Bishop+Court+Kitengela" rel="noopener">Get directions</a></li>
        <li><small>Hours</small>Open every day, 06:00 to 20:00</li>
      </ul>
    </aside>
  </div>
</section>

<section class="section section--stone" id="careers" aria-labelledby="careers-h">
  <div class="wrap">
    <div class="head">
      <h2 id="careers-h">Jobs for K9 handlers, trainers and kennel staff</h2>
      <p>Full-time roles, reporting to the head of training. We hire from military, police and security backgrounds.</p>
    </div>
    <ul class="rows">
      <li><span class="rows__name">K9 handler</span><p>NASDU handler certificate, two years of K9 handling, shift work and a clean background check.</p><a class="rows__meta more" href="mailto:${EMAIL}?subject=Application%3A%20K9%20Handler">Apply${icon.arrow}</a></li>
      <li><span class="rows__name">Dog trainer</span><p>Three years training patrol or detection dogs; NASDU trainer level preferred.</p><a class="rows__meta more" href="mailto:${EMAIL}?subject=Application%3A%20Dog%20Trainer">Apply${icon.arrow}</a></li>
      <li><span class="rows__name">Kennel technician</span><p>An animal health certificate and a year in a kennel or vet clinic, at ease with large breeds.</p><a class="rows__meta more" href="mailto:${EMAIL}?subject=Application%3A%20Kennel%20Technician">Apply${icon.arrow}</a></li>
      <li><span class="rows__name">Any other role</span><p>Ex-military, police or security staff with K9 experience, willing to certify with NASDU.</p><a class="rows__meta more" href="mailto:${EMAIL}?subject=General%20Application">Apply${icon.arrow}</a></li>
    </ul>
  </div>
</section>
`,
});

// ---------- Legal and 404 ----------
const legal = (file, title, description) => {
  let body = fs.readFileSync(path.join(HERE, file.replace('.html', '.body.html')), 'utf8');
  body = body.replace(/\n\s+/g, '\n')
    .replace(/<h2>(\d+\. )(\w)([^<]*)<\/h2>/g, (m, n, a, rest) => `<h2>${n}${a}${rest.toLowerCase()}</h2>`);
  return page({
    file, title, description,
    body: `<section class="section"><div class="wrap"><article class="prose">\n${body}\n</article></div></section>`,
  });
};
let privacy = legal('privacy.html', 'Privacy policy | Top Notch Canine Capability', 'How Top Notch Canine Capability collects, uses and protects the personal information you share with us, under the Kenya Data Protection Act, 2019.');
privacy = privacy.replace(
  'However, when you load our pages your browser connects to Google Fonts (to display our typefaces), which receives your IP address and browser details as part of normal web requests.',
  'Our typefaces are served from this website, so loading a page does not contact a third-party font service.'
);
if (!CFG.web3formsKey) privacy = privacy
  .replace("If you use our contact form, the details you enter are transmitted through Web3Forms, our form-delivery provider, which forwards them to us by email.", `If you use our contact form, it opens your own email app with the details filled in, and you send them to ${EMAIL} from there.`)
  .replace("(Web3Forms for form delivery, our email provider, and WhatsApp/Meta for chat)", "(our email provider, and WhatsApp/Meta for chat)");
if (CFG.ga4Id) privacy = privacy
  .replace('We do not set cookies, tracking pixels or analytics scripts on this website.', 'We use Google Analytics to count visits and to see which pages and contact buttons are used. It sets cookies and receives your IP address and browser details; we do not use it to identify you, and you can block it with your browser settings or the Google Analytics opt-out add-on.')
  .replace('our email provider, and WhatsApp/Meta for chat)', 'our email provider, Google Analytics for visit statistics, and WhatsApp/Meta for chat)');
const terms = legal('terms.html', 'Terms of use | Top Notch Canine Capability', 'The terms that apply when you use the Top Notch Canine Capability website or engage our K9 services.');

const notfound = page({
  file: '404.html',
  title: 'Page not found | Top Notch Canine Capability',
  description: 'This page has moved or no longer exists.',
  noindex: true,
  body: `
<section class="section notfound" aria-labelledby="nf-h">
  <div class="wrap">
    <h1 id="nf-h" style="max-width:16ch">This page has moved or no longer exists</h1>
    <p class="lede" style="margin-top:20px">The dogs searched for it too. Try the home page or our services instead.</p>
    <div class="actions" style="margin-top:32px">${btn('index.html', 'Go to the home page')}<a class="link" href="services.html">See the services</a></div>
  </div>
</section>`,
});

const thanks = page({
  file: 'thanks.html',
  title: 'Request received | Top Notch Canine Capability',
  description: 'Your K9 team request has reached us.',
  noindex: true,
  body: `
<section class="section notfound thanks" aria-labelledby="ty-h" data-lead>
  <div class="wrap">
    <h1 id="ty-h" style="max-width:18ch">Your request has reached our K9 team</h1>
    <p class="lede" style="margin-top:20px">It is in our team's inbox now. Here is what happens next.</p>
    <ol class="steps-next">
      <li><strong>We call you back</strong>We open every day, 06:00 to 20:00, and return requests in that order.</li>
      <li><strong>We agree a site assessment</strong>A trainer looks at the site, the threat and what needs covering.</li>
      <li><strong>You receive a deployment plan</strong>Team size, dogs, schedule and price, in writing.</li>
    </ol>
    <p class="muted" style="margin-top:28px">For an urgent deployment, do not wait: call <a href="tel:${TEL}">${TEL_TXT}</a> or <a href="${WA}" rel="noopener">message us on WhatsApp</a>.</p>
    <div class="actions" style="margin-top:32px">${btn('services.html', 'See the services', 'btn--ink')}<a class="link" href="index.html">Back to the home page</a></div>
  </div>
</section>`,
});

const out = { 'index.html': home, 'services.html': services, 'breeds.html': breeds, 'about.html': about, 'contact.html': contact, 'privacy.html': privacy, 'terms.html': terms, '404.html': notfound, 'thanks.html': thanks };
for (const [f, html] of Object.entries(out)) {
  fs.writeFileSync(path.join(SITE, f), html);
  console.log('wrote', f, html.length);
}
const cname = path.join(SITE, 'CNAME');
if (CFG.customDomain) { fs.writeFileSync(cname, new URL(ORIGIN).host + '\n'); console.log('wrote CNAME'); }
else if (fs.existsSync(cname)) fs.rmSync(cname);
