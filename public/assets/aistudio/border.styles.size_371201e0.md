# Sandbox Border Styles And Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This review-only ledger records authored `border*` CSS declarations and exact values; it does not define production tokens or authorize additional UI migration.

Included properties are `border`, side borders, `border-color`, `border-radius`, and `border-collapse`, including declarations inside responsive media rules and all 13 generated mock-tool iframe stylesheets. CSS custom-property definitions are not border declarations; references such as `var(--border)` are preserved verbatim. `outline*` and `box-shadow` are separate CSS properties and are excluded.

The raw extraction found 256 host CSS declarations and 71 iframe CSS declarations, for 327 total declarations and 50 unique property/value pairs. A full-source scan of 32 literal inline `style` attributes found no border declarations. No JavaScript-assigned border properties were found. Preview declarations are counted per generated iframe document, including repeated generic preview styles.

## Exact Border Property/Value Inventory

| Property          | Exact source value                   | Host CSS | Iframe CSS | Total |
| ----------------- | ------------------------------------ | -------: | ---------: | ----: |
| `border`          | `0`                                  |       20 |          0 |    20 |
| `border`          | `1px dashed var(--border-strong)`    |        4 |          0 |     4 |
| `border`          | `1px solid transparent`              |        3 |          0 |     3 |
| `border`          | `1px solid var(--accent-border)`     |        1 |          0 |     1 |
| `border`          | `1px solid var(--border-palette)`    |        1 |          0 |     1 |
| `border`          | `1px solid var(--border-strong)`     |       23 |          0 |    23 |
| `border`          | `1px solid var(--border)`            |       24 |          0 |    24 |
| `border`          | `1px solid var(--frame-border)`      |        0 |         15 |    15 |
| `border`          | `1px solid var(--success-border)`    |        1 |          0 |     1 |
| `border`          | `1px solid var(--warning-border)`    |        1 |          0 |     1 |
| `border`          | `2px solid transparent`              |        1 |          0 |     1 |
| `border`          | `2px solid var(--bg-main)`           |        2 |          0 |     2 |
| `border`          | `none`                               |       10 |          6 |    16 |
| `border-bottom`   | `0`                                  |        3 |          0 |     3 |
| `border-bottom`   | `1px solid var(--border-strong)`     |        1 |          0 |     1 |
| `border-bottom`   | `1px solid var(--border)`            |       10 |          0 |    10 |
| `border-bottom`   | `1px solid var(--frame-border-soft)` |        0 |          1 |     1 |
| `border-bottom`   | `1px solid var(--frame-border)`      |        0 |         11 |    11 |
| `border-bottom`   | `none`                               |        1 |          0 |     1 |
| `border-collapse` | `collapse`                           |        1 |          1 |     2 |
| `border-color`    | `var(--accent-border)`               |        1 |          0 |     1 |
| `border-color`    | `var(--accent-hover)`                |        1 |          0 |     1 |
| `border-color`    | `var(--accent)`                      |        9 |          0 |     9 |
| `border-color`    | `var(--bg-main)`                     |        1 |          0 |     1 |
| `border-color`    | `var(--border-strong)`               |        7 |          0 |     7 |
| `border-color`    | `var(--danger-border)`               |        1 |          0 |     1 |
| `border-color`    | `var(--red)`                         |        1 |          0 |     1 |
| `border-left`     | `2px solid var(--accent)`            |        1 |          0 |     1 |
| `border-left`     | `3px solid var(--accent)`            |        1 |          0 |     1 |
| `border-radius`   | `0 0 3px 3px`                        |        1 |          0 |     1 |
| `border-radius`   | `0 3px 3px 0`                        |        1 |          0 |     1 |
| `border-radius`   | `10px`                               |        3 |          3 |     6 |
| `border-radius`   | `12px`                               |        1 |          0 |     1 |
| `border-radius`   | `16px`                               |        0 |          2 |     2 |
| `border-radius`   | `18px`                               |        1 |          0 |     1 |
| `border-radius`   | `20px`                               |        2 |          8 |    10 |
| `border-radius`   | `2px`                                |        1 |          0 |     1 |
| `border-radius`   | `3px`                                |        1 |          1 |     2 |
| `border-radius`   | `4px`                                |       17 |          0 |    17 |
| `border-radius`   | `50%`                                |        9 |          3 |    12 |
| `border-radius`   | `5px`                                |       26 |          2 |    28 |
| `border-radius`   | `6px`                                |       17 |          3 |    20 |
| `border-radius`   | `7px`                                |       17 |          0 |    17 |
| `border-radius`   | `8px`                                |        9 |         13 |    22 |
| `border-radius`   | `9px`                                |        5 |          0 |     5 |
| `border-right`    | `0`                                  |        1 |          0 |     1 |
| `border-right`    | `1px solid var(--border)`            |        3 |          0 |     3 |
| `border-right`    | `1px solid var(--frame-border)`      |        0 |          2 |     2 |
| `border-right`    | `none`                               |        1 |          0 |     1 |
| `border-top`      | `1px solid var(--border)`            |       10 |          0 |    10 |

## Coverage Notes

- Exact shorthand and side-border declarations are retained rather than expanded into inferred width/style/color values.
- Host and iframe counts are separate. Iframe counts represent generated per-tool documents; repeated generic preview CSS is counted in each generated document.
- Border color custom properties are referenced but not resolved here; their theme values belong to the token/color inventory.
- Refresh this audit when border-related rules or preview documents in `sandbox/index.html` change. No prototype or production styling was changed for this audit.
