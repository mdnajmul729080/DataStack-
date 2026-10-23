# Sandbox Popup Modal Styles And Sizes

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This review-only forensic ledger records every authored popup/modal surface and exact style/size token in the source. It does not define production tokens or authorize production popup migration.

Included popup surfaces:

- Workspace titlebar dropdown.
- Search command palette and its backdrop.
- Mobile navigation popup menu.
- Native Submit Tool, New Collection, New Workspace, and Copy Link dialogs.
- Shared prototype-dialog shell and modal form, header, fields, controls, notes, and footer.
- Collection picker controls owned by the New Collection popup.
- Toast popup container and toast states.
- Popup-specific responsive overrides at `@media (max-width:640px)`.

Excluded: general application shell/layout, general `.icon-btn`/`.btn` geometry unless directly listed as a modal-owned nested rule, sidebar drawer geometry already covered by the sidebar audit, and mock-tool iframe UI.

## Popup Surface Summary

| Popup surface                           | Source markup                    | Base geometry/style rules | Responsive rules                              |
| --------------------------------------- | -------------------------------- | ------------------------- | --------------------------------------------- |
| Workspace dropdown                      | 1 popup                          | 18 selector blocks        | 1 positional width override                   |
| Search palette and backdrop             | 1 backdrop + 1 dialog            | 20 selector blocks        | 5 selectors / 6 declaration overrides         |
| Mobile navigation popover               | 1 navigation popup               | 11 selector blocks        | 0 (`display` is in base mobile media context) |
| Prototype dialog shell/shared internals | 4 native `dialog` instances      | 24 selector blocks        | 0                                             |
| Collection picker internals             | Inside New Collection dialog     | 11 selector blocks        | 0                                             |
| Toast                                   | 1 popup container; dynamic items | 3 selector blocks         | 0                                             |

The workspace dropdown and palette have a single host `@media (max-width:640px)` override block. The mobile menu base display rule is activated inside that same host breakpoint.

Custom-property references are retained verbatim, including `var(--backdrop-search)`, `var(--shadow-modal)`, `var(--bg-elevated)`, and `var(--border-strong)`.

## Workspace Dropdown

Markup is the titlebar workspace selector and associated popover:

```html
<div class="titlebar-workspace">
  <button class="workspace-selector-btn" aria-expanded="false">...</button>
  <div class="workspace-dropdown-menu" hidden>...</div>
</div>
```

