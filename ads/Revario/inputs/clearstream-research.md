# ClearStream™ 2.0 — Research (source of truth)

Link: https://revario.co/products/20-stage-shower-filter-for-hard-water-fits-any-showerhead
Researched 2026-09-24 from the PDP, the product JSON, theme CSS, web testing sources and the Meta ad library (TrendTrack).

## Overview
- **What it is:** a 20-stage inline shower filter. It screws on between the shower arm and the showerhead you already own.
- **Who it's for:** people in hard-water, chlorinated-municipal-water homes whose hair and skin feel worse since they moved or since the water changed. Renters are an especially good fit.
- **How it works:** water passes through four media zones before reaching the head:
  - Stages 1–4, sediment: rust, grit, pipe debris
  - Stages 5–10, KDF-55: chlorine, dissolved lead, mercury
  - Stages 11–17, mineral/alkaline: moves pH back toward neutral
  - Stages 18–20, final polish: fine sediment
- **Unique mechanism:** 20 staged media, where every stage does one job, and **the cartridge is visible proof**. It starts white and turns orange-brown as it captures sediment and metals.
- **Why people buy:** hard water, hair and skin that feel worse, easy install, and it looks good in the shower.

## Details
- Standard ½" NPT thread. Fits fixed, handheld and rain heads. Doesn't fit tub spouts or European bar-rail systems.
- No tools. The PDP says install takes about 60 seconds, or "about two minutes" including the flush. Reversible in 60 s.
- Flow-through housing, so it isn't designed to restrict flow. A filter can't raise pressure, and an overdue cartridge slows flow.
- Cartridge life: FAQ says ~6 months or ~10,000 gal for 2 people, and 3–4 months for 4 people. **The product description says 3 months. This conflicts.**
- Finishes: Black, Brushed Nickel, Oil Rubbed Bronze, Chrome
- Price $59.99, compare-at $119.99, "Save 50%", "Sale Ends Today". Free shipping. $4.95 optional shipping protection.
- 60-day guarantee: refund with no return required. 1-yr warranty, 2-yr with 2+ filters. Kaching Bundles app installed, so quantity bundles exist.
- Materials of the housing: Unknown.

## Selling points
| Feature | Functional benefit | Emotional benefit |
|---|---|---|
| Removes chlorine + sediment + metals | Less chlorine and grit on hair and skin | "It's the water, not me." Relief from self-blame |
| Visible cartridge discoloration | You can see what it caught | Proof, not faith. Mildly satisfying and gross |
| Screws onto any ½" arm, no tools | 60-second install, keep your showerhead | No plumber, no landlord permission |
| Reversible | Take it with you when you move | Renter-safe, zero commitment |
| Four finishes | Matches existing fixtures | Doesn't look like a cheap plastic add-on |
| Refund, no return | Zero-risk trial | Safe to try even as a skeptic |
| Honest FAQ ("not a softener") | Sets real expectations | Trust in a category of overclaims |

## Claim rules (hard)
- **Never say it softens water or removes hardness.** It doesn't, and the brand's FAQ says so.
- **No "99% chlorine"** in ads. KDF performance degrades with hot water and time. One independent real-world test of a KDF filter measured 54%.
- **No chloramine claim.** KDF media does little against it.
- **No health or skin-condition claims** (eczema, hair loss, cancer). Keep to how hair and skin *feel*.
- **Don't reuse store images 03–06.** They are AI-generated before/after people. No "Dermatologist Recommended" or "Lab tested" badges without a document behind them.
- No "50% off" or countdowns in the creative.

## Market
- Category is crowded: Jolie, AquaBliss, Canopy, Santevia, Hello Klean, Primals, and many Amazon $20–40 units.
- **Sophistication: stage 4–5.** Direct claims ("removes chlorine") and mechanisms ("15-stage", "vitamin C") are exhausted. Winning ads now compete on a better/visible mechanism (Hello Klean's filter-life tracker) or identity/experience (Primals' "ritual", advertorial stories).
- Consumer skepticism is high. Testing sites publicly debunk softening claims and pressure drops.

