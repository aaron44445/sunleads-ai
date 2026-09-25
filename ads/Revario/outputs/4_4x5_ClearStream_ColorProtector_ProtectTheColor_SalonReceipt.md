# 4_4x5_ClearStream_ColorProtector_ProtectTheColor_SalonReceipt

| product | persona | angle | format | hook (style) | subline | tertiary |
|---|---|---|---|---|---|---|
| ClearStream 2.0 | color-protector | protect the color | Salon receipt: photo-centric, low counter-height angle; hook band top 6-22%, receipt foreground left + product right 24-82%, subline band 84-94% | You spent $285 on your color. Your shower water is fading it. (provocative) | The Revario ClearStream shower filter cuts the chlorine that strips color between appointments. | Receipt: STUDIO SALON / COLOR + TONER + GLOSS / TOTAL $285.00 · note '+ shower filter $59.99' |

- Model: Higgsfield `gpt_image_2_5`, quality high, 2k, 4:5
- Reference images (inputs/media/): crops/ref_filter_and_cartridge.png, brand/type_sheet.png (font only)
- Higgsfield job: 5f0b0955-a443-4c29-a63c-3a1f0fb7acc4 (v5, 2026-09-25. v4 72f09c79 had filter and cartridge stretched vertically from a top-down angle; re-shot at counter height. Measured h/w: filter 1.46, cartridge 1.91, cartridge/filter height 0.72)

## Prompt

```
Create 1 2K, 4:5 static image ad.

COMPOSITION: Top 6-22%: hook, centered, on a warm off-white #F3F3F3 band. 24-82%: a pale marble bathroom counter photographed from a low three-quarter angle, camera at counter height like reference image 1. Foreground left 50%: a real crumpled thermal-paper salon receipt lying flat on the counter, angled toward the camera, text readable. Right 45%, slightly behind the receipt: the ClearStream filter and cartridge from reference image 1, standing upright side by side exactly as in reference image 1. 84-94%: subline centered on the #F3F3F3 band.

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

PRODUCT: Use reference image 1. Do not regenerate, redraw, or modify the product or its printed wordmark; place it as-is. Keep the filter and cartridge at exactly the same size relative to each other as in reference image 1, scaled together as one unit.

CONSTRAINTS: single image, no logos, no URLs, receipt shows only the lines listed, product at its natural undistorted proportions.

File name: 4_4x5_ClearStream_ColorProtector_ProtectTheColor_SalonReceipt
```
