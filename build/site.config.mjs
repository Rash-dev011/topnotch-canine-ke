// Settings that switch on parts of the site. Leave a value empty and that part stays off.
// After any change, rebuild from the repo root:  node build/build.mjs .
export default {
  // 1. Contact form delivery. Free key from https://web3forms.com, created with clientservice@topnotchk9capability.co.ke
  //    (the key is public by design; requests are emailed to that address). Empty = the form opens the visitor's email app.
  web3formsKey: '',

  // 2. Visitor and lead tracking. Google Analytics 4 measurement ID, like 'G-AB12CD34EF'.
  //    Counts visits, and Call / WhatsApp / Email taps and sent requests as events. Empty = no tracking at all.
  ga4Id: '',

  // 3. Proof. Fill only with facts the client has confirmed in writing. Each entry shows on the home and about pages.
  //    { client: 'Dusit D2 Hotel', sector: 'Hospitality', work: 'Two explosives detection teams at the main gate and car park', result: 'In place since 2021, recertified each year' }
  caseStudies: [],

  //    Link to the Google Business Profile reviews, like 'https://g.page/r/XXXX/review'. Shows a "Read our Google reviews" link.
  googleReviewsUrl: '',

  // 4. Set to true once topnotchk9capability.co.ke points at GitHub Pages. Writes the CNAME file the host needs.
  customDomain: false,
};
