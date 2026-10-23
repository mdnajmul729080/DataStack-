# Sandbox Card-Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This is a review-only inventory of card and card-like surface geometry; it does not modify prototype or production styling.

The inventory keeps host workbench CSS separate from generated mock-tool iframe CSS. It covers outer surface dimensions, parent grid tracks/gaps that determine card size, padding and margins, border thickness/radii, and responsive overrides. Text typography is recorded in [`fonts.md`](fonts.md) and [`fonts.size.md`](fonts.size.md), not repeated here. Colors and shadows are not size tokens.

## Host Page Bounds And Card Grids

| Selector                  | Exact size declarations                                                       |
| ------------------------- | ----------------------------------------------------------------------------- |
| `.page`                   | `max-width:1280px; padding:26px 30px 40px`                                    |
| `.workspace-page`         | `max-width:1160px`                                                            |
| `.teams-page`             | `max-width:1040px`                                                            |
| `.team-subpage`           | `max-width:760px`                                                             |
| `.profile-page`           | `max-width:1080px`                                                            |
| `.settings-page`          | `max-width:900px`                                                             |
| `.tool-grid`              | `grid-template-columns:repeat(auto-fill,minmax(252px,1fr)); gap:12px`         |
| `.workspace-main-grid`    | `grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr); gap:14px`        |
| `.workspace-starter-grid` | `grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-bottom:22px` |
| `.workspace-dock-grid`    | `grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:8px`          |
| `.collection-card-grid`   | `grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:9px`          |
| `.team-bottom-grid`       | `grid-template-columns:minmax(0,1.15fr) minmax(250px,.85fr); gap:12px`        |
| `.profile-stats`          | `grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; margin-bottom:18px` |
| `.profile-columns`        | `grid-template-columns:minmax(0,1.3fr) minmax(240px,.7fr); gap:16px`          |

## Host Card Surfaces

Values are literal source declarations. Where one surface has both a border and radius, both are listed to preserve the complete frame geometry.

