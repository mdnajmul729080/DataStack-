# Sandbox Page-Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This review-only ledger records page-shell bounds, page-root widths/padding, primary page content grids, and their responsive changes. It does not define production tokens or authorize additional UI migration.

Rendered roots include the shared `.page` canvas; Workspace, Teams and Team subpages, Tool Detail, Profile/public Profile, and Settings modifiers; and generic-shell views for Discover, Collections, Favorites, Recent, and collection tabs. Unsupported mobile tool details also use the generic `.page` root. Isolated mock-tool documents are iframe applications rather than workbench pages; their local geometry remains in [`Sections.size.md`](Sections.size.md) and [`cards.size.md`](cards.size.md).

Typography is recorded in [`fonts.md`](fonts.md) and [`fonts.size.md`](fonts.size.md). Section/hero and panel internals are recorded in [`Sections.size.md`](Sections.size.md); card-grid and card-surface geometry is cross-indexed in [`cards.size.md`](cards.size.md); responsive button hit areas remain in [`buttons.size.md`](buttons.size.md).

## App Viewport And Shared Page Canvas

| Selector                          | Exact size declarations                                    |
| --------------------------------- | ---------------------------------------------------------- |
| `.app`                            | `display:flex; flex-direction:column; height:100vh`        |
| `.workbench`                      | `flex:1; display:flex; min-height:0; overflow:hidden`      |
| `.main`                           | `flex:1; display:flex; flex-direction:column; min-width:0` |
| `.content`                        | `flex:1; overflow-y:auto; overflow-x:hidden; min-height:0` |
| `.content.runner`                 | `overflow:hidden; padding:0`                               |
| `.page`                           | `padding:26px 30px 40px; max-width:1280px; margin:0 auto`  |
| `.app` at `max-width:640px`       | `height:100vh; height:100dvh`                              |
| `.workbench` at `max-width:640px` | `position:relative; flex-direction:column`                 |
| `.main` at `max-width:640px`      | `order:1; flex:1; min-height:0`                            |
| `.page` at `max-width:640px`      | `padding:18px 16px 40px`                                   |

## Page Width Modifiers

Modifiers are applied on top of `.page`; the source sets `max-width`, not a fixed width.

| Page view                                                 | Selector          | Exact size declaration             |
| --------------------------------------------------------- | ----------------- | ---------------------------------- |
| Workspace                                                 | `.workspace-page` | `max-width:1160px`                 |
| Teams                                                     | `.teams-page`     | `max-width:1040px`                 |
| Team Invite, Sharing, and Settings                        | `.team-subpage`   | `max-width:760px`                  |
| Tool Detail                                               | `.detail`         | `max-width:1080px`                 |
| Personal and public Profile                               | `.profile-page`   | `max-width:1080px`                 |
| Settings                                                  | `.settings-page`  | `max-width:900px`                  |
| Discover, Collections, Favorites, Recent, collection tabs | `.page`           | `max-width:1280px` (shared canvas) |

## Primary Page Layout Tracks

| View/layout                                          | Selector                 | Exact size declarations                                                                                             |
| ---------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Shared page header                                   | `.page-header`           | `display:flex; align-items:flex-start; justify-content:space-between; gap:20px; margin-bottom:26px; flex-wrap:wrap` |
| Workspace columns                                    | `.workspace-main-grid`   | `display:grid; grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr); gap:14px; align-items:start`             |
| Teams lower content                                  | `.team-bottom-grid`      | `display:grid; grid-template-columns:minmax(0,1.15fr) minmax(250px,.85fr); gap:12px; align-items:start`             |
| Discover, Favorites, Recent, collection-tool results | `.tool-grid`             | `display:grid; grid-template-columns:repeat(auto-fill,minmax(252px,1fr)); gap:12px`                                 |
| Collections index                                    | `.collection-card-grid`  | `display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:9px`                                  |
| Collection tab tools heading                         | `.collection-tools-head` | `display:flex; align-items:center; justify-content:space-between; gap:10px; margin:16px 0 9px`                      |
| Tool Detail hero                                     | `.detail-hero`           | `display:flex; gap:20px; margin-bottom:28px; flex-wrap:wrap`                                                        |
| Tool Detail glyph                                    | `.detail-glyph`          | `width:76px; height:76px; border-radius:18px; flex-shrink:0`                                                        |
| Tool Detail content                                  | `.detail-grid`           | `display:grid; grid-template-columns:1fr 260px; gap:34px`                                                           |
| Tool Detail copy column                              | `.detail-info`           | `flex:1; min-width:260px`                                                                                           |
| Tool Detail title                                    | `.detail-info h1`        | `margin-bottom:8px`                                                                                                 |
| Tool Detail description                              | `.detail-info .desc`     | `margin-bottom:16px; max-width:600px`                                                                               |
| Tool Detail actions                                  | `.detail-actions`        | `display:flex; gap:8px; flex-wrap:wrap`                                                                             |
| Profile main columns                                 | `.profile-columns`       | `display:grid; grid-template-columns:minmax(0,1.3fr) minmax(240px,.7fr); gap:16px; align-items:start`               |

## Responsive Page Layouts

| Selector               | Media condition   | Exact responsive size declarations                                                                                                              |
| ---------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `.workspace-main-grid` | `max-width:860px` | `grid-template-columns:minmax(0,1fr)`                                                                                                           |
| `.detail-grid`         | `max-width:860px` | `grid-template-columns:1fr`                                                                                                                     |
| `.detail-hero`         | `max-width:640px` | `display:grid; grid-template-columns:52px minmax(0,1fr); align-items:start; gap:12px; margin-bottom:22px`                                       |
| `.detail-glyph`        | `max-width:640px` | `width:52px; height:52px; border-radius:12px`                                                                                                   |
| `.detail-info`         | `max-width:640px` | `display:contents; min-width:0`                                                                                                                 |
| `.detail-info h1`      | `max-width:640px` | `margin-bottom:6px`                                                                                                                             |
| `.detail-info .desc`   | `max-width:640px` | `margin-bottom:0`                                                                                                                               |
| `.detail-actions`      | `max-width:640px` | `grid-column:1/-1; display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto; gap:6px`                                               |
| `.detail-actions .btn` | `max-width:640px` | `height:32px; min-width:0; justify-content:center; padding-inline:8px; white-space:nowrap` (button sizing is also indexed in `buttons.size.md`) |
| `.tool-grid`           | `max-width:640px` | `grid-template-columns:1fr`                                                                                                                     |
| `.team-bottom-grid`    | `max-width:640px` | `grid-template-columns:minmax(0,1fr)`                                                                                                           |
| `.profile-columns`     | `max-width:640px` | `grid-template-columns:1fr; gap:0`                                                                                                              |

## Coverage Notes

- A fresh raw-source audit matched 42 in-scope selector/media groups and every documented size declaration to the canonical stylesheet with zero discrepancies.
- Page roots, width modifiers, shell constraints, primary content grids, and responsive variants are literal source declarations; computed rendered widths/heights are not substituted for CSS tokens.
- Discover, Collections, Favorites, Recent, and collection-tab views use the generic page root; their card-grid internals are shared and indexed above and in the card ledger.
- The generic page header, Teams header, Profile sections, Workspace sections, and Settings sections have additional spacing values in [`Sections.size.md`](Sections.size.md); this file avoids duplicating those section internals.
- No production source, sandbox HTML, or styling was changed for this audit. Refresh this ledger when page roots or page-level geometry in `sandbox/index.html` change.
