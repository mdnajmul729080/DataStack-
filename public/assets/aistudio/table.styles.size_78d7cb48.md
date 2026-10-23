# Sandbox Table Styles And Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This review-only ledger records exact authored table-related CSS and sizes in the sandbox. It does not define production tokens or authorize table migration.

Included surfaces are:

- Host Teams member table wrapper and table geometry.
- Host `thead`, `tbody`, header/body cells, row-last state, fixed column widths, compact breakpoint overrides, and empty-state cell spacing.
- SQL Studio generated iframe table, including direct table, header, body, row hover, sticky header, and first-column rules.
- Literal inline style attributes and JavaScript style assignments that directly affect table elements.

Excluded surfaces are nested controls and indicators inside table cells (member avatar, role select, status, actions, toolbar, panel), because their geometry belongs to control/component audits. Generic page overflow and border/status semantics remain in their respective inventories.

## Source And Count Summary

| Surface                 | Exact table-related declarations | Responsive declarations | Inline declarations |
| ----------------------- | -------------------------------: | ----------------------: | ------------------: |
| Host Teams table        |                               38 |                       8 |                   0 |
| SQL Studio iframe table |                               22 |                       0 |                   0 |
| Total                   |                               60 |                       8 |                   0 |

The host count includes direct table wrapper/table selectors and all table-specific descendant states. At `max-width: 860px`, 1 table declaration applies; at `max-width: 640px`, 7 table declarations apply. The SQL Studio count includes 22 declarations across `table`, `thead th`, `tbody td`, `tbody tr:hover`, and `tbody td:first-child`; exact values are listed below.

Custom-property references are preserved exactly, including `var(--border)`, `var(--frame-border)`, and `var(--frame-border-soft)`.

## Exact Host Teams Member Table Inventory

| Source scope               | Selector                                                                 | Exact declarations                                                                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base                       | `.team-member-table-wrap`                                                | `width:100%; overflow-x:auto`                                                                                                                                                                                 |
| Base                       | `.team-member-table`                                                     | `width:100%; border-collapse:collapse; table-layout:fixed; text-align:left`                                                                                                                                   |
| Base                       | `.team-member-table th`                                                  | `padding:8px 12px; border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:var(--bg-elevated); color:var(--text-dim); font-size:9px; font-weight:700; text-transform:uppercase` |
| Base                       | `.team-member-table td`                                                  | `height:48px; padding:6px 12px; border-bottom:1px solid var(--border); color:var(--text-muted); font-size:10.5px; vertical-align:middle`                                                                      |
| Base                       | `.team-member-table tbody tr:last-child td`                              | `border-bottom:0`                                                                                                                                                                                             |
| Base                       | `.team-member-table th:first-child, .team-member-table td:first-child`   | `width:48%`                                                                                                                                                                                                   |
| Base                       | `.team-member-table th:nth-child(2), .team-member-table td:nth-child(2)` | `width:20%`                                                                                                                                                                                                   |
| Base                       | `.team-member-table th:nth-child(3), .team-member-table td:nth-child(3)` | `width:20%`                                                                                                                                                                                                   |
| Base                       | `.team-member-table th:last-child, .team-member-table td:last-child`     | `width:56px; text-align:center`                                                                                                                                                                               |
| Base                       | `.team-filter-empty td`                                                  | `padding:18px 12px; color:var(--text-dim); text-align:center`                                                                                                                                                 |
| `@media (max-width:860px)` | `.team-member-table`                                                     | `min-width:620px`                                                                                                                                                                                             |
| `@media (max-width:640px)` | `.team-member-table`                                                     | `min-width:0`                                                                                                                                                                                                 |
| `@media (max-width:640px)` | `.team-member-table th, .team-member-table td`                           | `padding-inline:3px`                                                                                                                                                                                          |
| `@media (max-width:640px)` | `.team-member-table td`                                                  | `height:44px`                                                                                                                                                                                                 |
| `@media (max-width:640px)` | `.team-member-table th:first-child, .team-member-table td:first-child`   | `width:50%`                                                                                                                                                                                                   |
| `@media (max-width:640px)` | `.team-member-table th:nth-child(2), .team-member-table td:nth-child(2)` | `width:20%`                                                                                                                                                                                                   |
| `@media (max-width:640px)` | `.team-member-table th:nth-child(3), .team-member-table td:nth-child(3)` | `width:18%`                                                                                                                                                                                                   |
| `@media (max-width:640px)` | `.team-member-table th:last-child, .team-member-table td:last-child`     | `width:12%`                                                                                                                                                                                                   |

