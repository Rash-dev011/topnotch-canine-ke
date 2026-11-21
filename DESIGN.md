---
name: Top Notch Canine Capability
description: Working security dogs and certified handlers for East African airports, sea ports, hotels and security firms.
colors:
  signal-red: "#d4001c"
  signal-red-deep: "#a80016"
  logo-red: "#fe0022"
  ink: "#111214"
  steel: "#1c1f23"
  graphite: "#2c3036"
  stone: "#f2f2ef"
  rule: "#d6d6d1"
  muted: "#555a62"
  on-dark: "#f4f4f1"
  on-dark-muted: "#b9bcc2"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(2.375rem, 1.5rem + 3.4vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(1.875rem, 1.4rem + 1.8vw, 2.875rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.06em"
  small:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  step-numeral:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "3rem"
    fontWeight: 300
    lineHeight: 1
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 5vw, 80px)"
  section: "clamp(72px, 9vw, 136px)"
  container: "1280px"
  slant: "18px"
  slant-sm: "14px"
  row: "24px"
  stack: "20px"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.white}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 42px 14px 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-red-deep}"
    textColor: "{colors.white}"
  button-primary-sm:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "10px 38px 10px 24px"
    height: "44px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "14px 42px 14px 24px"
    height: "52px"
  button-ink-hover:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.white}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 42px 14px 24px"
    height: "52px"
  button-white-hover:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
  button-disabled:
    backgroundColor: "{colors.rule}"
    textColor: "{colors.muted}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "52px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "6px 0"
  nav-link-active:
    textColor: "{colors.signal-red}"
  credentials-strip:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.on-dark}"
    padding: "22px 24px"
  band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    padding: "{spacing.section}"
  badge:
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "8px 14px"
---

# Design System: Top Notch Canine Capability

## Overview

**Creative North Star: "The Screening Line"**

The site reads like the inside of a well-run screening hall: white light, black ink, ruled lanes, and one red that means "act here". It is the category standard for a defence-grade security provider, plain corporate authority at the level of SafeLane Global, carried by real field photographs of dogs working aircraft cabins, bus racks and luggage rows. Nothing is dressed up as tactical; the credentials do the work.

Density is calm and institutional. Sections breathe on a large vertical rhythm, content sits in ruled lists and two-column grids rather than floating cards, and the eye is led by weight bands: a white page punctuated by full-width ink and steel bands, with a warm stone band for secondary groupings. The one piece of geometry the system owns is the hard diagonal cut. It slices the hero photograph, ends every primary button on a slant, trims photo panels and splits the footer into red and black.

The system refuses tactical-costume styling: stencil type, camouflage, glowing edges, monospaced "classified" labels. It also refuses invented proof; the visual language stays factual so the record can speak.

**Key Characteristics:**
- White ground, ink type, one red for action.
- Jost 500 in sentence case for every heading; uppercase is reserved for small navigational labels.
- Square corners everywhere; the only non-rectangular shape is the diagonal cut.
- Ruled lists with a 2px ink top rule and 1px dividers stand in for cards.
- Full-width ink and steel bands carry weight; stone carries grouping.
- One entrance moment: the hero photo wipes in along its diagonal; everything else is still.

## Colors

A near-monochrome corporate palette, white and ink with steel and graphite for depth, and a single saturated red reserved for action and large brand marks.

### Primary
- **Signal Red** (`signal-red`): the fill of every primary control ("Request a K9 team"), the active nav state, link hover, focus outlines on light ground, the input focus bar, error text, FAQ toggles, tick markers and list markers. Chosen over the logo red because white text on it passes 4.5:1.
- **Signal Red Deep** (`signal-red-deep`): hover and pressed state of red controls and the header phone link.
- **Logo Red** (`logo-red`): the logo's own red, used only for large marks on dark ground: the step numerals in the process band and the hover of the large phone number in the closing band. Never under small text, never as a button fill.

### Neutral
- **Ink** (`ink`): body text, headings, the hero band, the closing band, the black half of the footer, 2px top rules of every ruled list, the ink button and the badge border.
- **Steel** (`steel`): the credentials strip that closes the hero band; one step lighter than ink so the strip reads as a shelf.
- **Graphite** (`graphite`): dividers inside dark bands, the ink button's hover, the phone action bar's gap line, scrollbar thumb.
- **Stone** (`stone`): the alternating light band behind grouped content (services, clients), table row hover, the white button's hover.
- **Rule** (`rule`): 1px dividers on light ground, the header's bottom border, the disabled button fill.
- **Muted** (`muted`): secondary text, ledes, descriptions in ruled rows, table cells, form hints.
- **On-Dark** (`on-dark`) and **On-Dark Muted** (`on-dark-muted`): primary and secondary text on ink and steel.
- **White** (`white`): the page ground, headings on dark bands, text on red.

### Named Rules
**The One Red Rule.** Red appears only where the visitor can act or where the brand signs its name. It is never a background band, never a section tint, never decoration. The footer's red half is the one exception, because it is the brand mark at page scale.

