# Design Token Directory MINIFEST

Purpose: preserve review-only token audits extracted from the canonical sandbox prototype. The files document observed source values and are not production token definitions.

## Files

- `README.md` - directory purpose, boundaries, and update guidance.
- `MINIFEST.md` - this file inventory and current phase.
- `fonts.md` - exact typography declaration/value inventory for host styles and isolated mock-tool iframe previews, including inline styles.
- `fonts.size.md` - exact numeric font-size values and counts across host CSS, preview CSS, shorthand, and inline markup.
- `buttons.size.md` - exact host/responsive/mock-preview button sizing rules, nested icon sizes, and inline control sizes.
- `cards.size.md` - exact host and iframe card-surface/grid geometry, responsive overrides, and inline-geometry audit.
- `Sections.size.md` - exact section/container sizing, host breakpoints, and iframe-local subsection geometry.
- `Forms.size.md` - exact host form/control sizing, responsive overrides, custom radio controls, iframe controls, and inline group sizing.
- `Pages.size.md` - exact app page-shell bounds, page-width modifiers, primary layout tracks, and responsive overrides.
- `Spacing.size.md` - exact margin, padding, gap, offset, and scroll-spacing values with host/iframe/inline/JS counts.
- `border.styles.size.md` - exact border property/value pairs with host/iframe counts and explicit inline/JS coverage.
- `sidebar.styles.size.md` - exact host rail/sidebar/drawer and SQL Studio iframe styles, dimensions, responsive states, and inline patterns.
- `header.styles.size.md` - exact host/iframe header and chrome rules, responsive variants, and header-scoped inline style patterns.
- `table.styles.size.md` - exact host Teams table and isolated SQL Studio iframe table styles, dimensions, responsive cascade, and markup coverage.
- `popupModel.styles.size.md` - exact popup/modal, palette, dropdown, mobile popover, dialog, picker, toast, responsive, state, and markup coverage.
- `dropdown.styles.size.md` - exact custom workspace dropdown and authored native select control geometry, responsive states, markup, and option-popup boundary.

## Phase

- Font-token forensic audit: complete; host CSS, all 13 generated mock-tool preview styles, and inline typography were inventoried from `sandbox/index.html`. No prototype or production styles were changed.
- Font-size-token audit: complete; 23 numeric values and 310 size-bearing occurrences are reconciled across direct CSS, shorthand, and inline declarations by host/iframe scope.
- Button-size-token audit: complete; 53 applicable host rules, 17 mock rules, nested icon/accessory sizes, and inline sizing are documented by scope.
- Card-size-token audit: complete; host card surfaces/layouts and mock iframe card surfaces are recorded by scope, with 206 host and 17 iframe declarations reconciled.
- Section-size-token audit: complete; 137 host and 20 iframe geometry declarations are reconciled, with no inline section geometry.
- Form-size-token audit: complete; 67 form-specific host/iframe rule groups reconcile with zero mismatches; native control defaults and five inline preview group declarations are distinguished.
- Page-size-token audit: complete; page roots, width modifiers, shell constraints, primary grids, and responsive variants reconcile with zero mismatches.
- Spacing-token audit: complete; 222 exact property/value pairs and 642 source declarations reconcile across host CSS, all 13 preview stylesheets, inline markup, and JS offsets.
- Border-style/size audit: complete; 50 exact border property/value pairs and 327 host/iframe CSS declarations reconcile; inline and JS border declarations are absent.
- Sidebar-style/size audit: complete; 96 host rule groups (454 declarations) and 16 SQL Studio rule groups (83 declarations) reconcile; 15 rendered host inline styles are inventoried by pattern.
- Header-style/size audit: complete; 150 host rule groups (530 declarations) and 33 generated-preview rule groups (135 declarations) reconcile; 41 host inline instances across 29 patterns and two preview inline styles are recorded.
- Table-style/size audit: complete; 17 host selector blocks (38 declarations), eight host responsive declarations, and five isolated SQL Studio iframe selector blocks (22 declarations) reconcile. Literal inline and JavaScript table style assignments are absent.
- Popup-modal-style/size audit: complete; 18 workspace dropdown, 24 palette/backdrop, 13 mobile navigation, 19 shared dialog, 13 collection picker, and three toast selector blocks reconcile.
- Dropdown-style/size audit: complete; 25 custom workspace dropdown selector blocks and six native select markup instances across five authored control patterns reconcile; option-popup CSS is absent. No popup-specific inline or JavaScript geometry was found.
