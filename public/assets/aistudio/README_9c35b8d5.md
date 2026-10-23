# Sandbox Design Tokens

This directory holds review-only design-token extractions from the canonical `sandbox/index.html` prototype. These documents describe observed prototype values; they are not production token definitions and do not authorize copying prototype styling into the application.

## Files

- `fonts.md` - exhaustive typography declaration/value inventory for host styles and generated mock-tool iframe previews, including literal inline typography.
- `fonts.size.md` - standalone exact font-size inventory, including values inside shorthand and inline markup with per-scope occurrence counts.
- `buttons.size.md` - exact button hit-area, padding, responsive, icon, and mock-preview sizing declarations by selector.
- `cards.size.md` - exact card surfaces, card-grid constraints, responsive geometry, modal frames, and isolated mock-preview surfaces.
- `Sections.size.md` - exact page/section bounds, spacing, layout tracks, responsive overrides, and iframe subgroup dimensions.
- `Forms.size.md` - form/control layout and dimensions, responsive states, mock-tool controls, and inline control-group sizing.
- `Pages.size.md` - page-shell bounds, page-specific maximum widths, primary layout tracks, and responsive page geometry.
- `Spacing.size.md` - exact host/iframe spacing property-value tokens with CSS, responsive, inline, and JS-offset counts.
- `border.styles.size.md` - exact host/iframe border properties and values, including widths, styles, colors, radii, responsive rules, and counts.
- `sidebar.styles.size.md` - host activity rail, activity-specific sidebar/drawer styles, responsive states, inline styles, and SQL Studio's isolated iframe sidebar.
- `header.styles.size.md` - exact host and generated-preview header/chrome declarations, responsive rules, and scoped inline styles.
- `table.styles.size.md` - exact host Teams table and isolated SQL Studio iframe table styles, dimensions, responsive cascade, and markup coverage.
- `popupModel.styles.size.md` - exact popup/modal, palette, dropdown, mobile popover, dialog, picker, toast, responsive, state, and markup coverage.
- `dropdown.styles.size.md` - exact custom workspace dropdown and all authored native select control geometry, responsive states, markup, and option-popup boundary.
- `MINIFEST.md` - inventory and scope/status for this directory.

Update the relevant extraction when the canonical sandbox source changes. Keep host and isolated iframe values distinct, preserve source values exactly, and update this inventory when files or scope change.