| Surface                        | Exact size declarations                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.workspace-hero`              | `gap:20px; padding:22px 24px; margin-bottom:18px; border:1px solid var(--border); border-radius:8px`                                                     |
| `.workspace-hero.is-populated` | `padding:14px 18px; margin-bottom:12px`                                                                                                                  |
| `.workspace-control-strip`     | `gap:10px; padding:10px 12px; margin-bottom:18px; border:1px solid var(--border); border-radius:7px`                                                     |
| `.workspace-starter`           | `min-height:90px; gap:11px; padding:13px; border:1px solid var(--border); border-radius:7px`                                                             |
| `.workspace-starter-icon`      | `width:32px; height:32px; flex:none; border-radius:6px`                                                                                                  |
| `.workspace-dock-card`         | `min-width:0; gap:9px; padding:10px; border:1px solid var(--border); border-radius:7px`                                                                  |
| `.workspace-dock-glyph`        | `width:30px; height:30px; border-radius:6px`                                                                                                             |
| `.workspace-empty`             | `padding:20px 16px; border:1px dashed var(--border-strong); border-radius:7px`                                                                           |
| `.workspace-sidebar-card`      | `padding:10px; margin:0 2px 8px; border:1px solid var(--border); border-radius:6px`                                                                      |
| `.team-members-panel`          | `min-width:0; margin-bottom:14px; border:1px solid var(--border); border-radius:7px; overflow:hidden`                                                    |
| `.team-panel-head-inset`       | `padding:14px 14px 0`                                                                                                                                    |
| `.team-panel-head`             | `gap:10px; margin-bottom:12px`                                                                                                                           |
| `.team-empty`                  | `padding:15px; border:1px dashed var(--border-strong); border-radius:6px`                                                                                |
| `.team-panel`                  | `min-width:0; padding:14px; border:1px solid var(--border); border-radius:7px`                                                                           |
| `.tool-card`                   | `border:1px solid var(--border); border-radius:10px; padding:14px`                                                                                       |
| `.collection-card`             | `gap:10px; min-height:64px; padding:10px; border:1px solid var(--border); border-radius:6px`                                                             |
| `.collection-card-mark`        | `width:32px; height:32px; flex:none; border-radius:5px`                                                                                                  |
| `.collection-tool-card`        | `gap:8px; padding:10px`                                                                                                                                  |
| `.collection-add-tools`        | `gap:10px; margin-top:14px; padding:12px; border:1px solid var(--border); border-radius:7px`                                                             |
| `.collection-add-options`      | `grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px; max-height:220px; padding:1px; overflow-y:auto`                                                 |
| `.collection-add-option`       | `min-width:0; min-height:40px; gap:8px; padding:6px 8px; border:1px solid var(--border); border-radius:5px`                                              |
| `.collection-add-count`        | `padding:3px 6px; border-radius:4px`                                                                                                                     |
| `.collection-empty`            | `padding:14px; border:1px dashed var(--border-strong); border-radius:6px`                                                                                |
| `.detail-hero`                 | `display:flex; gap:20px; margin-bottom:28px`                                                                                                             |
| `.review`                      | `border:1px solid var(--border); border-radius:9px; padding:13px 15px`                                                                                   |
| `.review-replies`              | `gap:7px; margin:9px 0 0 38px`                                                                                                                           |
| `.review-reply`                | `padding:8px 9px; border-left:2px solid var(--accent)`                                                                                                   |
| `.review-composer`             | `margin:0 0 12px; padding:12px; border:1px solid var(--border); border-radius:7px`                                                                       |
| `.review-empty`                | `padding:12px; border:1px dashed var(--border-strong); border-radius:7px`                                                                                |
| `.profile-side-card`           | `gap:8px; padding:8px 6px 10px; border-bottom:1px solid var(--border); margin-bottom:4px`                                                                |
| `.profile-hero`                | `grid-template-columns:56px minmax(0,1fr) auto; gap:10px 14px; border:1px solid var(--border); border-radius:8px; padding:14px 16px; margin-bottom:14px` |
| `.profile-avatar`              | `width:56px; height:56px; flex:0 0 56px; border:2px solid var(--bg-main)`                                                                                |
| `.profile-stat`                | `border:1px solid var(--border); border-radius:8px; padding:13px`                                                                                        |
| `.profile-panel`               | `min-width:0; border:1px solid var(--border); border-radius:9px; padding:16px; margin-bottom:14px`                                                       |
| `.profile-panel-head`          | `gap:10px; margin-bottom:12px`                                                                                                                           |
| `.profile-tool`                | `width:100%; gap:10px; border:1px solid var(--border); border-radius:7px; padding:9px`                                                                   |
| `.profile-review`              | `border:1px solid var(--border); border-radius:7px; padding:12px`                                                                                        |

## Host Framed Overlays And Notices

Dialogs and notices are documented separately from content cards because their viewport anchoring differs.

| Surface                    | Exact size declarations                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.prototype-dialog`        | `position:fixed; inset:0; margin:auto; width:min(520px,calc(100vw - 28px)); max-height:min(82dvh,680px); padding:0; overflow:auto; border:1px solid var(--border-strong); border-radius:8px` |
| `.workspace-create-dialog` | `width:min(440px,calc(100vw - 28px))`                                                                                                                                                        |
| `.prototype-modal-head`    | `gap:12px; padding:14px 16px; border-bottom:1px solid var(--border)`                                                                                                                         |
| `.prototype-modal-fields`  | `gap:11px; padding:14px 16px`                                                                                                                                                                |
| `.prototype-modal-foot`    | `gap:7px; padding:11px 16px; border-top:1px solid var(--border)`                                                                                                                             |
| `.toast`                   | `max-width:300px; padding:10px 14px; border:1px solid var(--border-strong); border-left:3px solid var(--accent); border-radius:7px`                                                          |
| `.offline-banner`          | `gap:9px; padding:9px 14px; border:1px solid var(--warning-border); border-radius:8px; margin-bottom:20px`                                                                                   |

## Host Responsive Overrides

The 860px and 640px breakpoints are separate source scopes. At 640px, later declarations override earlier declarations where noted.

