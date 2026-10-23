# Sandbox Dropdown Styles And Sizes

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This review-only forensic ledger records exact authored dropdown styles and sizes in the sandbox. It does not define production tokens or authorize production dropdown migration.

Included surfaces:

- Custom workspace dropdown trigger and menu.
- Workspace menu heading, list, item, select/action rows, check/icon/separator, active, hover, danger, and focus states.
- Native `<select>` controls for Discover sorting, Settings theme, Team member role filter, Team role cells, Team invite role, and modal category.
- Shared settings control bounds that constrain the Settings theme select.
- Responsive bounds and mobile overrides for workspace dropdown and native selects.
- Authored markup and dynamic option markup, with native option-popup geometry explicitly distinguished.

Excluded:

- Command palette, mobile navigation popover, native dialogs, and toast surfaces, already covered by `popupModel.styles.size.md`.
- Collection picker labels/cards, checkbox/radio option panels, and generic custom option lists.
- Browser-native `<option>` popup rendering, since `sandbox/index.html` contains no `<option>` CSS declarations controlling platform menu geometry.
- Sidebar section/category popovers unrelated to an explicit dropdown/select control.

## Surface Summary

| Surface                           | Exact selector blocks |    Markup instances | Responsive override blocks |
| --------------------------------- | --------------------: | ------------------: | -------------------------: |
| Custom workspace dropdown trigger |                     7 |           1 trigger |             2 declarations |
| Custom workspace dropdown menu    |                    18 |    1 generated menu |             2 declarations |
| Native `.side-select`             |                     1 |           2 selects |   0 in select class itself |
| Settings select constraints       |                     2 |            1 select |         2 breakpoint rules |
| Team member filter select         |                     1 |            1 select |                          1 |
| Team role select                  |                     2 |        dynamic rows |                          1 |
| Team field select                 |                     2 |            1 select |                          0 |
| Prototype modal select            |                     1 |            1 select |                          0 |
| Shared select controls            | 0 new selector blocks | 6 total select tags |                          0 |

The custom workspace dropdown has 18 menu/internal selector blocks and 7 trigger/positioning selector blocks. Native select markup is present in 6 places, all mapped to one or more exact control patterns below.

## Custom Workspace Dropdown Trigger

Markup:

```html
<button
  class="workspace-selector-btn"
  id="workspaceSelectorBtn"
  type="button"
  data-action="toggle-workspace-menu"
  aria-haspopup="menu"
  aria-expanded="false"
>
  <span class="workspace-selector-label">...</span>
  <span class="chevron-icon">...</span>
</button>
```

| Selector                                                                      | Exact declarations                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.titlebar-workspace`                                                         | `position:relative; min-width:0; color:var(--text-dim); font-size:11px; font-weight:500; letter-spacing:0`                                                                                                                                                                                   |
| `.workspace-selector-btn`                                                     | `max-width:180px; display:flex; align-items:center; gap:5px; padding:4px 6px; border:1px solid transparent; border-radius:5px; background:transparent; color:inherit; font:inherit; text-align:left; cursor:pointer; transition:background .14s ease,border-color .14s ease,color .14s ease` |
| `.workspace-selector-btn:hover,.workspace-selector-btn[aria-expanded="true"]` | `background:var(--bg-hover); border-color:var(--border-strong); color:var(--text)`                                                                                                                                                                                                           |
| `.workspace-selector-btn:focus-visible`                                       | `outline:2px solid var(--accent-hover); outline-offset:2px`                                                                                                                                                                                                                                  |
| `.workspace-selector-label`                                                   | `overflow:hidden; text-overflow:ellipsis; white-space:nowrap`                                                                                                                                                                                                                                |
| `.chevron-icon`                                                               | `flex:none; transition:transform .14s ease`                                                                                                                                                                                                                                                  |
| `.workspace-selector-btn[aria-expanded="true"] .chevron-icon`                 | `transform:rotate(180deg)`                                                                                                                                                                                                                                                                   |

At `@media (max-width:640px)`:

| Selector                    | Exact declarations                    |
| --------------------------- | ------------------------------------- |
| `.workspace-selector-btn`   | `max-width:104px; padding-inline:5px` |
| `.workspace-selector-label` | `max-width:72px`                      |

The trigger's desktop and mobile maximum widths are applied through a max-width constraint, not a fixed width. Its icon is structurally accepted as a flex-none chevron but has no authored icon width/height in the workspace trigger rules.

## Custom Workspace Dropdown Menu

Markup container:

```html
<div
  class="workspace-dropdown-menu"
  id="workspaceDropdownMenu"
  role="menu"
  aria-label="Workspaces"
  hidden
