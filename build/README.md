# Building the site

The HTML pages are generated. Edit `build/build.mjs` (pages) or `build/site.config.mjs` (switches), then rebuild from the repo root:

```
node build/build.mjs .
```

Do not edit the `.html` files by hand; the next build overwrites them.

## Going live checklist

Each item in `site.config.mjs` stays off until it has a value.

| Switch | What the client provides | What it turns on |
|---|---|---|
| `web3formsKey` | A free key from web3forms.com, created with clientservice@topnotchk9capability.co.ke | The form sends requests straight to that inbox and shows the thank-you page. The privacy page names Web3Forms. Without it, the form opens the visitor's email app. |
| `ga4Id` | A Google Analytics 4 measurement ID (G-…) | Visit counts, plus events for Call, WhatsApp and Email taps (`contact_click`) and sent requests (`generate_lead`). The privacy page names Google Analytics. |
| `caseStudies` | One or two deployments the client confirms in writing, and permission from that client to be named | A "Recent K9 deployments" section on the home and about pages |
| `googleReviewsUrl` | The review link from their Google Business Profile | A "Read our Google reviews" link under the proof section |
| `customDomain` | DNS for topnotchk9capability.co.ke pointed at GitHub Pages | Writes the `CNAME` file so the site answers on the real domain |

Larger originals of the client's own photos (1600px wide or more) will sharpen the inner-page heroes. Replace the files in `images/` with the same names.