| Selector                                                                          | Exact declarations                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.workspace-dropdown-menu[hidden]`                                                | `display:none`                                                                                                                                                                                                                                                                                                     |
| `.workspace-dropdown-menu`                                                        | `position:absolute; top:calc(100% + 7px); left:0; z-index:350; width:min(300px,calc(100vw - 24px)); max-height:min(70dvh,460px); overflow:auto; padding:4px; background:var(--bg-elevated); border:1px solid var(--border-strong); border-radius:6px; box-shadow:0 8px 20px var(--shadow-menu); color:var(--text)` |
| `.workspace-menu-heading`                                                         | `padding:5px 8px; color:var(--text-dim); font-size:9.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase`                                                                                                                                                                                         |
| `.workspace-menu-list`                                                            | `display:grid; gap:1px`                                                                                                                                                                                                                                                                                            |
| `.workspace-menu-item`                                                            | `min-height:30px; display:flex; align-items:center; gap:4px; padding:2px 3px; border-radius:4px`                                                                                                                                                                                                                   |
| `.workspace-menu-item:hover,.workspace-menu-item.active`                          | `background:var(--bg-hover)`                                                                                                                                                                                                                                                                                       |
| `.workspace-menu-select`                                                          | `min-width:0; min-height:28px; flex:1; display:flex; align-items:center; gap:7px; padding:4px 6px; border:0; border-radius:4px; background:transparent; color:var(--text-muted); font:inherit; font-size:11.5px; text-align:left; cursor:pointer`                                                                  |
| `.workspace-menu-select:hover,.workspace-menu-item.active .workspace-menu-select` | `color:var(--text)`                                                                                                                                                                                                                                                                                                |
| `.workspace-menu-select span`                                                     | `overflow:hidden; text-overflow:ellipsis; white-space:nowrap`                                                                                                                                                                                                                                                      |
| `.workspace-menu-check`                                                           | `width:14px; flex:none; color:var(--accent-hover); text-align:center`                                                                                                                                                                                                                                              |
| `.workspace-menu-icon`                                                            | `width:24px; height:24px; display:grid; place-items:center; flex:none; border:0; border-radius:4px; background:transparent; color:var(--text-dim); cursor:pointer`                                                                                                                                                 |
| `.workspace-menu-icon:hover`                                                      | `background:var(--bg-active); color:var(--text)`                                                                                                                                                                                                                                                                   |
| `.workspace-menu-icon svg`                                                        | `width:13px; height:13px`                                                                                                                                                                                                                                                                                          |
| `.workspace-menu-separator`                                                       | `height:1px; margin:5px 2px; background:var(--border)`                                                                                                                                                                                                                                                             |
| `.workspace-menu-action`                                                          | `width:100%; min-height:32px; display:flex; align-items:center; gap:8px; padding:5px 8px; border:0; border-radius:4px; background:transparent; color:var(--text-muted); font:inherit; font-size:11.5px; text-align:left; cursor:pointer`                                                                           |
| `.workspace-menu-action:hover`                                                    | `background:var(--bg-hover); color:var(--text)`                                                                                                                                                                                                                                                                    |
| `.workspace-menu-action svg`                                                      | `width:14px; height:14px; flex:none`                                                                                                                                                                                                                                                                               |
| `.workspace-menu-action.danger`                                                   | `color:var(--text-danger)`                                                                                                                                                                                                                                                                                         |
| `.workspace-menu-action.danger:hover`                                             | `background:var(--danger-soft); color:var(--text-danger-hover)`                                                                                                                                                                                                                                                    |

At `@media (max-width:640px)`:

| Selector                   | Exact declaration                                            |
| -------------------------- | ------------------------------------------------------------ |
| `.workspace-dropdown-menu` | `top:calc(100% + 21px); width:min(280px,calc(100vw - 92px))` |

## Search Command Palette

Markup:

```html
<div class="search-palette-backdrop" hidden></div>
<section class="search-palette" role="dialog" aria-modal="true" hidden>
  ...
