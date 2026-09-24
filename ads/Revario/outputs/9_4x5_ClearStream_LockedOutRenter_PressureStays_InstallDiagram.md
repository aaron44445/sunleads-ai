# 9_4x5_ClearStream_LockedOutRenter_PressureStays_InstallDiagram

| product | persona | angle | format | hook (style) | subline | tertiary |
|---|---|---|---|---|---|---|
| ClearStream 2.0 | locked-out-renter | pressure stays | Install diagram: white/tile bg; hook 5-20%, subline 22-29%, vertical exploded arm → filter → showerhead with 3 aligned callouts | Worried a shower filter will kill your water pressure? (rhetorical question) | The Revario ClearStream is flow-through with no restrictor, so most people notice no change in their spray. | Your shower arm · ClearStream screws on here · Your same showerhead |

- Model: Higgsfield `gpt_image_2_5`, quality high, 2k, 4:5
- Reference images (inputs/media/): crops/ref_filter_and_cartridge.png (filter only), brand/type_sheet.png (font only)
- Higgsfield job: d2271de5-7ed5-4829-bfbb-d08aa4f60172 (v2; v1 40b69d2b had misaligned callouts)

## Prompt

```
Create 1 2K, 4:5 static image ad.

COMPOSITION: Background white #FFFFFF with faint white subway tile on the right half. Top 5-20%: hook, left-aligned, 7% margins, full width. 22-29%: subline, left-aligned, full width, no lines touching it. Below, a vertical exploded install diagram centered at 62% of the width:
- 33-45% height: a plain chrome shower arm coming out of the wall, pointing down.
- dashed #172830 down arrow.
- 50-70% height: the ClearStream filter from reference image 1, upright.
- dashed #172830 down arrow.
- 76-84% height: a plain round chrome showerhead, gentle full water spray below it to the bottom edge.
Left column callouts, each on the same height as its object with one thin horizontal leader line ending at that object: at 39% "Your shower arm", at 60% "ClearStream screws on here", at 80% "Your same showerhead".

TEXT:
Hook: "Worried a shower filter will kill your water pressure?"
Subline: "The Revario ClearStream is flow-through with no restrictor, so most people notice no change in their spray."
Typography references follow.

DESIGN: Hook in Montserrat Bold font, #121212, large, "water pressure" in #0038D8. Subline in Montserrat Regular font, #121212. Callouts in Montserrat Medium font, #172830. Reference image 2 is a FONT reference only, do not place it in the ad.

PRODUCT: Use only the filter housing from reference image 1; the loose cartridge is not shown. Do not regenerate, redraw, or modify the filter; place it as-is.

CONSTRAINTS: single image, no logos, no URLs, exactly three callouts.

File name: 9_4x5_ClearStream_LockedOutRenter_PressureStays_InstallDiagram
```
