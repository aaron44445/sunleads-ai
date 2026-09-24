# 4_4x5_ClearStream_ColorProtector_ProtectTheColor_SalonReceipt

| product | persona | angle | format | hook (style) | subline | tertiary |
|---|---|---|---|---|---|---|
| ClearStream 2.0 | color-protector | protect the color | Salon receipt: photo-centric flat-lay; hook band top 6-22%, receipt left + product right 24-80%, subline band 84-94% | You spent $285 on your color. Your shower water is fading it. (provocative) | The Revario ClearStream shower filter cuts the chlorine that strips color between appointments. | Receipt: STUDIO SALON / COLOR + TONER + GLOSS / TOTAL $285.00 · note '+ shower filter $59.99' |

- Model: Higgsfield `gpt_image_2_5`, quality high, 2k, 4:5
- Reference images (inputs/media/): crops/product_chrome_with_cartridge.png, brand/type_sheet.png (font only)
- Higgsfield job: 72f09c79-272b-4f38-9038-6789ae9fcc5f (v4. v1/v2 misaligned itemized receipt prices, so the receipt was cut to 3 lines. v3 dropped the product wordmark)

## Prompt

```
Create 1 2K, 4:5 static image ad.

COMPOSITION: Top 6-22%: hook, centered, on a warm off-white #F3F3F3 band. 24-80%: a real crumpled thermal-paper salon receipt lying slightly angled on a pale marble bathroom counter, shot from above, occupying the left 55%. On the right 45%, the ClearStream filter and cartridge from reference image 1 standing upright on the same counter, printed ClearStream wordmark facing camera. 84-94%: subline centered on the #F3F3F3 band.

TEXT:
Hook: "You spent $285 on your color. Your shower water is fading it."
Receipt, only three printed lines, large and sparse:
"STUDIO SALON"
"COLOR + TONER + GLOSS"
"TOTAL $285.00"
Below, a blue ballpoint handwritten note, circled: "+ shower filter $59.99"
Subline: "The Revario ClearStream shower filter cuts the chlorine that strips color between appointments."
Typography references follow.

DESIGN: Hook in Montserrat Bold font, #121212, large, "fading it" in #0038D8. Subline in Montserrat Regular font, #121212. Receipt lines in monospaced thermal-printer font, faded black, left-aligned. Note in blue ballpoint handwriting. Reference image 2 is a FONT reference only, do not place it in the ad.

PHOTOGRAPHY: realistic iPhone photo, handheld, casual, slight grain, noisy natural shadows, no glare, no specular polish.

PRODUCT: Use reference image 1. Do not regenerate, redraw, or modify the product or its printed wordmark; place it as-is.

CONSTRAINTS: single image, no logos, no URLs, receipt shows only the lines listed.

File name: 4_4x5_ClearStream_ColorProtector_ProtectTheColor_SalonReceipt
```
