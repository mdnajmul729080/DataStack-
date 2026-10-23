# Sandbox Section-Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This file records exact sizing for page and section containers; it does not change prototype or production styles.

Included values cover page bounds, section spacing, layout tracks, display/flex geometry, gaps, padding/margins, border dimensions, and overflow where it affects section layout. Host workbench rules, responsive overrides, and iframe-local subgroups are separate. Typography is covered by [`fonts.md`](fonts.md) and [`fonts.size.md`](fonts.size.md); card surface geometry is also detailed in [`cards.size.md`](cards.size.md).

The raw source parse found 68 host section/layout rules and 7 iframe subgroup rules. The rendered section wrappers have no inline size geometry.

## Host Page And Generic Sections

| Selector                                  | Exact size declarations                                   |
| ----------------------------------------- | --------------------------------------------------------- |
| `.side-block`                             | `padding:8px 8px 3px`                                     |
| `.side-block+.side-block`                 | `border-top:1px solid var(--border)`                      |
| `.page`                                   | `padding:26px 30px 40px; max-width:1280px; margin:0 auto` |
| `.page-header`                            | `display:flex; gap:20px; margin-bottom:26px`              |
| `.page-header h1`                         | `margin-bottom:5px`                                       |
| `.section`                                | `margin-bottom:32px`                                      |
| `.section-head`                           | `display:flex; margin-bottom:14px`                        |
| `.workspace-page`                         | `max-width:1160px`                                        |
| `.teams-page`                             | `max-width:1040px`                                        |
| `.team-subpage`                           | `max-width:760px`                                         |
| `.teams-header`                           | `display:flex; gap:18px; margin-bottom:18px`              |
| `.teams-header h1`                        | `display:flex; gap:8px; margin-bottom:5px`                |
| `.teams-header-actions`                   | `display:flex; gap:7px; flex:none`                        |
| `.profile-page`                           | `max-width:1080px`                                        |
| `.profile-back`                           | `margin-bottom:14px`                                      |
| `.profile-side-group`                     | `padding:6px 0 3px`                                       |
| `.profile-side-group+.profile-side-group` | `border-top:1px solid var(--border)`                      |
| `.settings-page`                          | `max-width:900px`                                         |
| `.settings-intro`                         | `margin-bottom:18px`                                      |
| `.settings-intro h1`                      | `margin-bottom:4px`                                       |
| `.settings-intro p`                       | `max-width:620px`                                         |

## Workspace Sections

| Selector                                          | Exact size declarations                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `.workspace-hero`                                 | `display:flex; gap:20px; padding:22px 24px; margin-bottom:18px; border:1px solid var(--border); border-radius:8px` |
| `.workspace-hero.is-populated`                    | `padding:14px 18px; margin-bottom:12px`                                                                            |
| `.workspace-hero-copy`                            | `min-width:0; max-width:690px`                                                                                     |
| `.workspace-hero h1`                              | `margin-bottom:7px`                                                                                                |
| `.workspace-hero.is-populated .workspace-eyebrow` | `margin-bottom:4px`                                                                                                |
| `.workspace-hero.is-populated h1`                 | `margin-bottom:4px`                                                                                                |
| `.workspace-control-strip`                        | `display:flex; gap:10px; padding:10px 12px; margin-bottom:18px; border:1px solid var(--border); border-radius:7px` |
| `.workspace-main-grid`                            | `display:grid; grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr); gap:14px`                               |
| `.workspace-section`                              | `min-width:0; margin-bottom:18px`                                                                                  |
| `.workspace-section-head`                         | `display:flex; gap:10px; margin-bottom:10px`                                                                       |

## Team Sections

| Selector                 | Exact size declarations                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `.team-settings-fields`  | `display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px`                               |
| `.team-settings-actions` | `display:flex; gap:7px; padding-top:4px`                                                              |
| `.team-members-panel`    | `min-width:0; margin-bottom:14px; border:1px solid var(--border); border-radius:7px; overflow:hidden` |
| `.team-bottom-grid`      | `display:grid; grid-template-columns:minmax(0,1.15fr) minmax(250px,.85fr); gap:12px`                  |

## Profile Sections