</section>
```

| Selector                                                      | Exact declarations                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.search-palette-backdrop[hidden],.search-palette[hidden]`    | `display:none`                                                                                                                                                                                                                                                                                                                                                          |
| `.search-palette-backdrop`                                    | `position:fixed; inset:0; z-index:400; background:var(--backdrop-search); backdrop-filter:blur(1px)`                                                                                                                                                                                                                                                                    |
| `.search-palette`                                             | `position:fixed; z-index:401; top:50px; right:14px; width:min(640px,calc(100vw - 28px)); max-height:min(680px,calc(100dvh - 66px)); display:flex; flex-direction:column; overflow:hidden; background:var(--surface-palette); border:1px solid var(--border-palette); border-radius:10px; box-shadow:0 22px 64px var(--shadow-modal),0 2px 8px var(--shadow-modal-soft)` |
| `.palette-searchbar`                                          | `height:48px; flex:none; display:flex; align-items:center; gap:12px; padding:0 14px; border-bottom:1px solid var(--border-strong); color:var(--text-muted)`                                                                                                                                                                                                             |
| `.palette-searchbar svg`                                      | `flex:none; color:var(--text-muted)`                                                                                                                                                                                                                                                                                                                                    |
| `.palette-input`                                              | `width:100%; min-width:0; height:100%; border:0; outline:0; background:transparent; color:var(--text); font:inherit; font-size:14px`                                                                                                                                                                                                                                    |
| `.palette-input::placeholder`                                 | `color:var(--text-dim)`                                                                                                                                                                                                                                                                                                                                                 |
| `.palette-escape`                                             | `flex:none; padding:2px 6px; border:1px solid var(--border-strong); border-radius:4px; color:var(--text-dim); font-size:10px`                                                                                                                                                                                                                                           |
| `.palette-results`                                            | `min-height:0; overflow-y:auto; padding:7px 0; overscroll-behavior:contain`                                                                                                                                                                                                                                                                                             |
| `.palette-heading`                                            | `padding:8px 14px 5px; color:var(--text-dim); font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase`                                                                                                                                                                                                                                          |
| `.palette-result`                                             | `width:100%; min-height:48px; display:flex; align-items:center; gap:11px; padding:7px 14px; border:0; background:transparent; color:var(--text); text-align:left; font:inherit; cursor:pointer`                                                                                                                                                                         |
| `.palette-result:hover,.palette-result[aria-selected="true"]` | `background:var(--surface-palette-hover)`                                                                                                                                                                                                                                                                                                                               |
| `.palette-result[aria-selected="true"]`                       | `box-shadow:inset 2px 0 var(--accent)`                                                                                                                                                                                                                                                                                                                                  |
| `.palette-glyph`                                              | `width:30px; height:30px; flex:none; display:grid; place-items:center; border-radius:6px; color:var(--text-on-accent); font-family:ui-monospace,monospace; font-size:9px; font-weight:700`                                                                                                                                                                              |
| `.palette-copy`                                               | `min-width:0; flex:1`                                                                                                                                                                                                                                                                                                                                                   |
| `.palette-name`                                               | `display:block; overflow:hidden; color:var(--text); font-size:12.5px; font-weight:600; text-overflow:ellipsis; white-space:nowrap`                                                                                                                                                                                                                                      |
| `.palette-meta`                                               | `display:block; margin-top:3px; overflow:hidden; color:var(--text-dim); font-size:10.5px; text-overflow:ellipsis; white-space:nowrap`                                                                                                                                                                                                                                   |
| `.palette-trailing`                                           | `flex:none; color:var(--text-dim); font-size:10px`                                                                                                                                                                                                                                                                                                                      |
| `.palette-empty`                                              | `padding:26px 18px; text-align:center; color:var(--text-muted); font-size:12px; line-height:1.6`                                                                                                                                                                                                                                                                        |
| `.palette-tips`                                               | `padding:11px 14px; border-top:1px solid var(--border); color:var(--text-dim); font-size:10.5px; line-height:1.6`                                                                                                                                                                                                                                                       |
| `.palette-footer`                                             | `min-height:34px; display:flex; align-items:center; gap:14px; padding:5px 14px; border-top:1px solid var(--border); color:var(--text-dim); font-size:10px`                                                                                                                                                                                                              |
| `.palette-footer kbd`                                         | `font:inherit; padding:1px 4px; border:1px solid var(--border-strong); border-radius:3px; color:var(--text-muted)`                                                                                                                                                                                                                                                      |
| `.palette-footer-hint`                                        | `display:flex; align-items:center; gap:4px`                                                                                                                                                                                                                                                                                                                             |
| `.palette-footer-note`                                        | `margin-left:auto`                                                                                                                                                                                                                                                                                                                                                      |

At `@media (max-width:640px)`:

| Selector               | Exact declarations                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `.search-palette`      | `top:52px; right:8px; width:calc(100vw - 16px); max-height:min(72dvh,560px); border-radius:8px` |
| `.palette-searchbar`   | `height:44px; padding-inline:11px; gap:9px`                                                     |
| `.palette-result`      | `min-height:46px; padding-inline:11px`                                                          |
| `.palette-footer`      | `gap:9px; padding-inline:11px`                                                                  |
| `.palette-footer-note` | `display:none`                                                                                  |

## Mobile Navigation Popover

Markup:

```html
<button class="titlebar-menu-toggle">...</button>
<div class="mobile-nav-menu" id="mobileNavigationMenu" role="navigation" hidden>
  ...
</div>
```

The toggle is `display:none` until the 640px breakpoint. The popup itself is `display:none` until `[hidden]` is removed while the mobile breakpoint is active.

