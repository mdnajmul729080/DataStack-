# Sandbox Button-Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This is a review-only inventory of source-authored sizing for button controls. It does not change the prototype or production styles.

The extraction matched button elements rendered by host navigation, sidebars, tabs, views, dialogs, runner controls, and conditional team actions; it also parsed the generated button markup/styles for all 13 mock-tool previews. Responsive CSS rules are included even when their media query is not active in the current browser. Host and iframe scopes remain separate.

Sizing scope includes button box constraints, padding and gaps, flex sizing, button font sizing, border radius, associated active-state marks, and direct child SVG icon dimensions. Global reset values and button inline sizing are included. Other child content typography is covered by [`fonts.md`](fonts.md) and [`fonts.size.md`](fonts.size.md), not repeated here.

## Host Button Rules

Values below are copied from the source declarations; selector order and media conditions distinguish base rules from overrides. `font:inherit` is an inherited sizing instruction, not a fixed dimension.

| Selector                         | Exact size-related declarations                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `*`                              | `box-sizing:border-box; margin:0; padding:0`                                                                        |
| `.workspace-selector-btn`        | `max-width:180px; gap:5px; padding:4px 6px; border-radius:5px; font:inherit`                                        |
| `.workspace-menu-select`         | `min-width:0; min-height:28px; flex:1; gap:7px; padding:4px 6px; border-radius:4px; font:inherit; font-size:11.5px` |
| `.workspace-menu-icon`           | `width:24px; height:24px; flex:none; border-radius:4px`                                                             |
| `.workspace-menu-action`         | `width:100%; min-height:32px; gap:8px; padding:5px 8px; border-radius:4px; font:inherit; font-size:11.5px`          |
| `.titlebar-theme-toggle`         | `width:32px; height:32px; flex:none; border-radius:6px`                                                             |
| `.titlebar-search`               | `height:32px; gap:8px; border-radius:6px; padding:0 10px; font-size:11.5px`                                         |
| `.titlebar-menu-toggle`          | `width:32px; height:32px; border-radius:6px`                                                                        |
| `.mobile-nav-item`               | `width:100%; min-height:34px; gap:8px; padding:6px 8px; border-radius:4px; font:inherit; font-size:12px`            |
| `.act-btn`                       | `width:38px; height:38px; border-radius:9px`                                                                        |
| `.act-btn.active::before`        | `width:3px; height:20px; border-radius:0 3px 3px 0`                                                                 |
| `.act-btn::after`                | `padding:5px 9px; border-radius:5px; font-size:11.5px`                                                              |
| `.avatar`                        | `width:30px; height:30px; border-radius:50%; font-size:11.5px`                                                      |
| `.side-item`                     | `width:100%; min-height:32px; gap:8px; padding:5px 7px; border-radius:5px; font-size:12.5px`                        |
| `.route-nav-btn`                 | `gap:6px`                                                                                                           |
| `.fav-item`                      | `width:100%; gap:8px; padding:6px 8px; border-radius:5px; font:inherit`                                             |
| `.tab-close`                     | `width:18px; height:18px; border-radius:4px`                                                                        |
| `.workspace-starter`             | `min-height:90px; gap:11px; padding:13px; border-radius:7px`                                                        |
| `.workspace-stack-button`        | `padding:4px 6px; border-radius:4px; font:inherit; font-size:9.5px`                                                 |
| `.workspace-sidebar-item`        | `width:100%; min-height:30px; gap:7px; padding:5px 7px; border-radius:5px; font:inherit; font-size:11.5px`          |
| `.team-member-actions .icon-btn` | `width:27px; height:27px`                                                                                           |
| `.collection-item`               | `width:100%; font:inherit`                                                                                          |
| `.collection-card`               | `min-height:64px; gap:10px; padding:10px; border-radius:6px; font:inherit`                                          |
| `.collection-tool-main`          | `min-width:0; flex:1; gap:9px; padding:0; font:inherit`                                                             |
| `.collection-add-actions .btn`   | `flex:none`                                                                                                         |
| `.tc-play`                       | `width:26px; height:26px; border-radius:6px; margin-left:auto`                                                      |
| `.btn`                           | `height:32px; gap:7px; padding:0 14px; border-radius:7px; font-size:12.5px`                                         |
| `.btn.sm`                        | `height:27px; padding:0 10px; font-size:11.5px`                                                                     |
| `.icon-btn`                      | `width:30px; height:30px; border-radius:7px`                                                                        |
| `.back-btn`                      | `gap:6px; padding:4px 0; font-size:12.5px; margin-bottom:20px`                                                      |
| `.rv-name`                       | `padding:0; font-size:12.5px`                                                                                       |
| `.rv-foot button`                | `padding:0; font-size:11.5px`                                                                                       |
| `.review-rating-options button`  | `width:26px; height:26px; padding:0; border-radius:4px`                                                             |
| `.review-compose-footer .btn`    | `height:28px; padding-inline:11px; font-size:11.5px`                                                                |
| `.profile-back`                  | `margin-bottom:14px`                                                                                                |
| `.profile-side-link`             | `min-height:30px; font-size:11.5px`                                                                                 |
| `.profile-tool`                  | `width:100%; gap:10px; padding:9px; border-radius:7px`                                                              |