| Selector                 | Exact size declarations                                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.profile-hero`          | `display:grid; grid-template-columns:56px minmax(0,1fr) auto; gap:10px 14px; border:1px solid var(--border); border-radius:8px; padding:14px 16px; margin-bottom:14px` |
| `.profile-stats`         | `display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; margin-bottom:18px`                                                                            |
| `.profile-columns`       | `display:grid; grid-template-columns:minmax(0,1.3fr) minmax(240px,.7fr); gap:16px`                                                                                     |
| `.profile-panel`         | `border:1px solid var(--border); border-radius:9px; padding:16px; margin-bottom:14px; min-width:0`                                                                     |
| `.profile-panel-head`    | `display:flex; gap:10px; margin-bottom:12px`                                                                                                                           |
| `.profile-panel-head h2` | `margin:0`                                                                                                                                                             |

## Settings Sections

| Selector                   | Exact size declarations                                  |
| -------------------------- | -------------------------------------------------------- |
| `.settings-section`        | `border-top:1px solid var(--border); padding:16px 0 5px` |
| `.settings-section-head`   | `display:flex; gap:16px; margin-bottom:5px`              |
| `.settings-section-head p` | `margin-top:3px`                                         |
| `.settings-note`           | `margin:0 0 8px`                                         |

## Responsive Section Overrides

Media conditions and source order are retained. Repeated entries for the same selector represent separate source declarations or later overrides.

| Selector                       | Media condition   | Exact size declarations                                                   |
| ------------------------------ | ----------------- | ------------------------------------------------------------------------- |
| `.workspace-main-grid`         | `max-width:860px` | `grid-template-columns:minmax(0,1fr)`                                     |
| `.page`                        | `max-width:640px` | `padding:18px 16px 40px`                                                  |
| `.workspace-hero`              | `max-width:640px` | `display:block; padding:16px`                                             |
| `.workspace-hero.is-populated` | `max-width:640px` | First: `padding:12px 14px`; later: `padding:10px 12px; margin-bottom:8px` |
| `.workspace-control-strip`     | `max-width:640px` | `gap:8px; padding:8px 10px; margin-bottom:10px`                           |
| `.teams-header`                | `max-width:640px` | First: `display:grid; gap:10px`; later: `gap:6px; margin-bottom:12px`     |
| `.teams-header-actions`        | `max-width:640px` | `width:100%`                                                              |
| `.team-bottom-grid`            | `max-width:640px` | `grid-template-columns:minmax(0,1fr)`                                     |
| `.profile-hero`                | `max-width:640px` | `grid-template-columns:48px minmax(0,1fr); padding:12px; gap:8px 11px`    |
| `.profile-stats`               | `max-width:640px` | `grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px`                  |
| `.profile-columns`             | `max-width:640px` | `grid-template-columns:1fr; gap:0`                                        |
| `.profile-panel`               | `max-width:640px` | `padding:13px`                                                            |
| `.workspace-section`           | `max-width:640px` | `margin-bottom:14px`                                                      |
| `.workspace-section-head`      | `max-width:640px` | `margin-bottom:7px`                                                       |
| `.team-members-panel`          | `max-width:640px` | `margin-bottom:10px`                                                      |
| `.settings-intro`              | `max-width:640px` | `margin-bottom:12px`                                                      |
| `.settings-intro h1`           | `max-width:640px` | `margin-bottom:3px`                                                       |
| `.settings-section`            | `max-width:640px` | `padding:11px 0 3px`                                                      |
| `.settings-section-head`       | `max-width:640px` | `gap:8px; margin-bottom:3px`                                              |
| `.settings-note`               | `max-width:640px` | `margin-bottom:5px`                                                       |

## Isolated Mock-Tool Subsections

These rules are local to their iframe documents and are not host section tokens.

| Preview      | Selector                     | Exact size declarations                                                                        |
| ------------ | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Color Picker | `.wrap`                      | `padding:24px; display:grid; grid-template-columns:200px 1fr; gap:24px; flex:1; overflow:auto` |
| Color Picker | `.vals`                      | `display:flex; gap:12px`                                                                       |
| Color Picker | `.wrap` at `max-width:520px` | `grid-template-columns:minmax(0,1fr); padding:16px; gap:16px`                                  |
| SQL Studio   | `.sb-scroll`                 | `flex:1; overflow-y:auto; padding:6px 0`                                                       |
| SQL Studio   | `.sb-section`                | `padding:8px 12px 4px`                                                                         |
| SQL Studio   | `.sb-section-title`          | `padding:2px 6px 6px; display:flex; gap:6px`                                                   |
| SQL Studio   | `.sb-section-title .n`       | `padding:1px 6px; border-radius:8px`                                                           |

## Inline And Coverage Notes

- No inline geometric size declarations were found on rendered host section wrappers or mock iframe section wrappers.
- Section headings' font sizes are documented in the font ledgers, not duplicated here. Section surface/card radii and card-only sizing remain indexed in [`cards.size.md`](cards.size.md).
- Exact CSS values are preserved from raw declarations; rendered pixel heights are not inferred from content.
- Refresh this audit whenever section structure or sizing in `sandbox/index.html` changes. This is a source inventory, not a production design-system contract.