## Competitors
| Competitor | Price | Their differentiation | Ours |
|---|---|---|---|
| Jolie | ~$165 | Design-led showerhead, influencer status | $60, keep your own head, not a whole new fixture |
| AquaBliss SF100 | ~$30–40 | Cheap, Amazon bestseller, 12–15 stage | Finishes, honest positioning, no-return refund |
| Canopy | ~$85+ | Aesthetic, vitamin C, subscription | Four metal finishes, no subscription required |
| Santevia | Unknown | All-metal, refillable, "adds magnesium" | Visible cartridge proof, 60-s install |
| Hello Klean | Unknown | Filter-life tracking light | Cartridge itself is the tracker. You can see it darken |
| Primals | Unknown | Fear/news creative, shower-ritual bundle | Calm, honest tone instead of fear |

## Branding
| Use | Hex |
|---|---|
| Primary / text (ink) | `#121212` |
| Primary dark (buttons, links) | `#172830` |
| Background | `#FFFFFF`, `#F3F3F3` |
| Accent (CTA green) | `#16943E` |
| Product-mark blue ("Stream") | `#0038D8` (sampled from imagery) |
| Proof tone (used cartridge) | `#8A5A24` |

- **Fonts:** Montserrat is the only family on the site (`--font-heading-family` and `--font-body-family`).
  - H1/hook: Montserrat Bold 700 (ExtraBold 800 for heavy hooks)
  - H2/subline: Montserrat Bold 700
  - Body: Montserrat Regular 400
  - Tertiary/pills: Montserrat Medium 500
  - Type sheet: `inputs/media/brand/type_sheet.png`. Font files are in the same folder.
- **Case:** sentence case headings, e.g. "20 stages. Not 5. Not 10." / "On in about two minutes". Short declarative sentences ending in periods.
- **Punctuation:** periods for rhythm, no exclamation marks in the brand's own copy, curly apostrophes.
- **Layout feel:** clean white/grey, lots of air, dark slate accents.
- **Tone:** plain, dry, candid, second person. "Nobody treats it to be pleasant to stand under." "Two things worth being straight about." "If you can change a lightbulb, you can do this."
- **Logo:** `inputs/media/brand/revario-logo.png`, lowercase `revario.` in #1E1E1E.

## Media
- `media/store/`: the 8 store images. **All appear AI-rendered** (`ChatGPT_Image_…` filenames) and have baked-in text.
- `media/crops/`: product-only crops cut from them:
  - `product_chrome_with_cartridge.png`
  - `cartridge_new.png`
  - `cartridge_used.png` (an AI render. Don't present it as a customer's result)
- **Missing:** real photos of the shipped unit per finish, and a real used cartridge. Replace crops when they arrive.

## Reviews analysis
- **Count / rating / distribution: Unknown.** No review app is installed. "1,429 Reviews" and "4,000+ Happy Customers" are static theme text, and only 6 on-site quotes exist (`reviews.csv`). Verbatims below from off-site sources are marked (category).

| Theme | Insight | Verbatim |
|---|---|---|
| Physical pains | Hair texture collapses in hard-water cities | "my hair turned to straw" (category) · "scalp itched every morning" (category) |
| Emotional pains | Self-blame and wasted money on products | color-treated hair "immediately went off a cliff" after moving (category) |
| Desired outcomes | Water that feels better, easy upgrade | "The water feels noticeably better" (Sarah M.) · "My hair and skin feel so much better after showering." (Emily T.) |
| Reasons to buy | Hard water, price, looks, easy install | "Bought this mainly because our water is pretty hard… especially for the price." (Chris W.) · "Installation was way easier than I expected." (Amanda P.) · "It blends right into my shower" (Lauren B.) |
| Objections | Pressure loss, no noticeable difference, fit, scam | "weaker spray than expected" (category) → flow-through FAQ · "didn't notice a difference" (category) → refund, keep the filter · "didn't fit" (category) → ½" NPT, any head |
| Spontaneous insight | People notice their hair is better away from home | "my hair looks and feels nicer on vacation in other cities, I guess it's the water" (category) |