| Selector                       | Media condition   | Exact size declarations                                                                                                                    |
| ------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `.workspace-main-grid`         | `max-width:860px` | `grid-template-columns:minmax(0,1fr)`                                                                                                      |
| `.workspace-starter-grid`      | `max-width:640px` | First: `grid-template-columns:minmax(0,1fr); gap:7px`; later: `grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px; margin-bottom:14px` |
| `.workspace-hero`              | `max-width:640px` | `padding:16px`                                                                                                                             |
| `.workspace-hero.is-populated` | `max-width:640px` | First: `padding:12px 14px`; later: `padding:10px 12px; margin-bottom:8px`                                                                  |
| `.workspace-control-strip`     | `max-width:640px` | `gap:8px; padding:8px 10px; margin-bottom:10px`                                                                                            |
| `.workspace-starter`           | `max-width:640px` | First: `min-height:68px`; later: `min-height:60px; padding:9px; gap:7px`                                                                   |
| `.workspace-starter-icon`      | `max-width:640px` | `width:28px; height:28px`                                                                                                                  |
| `.workspace-starter-stacks`    | `max-width:640px` | `min-height:64px`                                                                                                                          |
| `.workspace-dock-grid`         | `max-width:640px` | `grid-template-columns:minmax(0,1fr)`                                                                                                      |
| `.workspace-dock-card`         | `max-width:640px` | `padding:8px`                                                                                                                              |
| `.team-bottom-grid`            | `max-width:640px` | `grid-template-columns:minmax(0,1fr)`                                                                                                      |
| `.team-members-panel`          | `max-width:640px` | `margin-bottom:10px`                                                                                                                       |
| `.team-panel-head-inset`       | `max-width:640px` | `padding:10px 10px 0`                                                                                                                      |
| `.team-panel-head`             | `max-width:640px` | `gap:8px; margin-bottom:8px`                                                                                                               |
| `.team-panel`                  | `max-width:640px` | `padding:12px`                                                                                                                             |
| `.tool-grid`                   | `max-width:640px` | `grid-template-columns:1fr`                                                                                                                |
| `.collection-add-options`      | `max-width:640px` | `grid-template-columns:minmax(0,1fr)`                                                                                                      |
| `.detail-hero`                 | `max-width:640px` | `grid-template-columns:52px minmax(0,1fr); gap:12px; margin-bottom:22px`                                                                   |
| `.profile-hero`                | `max-width:640px` | `grid-template-columns:48px minmax(0,1fr); padding:12px; gap:8px 11px`                                                                     |
| `.profile-avatar`              | `max-width:640px` | `width:48px; height:48px; flex-basis:48px`                                                                                                 |
| `.profile-stats`               | `max-width:640px` | `grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px`                                                                                   |
| `.profile-stat`                | `max-width:640px` | `padding:10px`                                                                                                                             |
| `.profile-columns`             | `max-width:640px` | `grid-template-columns:1fr; gap:0`                                                                                                         |
| `.profile-panel`               | `max-width:640px` | `padding:13px`                                                                                                                             |

## Mock-Tool Framed Surfaces

Iframe styles are local to each preview and do not inherit host card sizing.

| Preview scope                                                                                                                                           | Surface                     | Exact size declarations                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| Generic mock previews: Base64 Encoder, Image Compressor, Markdown Editor, QR Code Generator, Unit Converter, Hash Generator, SVG Optimizer, Cron Parser | `.card`                     | `max-width:520px`                                                                                     |
| Password Generator                                                                                                                                      | `.card`                     | `width:100%; max-width:460px; border:1px solid var(--frame-border); border-radius:16px; padding:24px` |
| Color Picker                                                                                                                                            | `.val`                      | `border:1px solid var(--frame-border); border-radius:10px; padding:12px 14px; display:flex`           |
| Color Picker                                                                                                                                            | `.val` at `max-width:520px` | `gap:10px`                                                                                            |

The JSON Formatter and Text Case Converter previews do not define a card container. SQL Studio uses an internal sidebar/editor layout rather than a card surface; its dimensions are not recorded as card tokens.

## Inline And Coverage Notes

- No non-empty inline geometry declaration was found on rendered host card/panel elements or card surfaces in the 13 generated mock previews. Collection marks have inline background values only; those are not size declarations.
- The card geometry inventory includes CSS-owned dimensions, grid tracks, spacing, border thickness/radius, and responsive rules; it does not infer rendered pixel heights from content or include text-size tokens.
- Nine generated previews use the generic `.card` maximum width; Password Generator and Color Picker have their own local framed surfaces. These iframe values remain isolated from host styles.
- Refresh this source audit whenever card markup or geometry in `sandbox/index.html` changes. This is not a production design-system contract.