## Exact SQL Studio Iframe Table Inventory

The SQL Studio rules occur once in the single `sql-studio` generated iframe stylesheet embedded in `sandbox/index.html`. They are isolated from the host table and do not inherit host Teams table geometry.

| Source scope | Selector               | Exact declarations                                                                                                                                                                                                                                                 |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Iframe base  | `table`                | `width:100%; border-collapse:collapse; font-size:12.5px`                                                                                                                                                                                                           |
| Iframe base  | `thead th`             | `text-align:left; padding:8px 14px; font-size:10.5px; text-transform:uppercase; letter-spacing:.05em; color:var(--frame-muted); font-weight:700; border-bottom:1px solid var(--frame-border); background:var(--frame-panel); position:sticky; top:31px; z-index:2` |
| Iframe base  | `tbody td`             | `padding:8px 14px; border-bottom:1px solid var(--frame-border-soft); color:var(--frame-secondary)`                                                                                                                                                                 |
| Iframe base  | `tbody tr:hover`       | `background:var(--frame-panel)`                                                                                                                                                                                                                                    |
| Iframe base  | `tbody td:first-child` | `color:var(--frame-accent-text); font-family:ui-monospace,monospace; font-weight:600`                                                                                                                                                                              |

No media query or inline style changes these iframe table rules in the embedded SQL Studio document.

## Exact Cascade And Responsive Contract

### Base Host Table

- Wrapper: `100%` width with horizontal overflow at the wrapper, and no fixed table minimum.
- Table: `100%` width, collapsed borders, fixed layout, left text alignment.
- Header cells: 8px top/bottom and 12px inline padding; 9px uppercase text; 700 weight; dimensional and visual borders use the host semantic references.
- Body cells: fixed 48px height; 6px top/bottom and 12px inline padding; 10.5px text; middle vertical alignment.
- Final body row removes the bottom border. Empty filtered-state cell gets 18px 12px padding and centered 10.5px-inherited text color.
- Fixed columns sum to 144% at base: 48% + 20% + 20% + 56px. Under fixed table layout and horizontal overflow, the remaining proportional widths share the 88% remaining after the fixed 56px column, subject to browser table sizing.

### Compact Host Table Cascade

- At `max-width:860px`, the table receives `min-width:620px`, activating wrapper overflow for a four-column table.
- At `max-width:640px`, `min-width` becomes `0`, inline cell padding becomes `3px`, body height becomes `44px`, and column widths become 50% + 20% + 18% + 12%.
- The 640px reset is later in source order, so it overrides the 860px `min-width:620px` and the base 48% first column, 20% role column, 20% status column, and 56px action column.
- The action column becomes percentage-based at 640px instead of its base fixed 56px width.

### Iframe Table Cascade

- Table font size is 12.5px, inherited by unstyled descendants.
- Header cells are sticky at `31px` with `z-index:2`, left aligned, 8px 14px padded, 10.5px uppercase text, 700 weight, and `.05em` letter spacing.
- Body cells use 8px 14px padding and semantic soft bottom separators.
- Row hover and first-column emphasis are state/type rules, not separate table geometry declarations.

## Markup Coverage

The Teams table markup is generated in JavaScript and contains:

```html
<div class="team-member-table-wrap">
  <table class="team-member-table">
    <thead>
      <tr>
        <th scope="col">Member</th>
        <th scope="col">Role</th>
        <th scope="col">Status</th>
        <th scope="col"><span class="sr-only">Actions</span></th>
      </tr>
    </thead>
    <tbody data-team-members>
      ...
    </tbody>
  </table>
</div>
```

The SQL Studio iframe markup contains a generic:

```html
<table>
  <thead>
    ...
  </thead>
  <tbody>
    ...
  </tbody>
</table>
```

Neither surface has literal inline `style` attributes on `table`, `thead`, `tbody`, `tr`, `th`, or `td`. No JavaScript table-element style assignment was found. The SQL Studio script changes `text.style.color` only for status text and does not affect table geometry.

## Verification

- Raw CSS source declarations reconcile to 30 exact base host Teams table declarations and 8 exact host responsive declarations.
- Raw iframe stylesheet declarations reconcile to 22 exact SQL Studio table declarations.
- Responsive host declarations remain separated by exact media scope rather than flattened.
- Reconciliation found no inline table declaration and no missing or duplicate direct table selector in the canonical source.
- This file is a review-only forensic record; no sandbox or production CSS was changed.