| Selector                                                                  | Exact declarations                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.titlebar-menu-toggle`                                                   | `display:none; width:32px; height:32px; place-items:center; border:0; border-radius:6px; background:transparent; color:var(--text-muted); transition:background .16s ease,color .16s ease`                                                                                                       |
| `.titlebar-menu-toggle:hover,.titlebar-menu-toggle[aria-expanded="true"]` | `background:var(--bg-hover); color:var(--text)`                                                                                                                                                                                                                                                  |
| `.titlebar-menu-toggle svg`                                               | `width:16px; height:16px`                                                                                                                                                                                                                                                                        |
| `.mobile-nav-menu[hidden]`                                                | `display:none`                                                                                                                                                                                                                                                                                   |
| `.mobile-nav-menu`                                                        | `display:none`                                                                                                                                                                                                                                                                                   |
| `.mobile-nav-menu:not([hidden])`                                          | `position:absolute; top:calc(100% + 6px); left:8px; z-index:300; width:min(320px,calc(100vw - 16px)); max-height:min(72dvh,34rem); overflow:auto; padding:6px; background:var(--bg-sidebar); border:1px solid var(--border-strong); border-radius:6px; box-shadow:0 8px 20px var(--shadow-menu)` |
| `.mobile-nav-group`                                                       | `padding:4px 0`                                                                                                                                                                                                                                                                                  |
| `.mobile-nav-group+.mobile-nav-group`                                     | `border-top:1px solid var(--border); margin-top:3px; padding-top:6px`                                                                                                                                                                                                                            |
| `.mobile-nav-heading`                                                     | `padding:2px 7px 5px; color:var(--text-dim); font-size:9px; font-weight:700; letter-spacing:.06em; text-transform:uppercase`                                                                                                                                                                     |
| `.mobile-nav-item`                                                        | `display:flex; align-items:center; gap:8px; width:100%; min-height:34px; padding:6px 8px; border:0; border-radius:4px; background:transparent; color:var(--text-muted); font:inherit; font-size:12px; text-align:left`                                                                           |
| `.mobile-nav-item:hover,.mobile-nav-item.active`                          | `background:var(--bg-hover); color:var(--text)`                                                                                                                                                                                                                                                  |
| `.mobile-nav-item svg`                                                    | `width:15px; height:15px; flex:none`                                                                                                                                                                                                                                                             |
| `.mobile-nav-item span:nth-child(2)`                                      | `flex:1`                                                                                                                                                                                                                                                                                         |

At `@media (max-width:640px)`:

| Selector                         | Exact declarations |
| -------------------------------- | ------------------ |
| `.titlebar-menu-toggle`          | `display:grid`     |
| `.mobile-nav-menu:not([hidden])` | `display:block`    |

## Native Prototype Dialogs

There are four native `dialog` instances. All share the `.prototype-dialog` shell; New Workspace has the only variant override.

| Instance             | Class/name                                 | Dialog width override              |
| -------------------- | ------------------------------------------ | ---------------------------------- |
| `submitToolModal`    | `prototype-dialog`                         | none; shared `520px` maximum shell |
| `newCollectionModal` | `prototype-dialog`                         | none; shared `520px` maximum shell |
| `newWorkspaceModal`  | `prototype-dialog workspace-create-dialog` | `440px` maximum shell              |
| `copyLinkModal`      | `prototype-dialog`                         | none; shared `520px` maximum shell |

Shared exact selectors:

| Selector                                                                                                                             | Exact declarations                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.prototype-dialog`                                                                                                                  | `position:fixed; inset:0; margin:auto; width:min(520px,calc(100vw - 28px)); max-height:min(82dvh,680px); padding:0; overflow:auto; border:1px solid var(--border-strong); border-radius:8px; background:var(--bg-elevated); color:var(--text); box-shadow:0 22px 64px var(--shadow-modal),0 2px 8px var(--shadow-modal-soft)` |
| `.workspace-create-dialog`                                                                                                           | `width:min(440px,calc(100vw - 28px))`                                                                                                                                                                                                                                                                                         |
| `.prototype-dialog::backdrop`                                                                                                        | `background:var(--backdrop-search)`                                                                                                                                                                                                                                                                                           |
| `.prototype-modal-form`                                                                                                              | `display:grid; gap:0`                                                                                                                                                                                                                                                                                                         |
| `.prototype-modal-head`                                                                                                              | `position:sticky; top:0; z-index:1; display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:14px 16px; border-bottom:1px solid var(--border); background:var(--bg-elevated)`                                                                                                                   |
| `.prototype-modal-head h2`                                                                                                           | `font-size:15px; font-weight:650`                                                                                                                                                                                                                                                                                             |
| `.prototype-modal-head p`                                                                                                            | `margin-top:3px; color:var(--text-muted); font-size:10.5px; line-height:1.45`                                                                                                                                                                                                                                                 |
| `.prototype-modal-fields`                                                                                                            | `display:grid; gap:11px; padding:14px 16px`                                                                                                                                                                                                                                                                                   |
| `.prototype-form-field`                                                                                                              | `display:grid; gap:5px; min-width:0`                                                                                                                                                                                                                                                                                          |
| `.prototype-form-field label`                                                                                                        | `color:var(--text-muted); font-size:10.5px; font-weight:600`                                                                                                                                                                                                                                                                  |
| `.prototype-form-field input:not([type="checkbox"]):not([type="color"]),.prototype-form-field select,.prototype-form-field textarea` | `width:100%; min-height:34px; padding:7px 9px; border:1px solid var(--border-strong); border-radius:5px; background:var(--bg-main); color:var(--text); font:inherit; font-size:11.5px`                                                                                                                                        |
| `.prototype-form-field textarea`                                                                                                     | `min-height:74px; resize:vertical; line-height:1.5`                                                                                                                                                                                                                                                                           |
| `.prototype-form-field input:focus,.prototype-form-field select:focus,.prototype-form-field textarea:focus`                          | `outline:2px solid var(--accent); outline-offset:1px`                                                                                                                                                                                                                                                                         |
| `.prototype-form-grid`                                                                                                               | `display:grid; grid-template-columns:minmax(0,1fr) 144px; gap:10px`                                                                                                                                                                                                                                                           |
| `.prototype-color-control`                                                                                                           | `width:48px; height:34px; padding:3px; border:1px solid var(--border-strong); border-radius:5px; background:var(--bg-main); cursor:pointer`                                                                                                                                                                                   |
| `.prototype-check-row`                                                                                                               | `display:flex; align-items:center; gap:7px; color:var(--text-muted); font-size:11px`                                                                                                                                                                                                                                          |
| `.prototype-modal-foot`                                                                                                              | `display:flex; justify-content:flex-end; gap:7px; padding:11px 16px; border-top:1px solid var(--border)`                                                                                                                                                                                                                      |
| `.prototype-modal-note`                                                                                                              | `color:var(--text-dim); font-size:10px; line-height:1.45`                                                                                                                                                                                                                                                                     |
| `.prototype-dialog .icon-btn`                                                                                                        | `flex:none`                                                                                                                                                                                                                                                                                                                   |

