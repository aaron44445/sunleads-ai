# 10_4x5_ClearStream_HardWaterTransplant_YourCitysWater_WeatherCard

| product | persona | angle | format | hook (style) | subline | tertiary |
|---|---|---|---|---|---|---|
| ClearStream 2.0 | hard-water-transplant | your city's water | Weather card: sandstone gradient; faux weather-app card 5-38%, hook 42-56%, subline 58-66%, product 68-96% on stone ledge | Moved to Phoenix and your hair turned to straw? Blame the water, not yourself. (direct address) | The Revario ClearStream shower filter installs in 60 seconds and pulls chlorine, rust and sediment out of your shower water. | Card: Phoenix, AZ / Very hard water / Hair: dry, like straw / Scalp: itchy |

- Model: Higgsfield `gpt_image_2_5`, quality high, 2k, 4:5
- Reference images (inputs/media/): crops/ref_filter_and_cartridge.png, brand/type_sheet.png (font only)
- Higgsfield job: aa95170e-a1a6-419c-9991-5add5a2de4f7 (v2; v1 a70ea9a6 had a stray mark over 'hair')

## Prompt

```
Create 1 2K, 4:5 static image ad.

COMPOSITION: Background warm sandstone gradient from #F3E3CF at top to #E7C9A5 at bottom. Top 5-38%: a faux phone weather-app card, rounded corners, frosted white at 80% opacity, 8% margins. Card top-left: city name; big drop icon on the right; one large status line; two small rows below. 42-56%: hook, left-aligned. 58-66%: subline, left-aligned. Bottom 68-96%: the ClearStream filter and cartridge from reference image 1, right of center, on a pale stone ledge with soft shadow.

TEXT:
Card city: "Phoenix, AZ"
Card status: "Very hard water"
Card rows: "Hair: dry, like straw" and "Scalp: itchy"
Hook: "Moved to Phoenix and your hair turned to straw? Blame the water, not yourself."
Subline: "The Revario ClearStream shower filter installs in 60 seconds and pulls chlorine, rust and sediment out of your shower water."
Typography references follow.

DESIGN: Card in clean neutral sans font, #121212, status line bold. Hook in Montserrat Bold font, #121212, large, "not yourself" in #0038D8. Subline in Montserrat Regular font, #121212. Reference image 2 is a FONT reference only, do not place it in the ad.

PRODUCT: Use reference image 1. Do not regenerate, redraw, or modify the product; place it as-is. Keep the filter and cartridge at exactly the same size relative to each other as in reference image 1, scaled together as one unit.

CONSTRAINTS: single image, no logos, no URLs, clean letterforms with no stray marks or accents.

File name: 10_4x5_ClearStream_HardWaterTransplant_YourCitysWater_WeatherCard
```