>
  <!-- dynamic workspace rows and actions -->
</div>
```

Dynamic rows are created by `workspaceDropdownHTML()`. The menu owns its popup geometry and all row geometry directly.

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

| Selector                   | Exact declarations                                           |
| -------------------------- | ------------------------------------------------------------ |
| `.workspace-dropdown-menu` | `top:calc(100% + 21px); width:min(280px,calc(100vw - 92px))` |

### Workspace Menu State Contract

- `hidden` suppresses the menu through `.workspace-dropdown-menu[hidden]`.
- `top:calc(100% + 7px)` positions the menu relative to the titlebar workspace wrapper.
- Desktop menu width is `300px` bounded by `100vw - 24px`; mobile width is `280px` bounded by `100vw - 92px`.
- Maximum height is `70dvh` bounded by `460px`; overflow is vertical through `overflow:auto`.
- List rows use `30px` minimum height; workspace switch rows use `28px` minimum height.
- Menu action rows use `32px` minimum height.
- Active and hover states use `var(--bg-hover)`; active workspace text uses `var(--text)`.
- Current workspace action icons are `24px`; action SVGs are `13px`/`14px`; check width is `14px`.

## Native `<select>` Controls

There are exactly six native select markup instances:

1. `submittedToolCategory` in the Submit Tool modal.
2. `.side-select[data-change="sort"]` in Discover sorting.
3. `.team-role-select[data-change="team-role"]` in dynamic team rows.
4. `.team-member-filter#teamMemberRoleFilter` in Teams member filtering.
5. `#teamInviteRole` in the Team invite form.
6. `.side-select.settings-control[data-change="settings-theme"]` in Settings.

### Shared Modal Category Select

| Selector                                                                                                                             | Exact declarations                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.prototype-form-field input:not([type="checkbox"]):not([type="color"]),.prototype-form-field select,.prototype-form-field textarea` | `width:100%; min-height:34px; padding:7px 9px; border:1px solid var(--border-strong); border-radius:5px; background:var(--bg-main); color:var(--text); font:inherit; font-size:11.5px` |
| `.prototype-form-field select:focus`                                                                                                 | `outline:2px solid var(--accent); outline-offset:1px`                                                                                                                                  |

The modal category select has no standalone width or height override beyond this shared rule.

### Discover Sidebar Select

| Selector       | Exact declarations                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.side-select` | `width:100%; background:var(--bg-main); border:1px solid var(--border-strong); color:var(--text); font-size:12.5px; padding:6px 8px; border-radius:5px; outline:none` |

The Discover sort select therefore has no explicit `min-height`, `height`, or `max-height`. Its rendered control height follows native select rendering plus 12.5px text and 6px vertical padding.

Its three option values are authored only as text markup:

- `Most used`
- `Top rated`
- `Newest`

### Settings Theme Select

The settings theme select inherits `.side-select` and adds shared settings dimensions.

| Selector            | Exact declarations                 |
| ------------------- | ---------------------------------- |
| `.settings-control` | `min-width:140px; max-width:190px` |

At `@media (min-width:641px) and (max-width:860px)`:

| Selector            | Exact declarations                 |
| ------------------- | ---------------------------------- |
| `.settings-control` | `min-width:112px; max-width:148px` |

At `@media (max-width:640px)`:

| Selector            | Exact declarations                 |
| ------------------- | ---------------------------------- |
| `.settings-control` | `min-width:112px; max-width:148px` |