These modal base rules do not receive additional popup-specific 640px overrides. Native dialog sizing therefore remains viewport-bounded by `calc(100vw - 28px)` and `82dvh` at all widths.

## New Collection Popup Picker

| Selector                                                                | Exact declarations                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.collection-picker-search`                                             | `width:100%; min-height:34px; padding:7px 9px; border:1px solid var(--border-strong); border-radius:5px; background:var(--bg-main); color:var(--text); font:inherit; font-size:11.5px`                                                        |
| `.collection-picker-search:focus`                                       | `outline:2px solid var(--accent); outline-offset:1px`                                                                                                                                                                                         |
| `.collection-picker-meta`                                               | `display:flex; align-items:center; justify-content:space-between; gap:8px; color:var(--text-dim); font-size:9.5px`                                                                                                                            |
| `.collection-picker-meta strong`                                        | `color:var(--text-muted); font-weight:600`                                                                                                                                                                                                    |
| `.collection-tool-results`                                              | `display:grid; gap:3px; max-height:192px; padding:2px; overflow-y:auto; border:1px solid var(--border); border-radius:5px; background:var(--bg-main)`                                                                                         |
| `.collection-tool-option`                                               | `display:flex; align-items:center; gap:8px; min-width:0; min-height:34px; padding:5px 7px; border:1px solid transparent; border-radius:4px; color:var(--text-muted); cursor:pointer; transition:background .12s,border-color .12s,color .12s` |
| `.collection-tool-option:hover,.collection-tool-option:focus-within`    | `background:var(--bg-hover); color:var(--text)`                                                                                                                                                                                               |
| `.collection-tool-option.selected`                                      | `border-color:var(--accent-border); background:var(--accent-soft); color:var(--text)`                                                                                                                                                         |
| `.collection-tool-option input`                                         | `flex:none; margin:0; accent-color:var(--accent)`                                                                                                                                                                                             |
| `.collection-tool-option-copy`                                          | `min-width:0; flex:1`                                                                                                                                                                                                                         |
| `.collection-tool-option-copy strong,.collection-tool-option-copy span` | `display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap`                                                                                                                                                                  |
| `.collection-tool-option-copy strong`                                   | `font-size:10.5px; font-weight:600`                                                                                                                                                                                                           |
| `.collection-tool-option-copy span`                                     | `margin-top:2px; color:var(--text-dim); font-size:9px`                                                                                                                                                                                        |
| `.collection-tool-empty`                                                | `padding:15px 10px; color:var(--text-dim); font-size:10.5px; text-align:center`                                                                                                                                                               |

## Toast Popup

Markup:

```html
<div class="toast-wrap" id="toasts"></div>
```

Dynamic toast items use `.toast`; `.toast.show` is the active state.

| Selector      | Exact declarations                                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.toast-wrap` | `position:fixed; bottom:36px; right:16px; display:flex; flex-direction:column; gap:8px; z-index:500`                                                                                                                                                                                                                              |
| `.toast`      | `background:var(--bg-elevated); border:1px solid var(--border-strong); border-left:3px solid var(--accent); color:var(--text); font-size:12.5px; padding:10px 14px; border-radius:7px; box-shadow:0 8px 28px var(--shadow-toast); opacity:0; transform:translateX(16px); transition:opacity .25s,transform .25s; max-width:300px` |
| `.toast.show` | `opacity:1; transform:translateX(0)`                                                                                                                                                                                                                                                                                              |