## Host Responsive Overrides

All overrides below are under `@media (max-width:640px)` and retain source order. Where a selector repeats `min-height`, the later declaration wins at this breakpoint.

| Selector                                       | Exact size-related declarations                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `.workspace-selector-btn`                      | `max-width:104px; padding-inline:5px`                                                      |
| `.titlebar-search`                             | `width:34px; height:34px; padding:0; border-radius:8px`                                    |
| `.titlebar-theme-toggle`                       | `width:34px; height:34px; border-radius:8px`                                               |
| `.act-btn`                                     | `flex:1 1 0; width:auto; min-width:0; height:52px; gap:3px; border-radius:7px`             |
| `.act-btn::after`                              | `padding:0; font-size:9.5px`                                                               |
| `.act-btn.active::before`                      | `width:18px; height:3px; border-radius:0 0 3px 3px`                                        |
| `.avatar`                                      | `flex:0 0 32px; width:30px; height:30px`                                                   |
| `.runner-actions .icon-btn`                    | `width:26px; height:30px; flex:0 0 26px`                                                   |
| `.detail-actions .btn`                         | `height:32px; min-width:0; padding-inline:8px; font-size:11px`                             |
| `.workspace-starter`                           | First override: `min-height:68px`; later override: `min-height:60px; padding:9px; gap:7px` |
| `.profile-actions .btn`                        | `flex:1; min-width:0; height:30px; padding-inline:8px; font-size:11px`                     |
| `.workspace-control-actions .btn`              | `min-height:30px; padding-inline:7px; font-size:10px`                                      |
| `.team-member-actions .icon-btn`               | `width:24px; height:24px`                                                                  |
| `.team-access-share .btn`                      | `padding-inline:7px; font-size:9.5px`                                                      |
| `.settings-section .profile-form-actions .btn` | `flex:1; min-width:0; padding-inline:6px; font-size:9.5px`                                 |

## Button Content And Icons

These rules size icons within buttons, separately from the button hit area. `icon()` also writes explicit equal width/height attributes into generated SVG markup.

| Selector                     | Exact size declarations                                                    |
| ---------------------------- | -------------------------------------------------------------------------- |
| `.workspace-menu-icon svg`   | `width:13px; height:13px`                                                  |
| `.workspace-menu-action svg` | `width:14px; height:14px`                                                  |
| `.titlebar-theme-toggle svg` | `width:15px; height:15px`                                                  |
| `.titlebar-search svg`       | `width:14px; height:14px`                                                  |
| `.titlebar-menu-toggle svg`  | `width:16px; height:16px`                                                  |
| `.mobile-nav-item svg`       | `width:15px; height:15px`                                                  |
| `.act-btn svg`               | Base: `width:21px; height:21px`; phone override: `width:20px; height:20px` |
| `.profile-side-link svg`     | `width:15px; height:15px`                                                  |

Equal SVG width/height attributes present in rendered host button markup use these exact values: `10px`, `11px`, `12px`, `13px`, `14px`, `15px`, `16px`, `17px`, and `20px`. CSS overrides the activity icon attribute to `21px` on desktop and `20px` on phones.

Button-adjacent text sizing that affects control content is separately declared by `.titlebar-search kbd` (`font-size:9.5px; padding:2px 4px; border-radius:4px`), `.workspace-starter kbd` (`font-size:9px; padding:2px 5px; border-radius:4px`), and `.route-badge` (`font-size:9px; padding:1px 5px; border-radius:4px`). The controls inherit their surrounding font where the rule says `font:inherit`.