The settings select has no separate authored `width`, height, or option geometry.

### Team Member Role Filter

| Selector              | Exact declarations                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.team-member-filter` | `min-width:112px; min-height:32px; padding:5px 8px; border:1px solid var(--border); border-radius:5px; background:var(--bg-main); color:var(--text-muted); font:inherit; font-size:10.5px` |

At `@media (max-width:640px)`:

| Selector              | Exact declarations |
| --------------------- | ------------------ |
| `.team-member-filter` | `min-width:96px`   |

The visible option labels are `All roles`, `Owner`, `Admin`, and `Member`; no CSS targets native `<option>` geometry.

### Team Role Cell Select

| Selector                     | Exact declarations                                                                                                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.team-role-select`          | `width:100%; max-width:110px; min-height:28px; padding:4px 6px; border:1px solid var(--border); border-radius:4px; background:var(--bg-elevated); color:var(--text-muted); font:inherit; font-size:10px` |
| `.team-role-select:disabled` | `opacity:.8; cursor:not-allowed`                                                                                                                                                                         |

At `@media (max-width:640px)`:

| Selector            | Exact declarations                  |
| ------------------- | ----------------------------------- |
| `.team-role-select` | `padding-inline:3px; font-size:9px` |

Team role cells use `Owner`, `Admin`, and `Member`; `Owner` is disabled for the owner account. Native options receive no authored dimensions or state rules.

### Team Invite Role Select

| Selector                                           | Exact declarations                                                                                                                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.team-field input,.team-field select`             | `width:100%; min-height:34px; padding:7px 9px; border:1px solid var(--border-strong); border-radius:5px; background:var(--bg-main); color:var(--text); font:inherit; font-size:11.5px` |
| `.team-field input:focus,.team-field select:focus` | `outline:2px solid var(--accent); outline-offset:1px`                                                                                                                                  |

The Team invite role select offers `Member` and `Admin`. It has no standalone select geometry; it shares `.team-field` control dimensions.

## Exact Responsive Contract

| Scope             | Applied dropdown geometry                                                                                                                                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base              | Workspace trigger `180px` max width; menu width `300px` minus viewport; native sidebar select full width; team filter `112px` minimum; role select `28px` minimum/`110px` maximum; settings select `140px`-`190px`                                                                |
| `641px-860px`     | Settings select narrows to `112px`-`148px`                                                                                                                                                                                                                                        |
| `max-width:640px` | Workspace trigger `104px` max width and label `72px` max width; menu offset becomes `21px` and width becomes `280px` minus viewport; team filter minimum becomes `96px`; role select inline padding becomes `3px` and font becomes `9px`; settings select remains `112px`-`148px` |

No select receives a popup-height or option-menu font/border override. Native option popups are platform-controlled and are not represented by CSS variables or literal values in the source.

## Markup, Inline, And Option Boundary

Six native `<select>` elements occur in the canonical source. Their only dynamic option markup is for Discover sort, team roles, team role filter, invite role, and settings theme. Submit Tool category options are literal markup.

No popup/container `style` attribute or JavaScript assignment changes select control geometry. No `option { ... }`, `option:checked`, `option:hover`, `<option style>`, or `select::part(...)` rule exists.

Therefore:

- All authored dropdown control geometry is represented above.
- Native option-menu width, height, item padding, scroll behavior, and platform rendering are outside the source.
- A claim of “100% match” applies to all authored HTML/CSS tokens, not platform-owned native option popup chrome.

## Verification

- The custom workspace dropdown is reconciled to 25 exact selector blocks: 7 trigger/positioning/trigger-state blocks and 18 menu/menu-state blocks.
- Six native select markup instances reconcile to five authored control patterns plus inherited/shared settings dimensions.
- Desktop, `641px-860px`, and `max-width-640px` select constraints are grouped exactly by media scope.
- No `<option>` CSS or native option-popup inline sizing exists.
- No dropdown inline style or JavaScript style assignment changes the control geometry.
- This file is a review-only forensic record; no sandbox or production CSS was changed.