**The Two Reds Rule.** Filled controls and small red text use Signal Red; the brighter Logo Red is for large marks on dark ground only. If the red element is smaller than 24px or carries white text, it is Signal Red.

**The Band Rule.** Weight comes from full-width bands (ink, steel, stone), never from tinted boxes inside the content column.

## Typography

**Display Font:** Jost (with Futura, Century Gothic, sans-serif), self-hosted variable woff2, weights 100 to 900.
**Body Font:** Jost, same file.

**Character:** One geometric Futura-class family throughout. Medium weight with slight negative tracking gives headings an engineered, civic authority without shouting; regular weight at a generous 1.6 line height keeps body text plain and readable.

### Hierarchy
- **Display** (500, `display`, 1.08): the H1 in each hero band. Balanced wrapping, sentence case.
- **Headline** (500, `headline`, 1.08): section H2s and the closing band's statement, and the large phone number (at 400).
- **Title** (500, `title`, 1.2): H3s, service names, row names in ruled lists, FAQ summaries at the lede size.
- **Lede** (400, `lede`, 1.5): the paragraph under a heading, capped at about 40rem, in Muted (or On-Dark Muted on ink).
- **Body** (400, `body`, 1.6): running text, with a 68ch measure for long paragraphs and 72ch for legal prose.
- **Label** (500, `label`, uppercase, 0.06em to 0.08em): main navigation, "more" links (at 0.875rem), the phone menu toggle, table column heads and contact list labels (0.8125rem, 0.08em), footer column heads (0.8125rem, 0.12em), certification badges.
- **Step numeral** (300, 3rem, tabular): the numbered steps of the deployment sequence, in Logo Red.

### Named Rules
**The Sentence Case Rule.** Every heading, button and statement is set in sentence case at weight 500. Uppercase is reserved for short navigational and tabular labels of a few words; it is never used for headings or paragraphs.

**The One Family Rule.** Jost only. No second display face, no monospace, no stencil.

## Layout

A centred column of max 1280px with a fluid gutter (`gutter`, 20px to 80px) on each side. Sections stack on a fluid vertical rhythm (`section`, 72px to 136px), with a tight variant at 60% of it. Content inside a section is arranged in two-column grids with unequal fractions (1.35 : 1 for intro and record, 1.2 : 1 for band text and contact, 0.8 : 1.2 for founder portrait and body, 1.4 : 1 for form and contact list) and column gaps of 40px to 96px. Section heads pair the H2 and a lede side by side, aligned to the baseline, collapsing to a stack under 800px.

Ruled lists run on fixed column counts: four credentials, three services, five client names, four steps, three trio items, each separated by 1px vertical rules rather than gaps. They step down to two columns and then one at 900px and 560px.

The hero is a full-width ink band. On desktop the photograph occupies the right 64% (56% on inner pages) and the H1, lede and actions sit on solid ink to the left, max 600px wide; the hero is min(78vh, 700px) tall on the home page and min(60vh, 540px) inside. Under 1024px the photograph moves above the text at full width.

Breakpoints: 1024px (header collapses to a menu toggle; hero photograph stacks), 900px (two-column grids collapse), 800px (section heads and ruled rows stack), 768px (phone action bar appears), 600px (form becomes one column), 420px (header tightens).

On phones a fixed two-button action bar (call in ink, request in red) slides up once the hero's primary button has scrolled out of view and hides again over the footer.

## Elevation & Depth

The system is flat. Depth comes from tonal bands (white, stone, steel, ink), 1px rules and photographs, not shadows. The one shadow is functional: the phone menu drops a soft shadow below itself so it separates from the page it covers. Photographs on the hero carry a left-edge ink gradient only where text could meet the image, and field captions sit on 88% ink.

### Shadow Vocabulary
- **Menu drop** (`box-shadow: 0 24px 40px -24px rgb(17 18 20 / 0.35)`): the open phone navigation panel only.

### Named Rules
**The Flat Ground Rule.** Surfaces, buttons, lists and photos never cast shadows. If something needs to feel raised, put it on a different band.

## Shapes

Every corner is square (`rounded.none`), including inputs and buttons. The one recurring silhouette is the hard diagonal cut, made with clip-path polygons, never with rotation or skewed boxes:

- **Hero photograph:** its left edge is cut on a diagonal from 22% at the top to 0 at the bottom; on phones the cut moves to the bottom edge, rising 40px.
- **Primary buttons:** square start, slanted end; the right edge loses `slant` (18px, or `slant-sm` 14px on small buttons) at the bottom.
- **Photo panels:** service photos lose 12% of height on a foot diagonal; split and founder photos lose 8% at one bottom corner; the record photo is cut top and bottom; field captions end on a 24px slant.
- **Tick markers:** a 12px red block with a slanted end, echoing the button.
- **Footer:** a red field covers the left of the ink footer, cut on a diagonal from 72% at the top to 58% at the bottom; on phones the split becomes a near-horizontal diagonal.