### Nested Button Content Sizing

These child rules set fixed dimensions or spacing for content inside a button. Child font sizes are already recorded in the font inventories.

| Selector                                                                            | Exact size-related declarations                                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `.workspace-menu-check`                                                             | `width:14px; flex:none`                                                                            |
| `.act-badge`                                                                        | `min-width:14px; height:14px; border-radius:7px; padding:0 3px`                                    |
| `.route-arrow`, `.route-card-arrow`                                                 | `flex:none`                                                                                        |
| `.route-nav-btn>svg:last-child`, `.route-badge svg`, `.profile-tool>svg:last-child` | `flex:none`                                                                                        |
| `.route-badge`                                                                      | `gap:3px; padding:1px 5px; border-radius:4px`                                                      |
| `.side-item .count`                                                                 | `padding:1px 6px; border-radius:9px`                                                               |
| `.fav-glyph`                                                                        | `width:26px; height:26px; border-radius:6px`                                                       |
| `.workspace-starter-icon`                                                           | `width:32px; height:32px; flex:none; border-radius:6px`; phone override: `width:28px; height:28px` |
| `.workspace-starter kbd`                                                            | `flex:none; padding:2px 5px; border-radius:4px`                                                    |
| `.workspace-sidebar-item svg`                                                       | `flex:none`                                                                                        |
| `.workspace-sidebar-item span`                                                      | `min-width:0; flex:1`                                                                              |
| `.workspace-sidebar-item small`                                                     | `flex:none`                                                                                        |
| `.collection-card-mark`                                                             | `width:32px; height:32px; flex:none; border-radius:5px`                                            |
| `.collection-card-copy`, `.collection-tool-copy`, `.profile-tool-copy`              | `min-width:0; flex:1`                                                                              |
| `.tc-glyph`                                                                         | `width:40px; height:40px; border-radius:9px`                                                       |
| `.profile-tool .fav-glyph`                                                          | `width:32px; height:32px`                                                                          |
| `.workspace-selector-label`                                                         | Phone override: `max-width:72px`                                                                   |

## Mock-Tool Button Rules

Each preview document is isolated from host styles. `*` sets `box-sizing:border-box` in all 13 generated preview documents. Only these preview documents author button-specific box sizing; other previews use browser-native button defaults.

| Preview             | Selector              | Exact size-related declarations                                  |
| ------------------- | --------------------- | ---------------------------------------------------------------- |
| JSON Formatter      | `button`              | `padding:6px 14px; border-radius:6px; font-size:13px`            |
| Password Generator  | `button`              | `padding:10px 16px; border-radius:10px; font-size:13px`          |
| Password Generator  | second `button.ghost` | Inline `width:100%`; its `.ghost` rule changes color only        |
| Text Case Converter | `button`              | `padding:8px 14px; border-radius:8px; font-size:13px`            |
| SQL Studio          | `.btn`                | `padding:7px 14px; border-radius:6px; font-size:12.5px; gap:5px` |

The named preview rules apply to every button in that document (`button.ghost` inherits the Password Generator base button sizing). `genericToolDoc()` and the other preview documents define no button-specific dimensions.

## Literal Inline Button Sizing

| Scope                      | Button                                    | Exact inline declaration |
| -------------------------- | ----------------------------------------- | ------------------------ |
| Host                       | Collections sidebar New collection action | `margin-top:6px`         |
| Password Generator preview | Generate new password                     | `width:100%`             |

## Coverage Notes

- Extracted the raw CSS declaration text after matching actual button classes from all host views, menus, dialogs, tabs, tool details, runner headers, and conditional team-member actions. This preserves source shorthands such as `padding`, `font`, `flex`, and `border-radius` rather than CSSOM-expanded longhands.
- Included the responsive phone overrides, associated active-state marks, child SVG CSS/attributes, and the two literal inline size declarations.
- Native browser defaults are not assigned invented token values. Seven generated preview documents contain no authored button geometry and therefore rely on their isolated document's browser defaults.
- This file inventories source values only; it does not propose a shared production button system. Refresh it whenever button markup or sizing in `sandbox/index.html` changes.
