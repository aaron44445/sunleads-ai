# 3_4x5_ClearStream_LockedOutRenter_RentersLoophole_FauxTextThread

| product | persona | angle | format | hook (style) | subline | tertiary |
|---|---|---|---|---|---|---|
| ClearStream 2.0 | locked-out-renter | renter's loophole | Faux text thread: white bg; iMessage thread top 5-44%, hook 48-62%, subline 64-72%, pills bottom-left, product bottom-right | Your landlord said no to a softener. You don't have to ask about this. (direct address) | The Revario ClearStream shower filter screws onto your showerhead in 60 seconds and comes off when you move. | No tools · Fits any showerhead · Leaves with you |

- Model: Higgsfield `gpt_image_2_5`, quality high, 2k, 4:5
- Reference images (inputs/media/): crops/product_chrome_with_cartridge.png, brand/type_sheet.png (font only)
- Higgsfield job: cbbe725a-8c36-4cf2-a921-8c4dd60d64e6 (v2; v1 9df51991 had 'Revário' typo)

## Prompt

```
Create 1 2K, 4:5 static image ad.

COMPOSITION: Background white #FFFFFF. Top 5-44%: a faux iPhone text-message thread, full width with 8% margins, iOS style, no status bar. Contact name at top: "Landlord". Grey incoming and blue outgoing bubbles. 48-62%: hook, left-aligned. 64-72%: subline, left-aligned. Bottom 26%: the ClearStream filter and cartridge from reference image 1, right-aligned, standing on a pale grey #F3F3F3 floor band, soft shadow. Left of the product at 84-94%: three stacked pills.

TEXT:
Outgoing bubble: "Hey, can I install a water softener? My skin is so dry here"
Incoming bubble: "No modifications to the unit, sorry"
Hook: "Your landlord said no to a softener. You don't have to ask about this."
Subline: "The Revario ClearStream shower filter screws onto your showerhead in 60 seconds and comes off when you move."
Pills: "No tools", "Fits any showerhead", "Leaves with you".
Typography references follow.

DESIGN: Hook in Montserrat Bold font, #121212, large, "You don't have to ask" in #16943E. Subline in Montserrat Regular font, #121212. Pills in Montserrat Medium font, white text on #172830. Message bubbles in native iOS sans font. Reference image 2 is a FONT reference only, do not place it in the ad.

PRODUCT: Use reference image 1. Do not regenerate, redraw, or modify the product; place it as-is.

CONSTRAINTS: single image, no logos, no URLs. Every word spelled exactly as written above, plain English letters with no accent marks.

File name: 3_4x5_ClearStream_LockedOutRenter_RentersLoophole_FauxTextThread
```