Borders are 1px Rule on light ground and 1px Graphite on dark; list tops are 2px Ink (2px White in the process band).

### Named Rules
**The Cut Rule.** Steep cuts (hero photo, button ends, footer split, caption ends) always lean right as they rise; shallow cuts across a photo's top or foot may face either way to point toward the adjacent text. Every cut is a hard edge. No curves, no rounded corners, no chamfers on all four corners.

## Components

### Buttons
Confident, flat and directional: a square start and a slanted end, like a lane marker.
- **Shape:** square corners with the right edge slanted by 18px (`slant`); `slant-sm` 14px on the header button.
- **Primary:** Signal Red fill, white Jost 500 at body size, 52px min height, padding 14px 42px 14px 24px (extra right padding absorbs the slant). A 14px arrow follows the label.
- **Hover / Focus:** fill shifts to Signal Red Deep over 180ms and the arrow nudges 4px right; focus shows a 2px outline offset 3px (Signal Red on light ground, white on dark).
- **Ink and White:** the same shape in Ink (hover Graphite) and White (hover Stone) for dark and light contexts.
- **Small:** 44px min height, 0.9375rem, used in the header.
- **Disabled:** Rule fill with Muted text.
- **Secondary action:** a plain underlined text link beside the button, not a second button.

### Links
- **Inline link:** underline at 1px, offset 0.25em, in 40% of the text colour; on hover the underline and text turn Signal Red (white on dark).
- **"More" link:** uppercase label in Signal Red with a 14px arrow that nudges 4px on hover.

### Ruled lists (in place of cards)
The system has no cards. Grouped content is set as ruled lists: a 2px Ink top rule, items divided by 1px Rule lines, generous padding (22px to 28px), and no backgrounds. Variants: credentials strip (four columns on steel), client names (five columns), trio (three columns), steps (four numbered columns on ink), rows (name, description and meta per line, used for services and breeds), timeline (date and event), contact list (uppercase label over value), FAQ (details elements with a red plus that turns 45 degrees when open), and the breeds table (uppercase column heads, stone row hover).

### Inputs / Fields
- **Style:** white field, 1px mid-grey border, square corners, 52px min height, 12px 14px padding, Jost 400 at 1rem; labels sit above in Jost 500 at 0.9375rem, optional markers in Muted.
- **Focus:** border goes to Ink and a 3px Signal Red bar appears along the bottom edge (inset shadow); the caret is red.
- **Error:** the red border and bottom bar plus a 0.875rem red message under the field. Selects use a drawn chevron.

### Navigation
- **Desktop:** white header, 104px tall, logo and two-line wordmark left; on the right, the phone line in Signal Red above uppercase nav links (0.9375rem, 500, 0.06em) and the small red button. Hover draws a 2px red underline from the left over 240ms; the current page is red with the underline held.
- **Phone (under 1024px):** 80px header, phone icon in a 44px ruled square, a bordered "Menu" toggle; the menu opens as a full-width white panel of ruled rows below the header with the red button at the end. Escape closes it.

### Hero band (signature)
Full-width ink band with the field photograph cut on its diagonal, headline and lede on solid ink, the red primary action plus a text link, and a steel credentials strip closing the band. On load, the photograph wipes in once along its diagonal (1100ms, `cubic-bezier(0.16, 1, 0.3, 1)`) while the H1, lede and actions rise 14px and fade in with 80ms staggers; on phones the photo fades instead. This is the system's only entrance animation, and it is disabled under reduced motion.

### Record panel
A ruled white panel beside the intro: an uppercase statement at 1.375rem to 1.75rem, a supporting paragraph, the founder's photograph cut top and bottom, and a footer line with the name, role, link and a small logo.

### Footer (signature)
Ink footer with a Signal Red field split off on a diagonal; three link columns under small uppercase heads on the red side, the logo, phone and address right-aligned on the ink side, and a legal line under a 1px translucent white rule.

## Do's and Don'ts

### Do:
- **Do** use Signal Red (#d4001c) for every filled control and Logo Red (#fe0022) only for large marks on ink.
- **Do** set every heading in Jost 500, sentence case, with slight negative tracking (-0.015em on display and headline).
- **Do** end primary buttons on an 18px slant and keep all corners square.
- **Do** group content as ruled lists with a 2px Ink top rule and 1px dividers.
- **Do** give weight with full-width ink, steel or stone bands.
- **Do** use real operational photographs of the dogs, cut on hard diagonals.
- **Do** keep motion to the one hero wipe and short 160ms to 240ms state transitions, and honour reduced motion.

### Don't:
- **Don't** use stencil type, camouflage, glowing edges or monospaced labels.
- **Don't** add rounded corners, pill buttons or shadows on buttons, photos or panels.
- **Don't** put content in cards with backgrounds and shadows; use rules.
- **Don't** use red as a background band, section tint or decoration outside the footer split.
- **Don't** set headings or paragraphs in uppercase.
- **Don't** add scroll-triggered reveals or a second entrance animation.
- **Don't** introduce a second typeface.