## Exact State, Cascade, And Z-Index Contract

- Hidden states use HTML `hidden` plus explicit `[hidden]` display suppression for the workspace dropdown, search palette/backdrop, and mobile navigation menu.
- Workspace dropdown z-index is `350`; search backdrop is `400`; search palette is `401`; mobile menu is `300`; native dialog top-layer behavior is browser-native and has no authored z-index; toast container is `500`.
- Native dialog shell is fixed, inset to the viewport, auto-margined, viewport-relative, vertically scrollable, and capped at `82dvh`/`680px`.
- New Workspace is the only dialog-width variant: `440px` maximum instead of shared `520px` maximum.
- Search palette desktop top/right offsets are `50px`/`14px`; mobile becomes `52px`/`8px` with full viewport-minus-16 width and compacted search/result/footer geometry.
- Workspace dropdown desktop maximum width is `300px` with `24px` viewport subtraction; mobile becomes `280px` with `92px` viewport subtraction and a `21px` trigger offset.
- Mobile menu maximum height is `72dvh` or `34rem`, whichever is smaller.
- Collection picker results cap at `192px`, are internally scrollable, and use 34px options.
- Dialog modal form controls use 34px minimum height; textareas use 74px minimum height and vertical resize.
- Toast width is content-derived with a `300px` maximum and 36px bottom / 16px right placement.

## Markup And Inline Geometry Coverage

Four `dialog` elements use the shared CSS shell:

- `submitToolModal`
- `newCollectionModal`
- `newWorkspaceModal`
- `copyLinkModal`

A full-source popup-target scan found zero literal `style` attributes on popup containers or popup-owned controls. No JavaScript assignment to popup element `style` properties was found. Toast items are created through popup-owned markup/classes and no per-instance inline geometry was assigned.

## Verification

- 18 workspace-dropdown selector blocks reconcile exactly to the popup source selectors.
- 24 command-palette/backdrop selector blocks, including five mobile override selectors, reconcile exactly.
- 13 mobile navigation selector blocks reconcile exactly, with two breakpoint activations.
- 19 shared native-dialog and modal-internal selector blocks reconcile exactly.
- 13 New Collection picker selector blocks reconcile exactly.
- Three toast/container/state selector blocks reconcile exactly.
- Source contains no popup-specific inline geometry and no JavaScript popup `style` assignment.
- Responsive popup declarations are grouped by exact breakpoint and no desktop value is inferred or expanded.
- This file is a review-only forensic record; no sandbox or production CSS was changed.
