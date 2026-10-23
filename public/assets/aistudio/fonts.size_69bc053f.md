# Sandbox Font-Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This file inventories every literal numeric font size declared by the sandbox design, without changing the prototype or production styles.

The host workbench and each generated mock-tool iframe are separate CSS scopes. Counts include the host stylesheet, the generated stylesheets for all 13 catalogue tools, the numeric size in a `font` shorthand, and literal inline `font-size` attributes in generated markup. Values are preserved exactly as written; CSSOM-expanded inheritance is not counted as a literal size declaration.

| Source scope              | Direct `font-size` CSS | Numeric size in `font` shorthand | Inline `font-size` | Size-bearing occurrences |
| ------------------------- | ---------------------: | -------------------------------: | -----------------: | -----------------------: |
| Host workbench            |                    227 |                                1 |                  3 |                      231 |
| Mock-tool iframe previews |                     76 |                                0 |                  3 |                       79 |
| Total                     |                    303 |                                1 |                  6 |                      310 |

There are 23 distinct numeric size values. Every current numeric size uses `px`; there are no `rem`, `em`, `%`, `pt`, `vw`, or other size units among the audited font-size declarations.

## Exact Size Tokens

| Exact value | Host `font-size` CSS | Iframe `font-size` CSS | Host shorthand | Host inline | Iframe inline | Total occurrences |
| ----------- | -------------------: | ---------------------: | -------------: | ----------: | ------------: | ----------------: |
| `8px`       |                    1 |                      0 |              0 |           0 |             0 |                 1 |
| `9px`       |                   11 |                      1 |              0 |           0 |             0 |                12 |
| `9.5px`     |                   18 |                      1 |              0 |           0 |             0 |                19 |
| `10px`      |                   32 |                      2 |              1 |           0 |             0 |                35 |
| `10.5px`    |                   33 |                      3 |              0 |           0 |             0 |                36 |
| `11px`      |                   26 |                      4 |              0 |           1 |             1 |                32 |
| `11.5px`    |                   27 |                      0 |              0 |           0 |             0 |                27 |
| `12px`      |                   26 |                     21 |              0 |           1 |             1 |                49 |
| `12.5px`    |                   18 |                      3 |              0 |           0 |             0 |                21 |
| `13px`      |                    6 |                     10 |              0 |           1 |             1 |                18 |
| `13.5px`    |                    5 |                      0 |              0 |           0 |             0 |                 5 |
| `14px`      |                    3 |                     10 |              0 |           0 |             0 |                13 |
| `15px`      |                    3 |                      2 |              0 |           0 |             0 |                 5 |
| `16px`      |                    0 |                      2 |              0 |           0 |             0 |                 2 |
| `16.5px`    |                    1 |                      0 |              0 |           0 |             0 |                 1 |
| `17px`      |                    3 |                      0 |              0 |           0 |             0 |                 3 |
| `18px`      |                    5 |                      1 |              0 |           0 |             0 |                 6 |
| `19px`      |                    2 |                      0 |              0 |           0 |             0 |                 2 |
| `20px`      |                    1 |                      0 |              0 |           0 |             0 |                 1 |
| `21px`      |                    1 |                      0 |              0 |           0 |             0 |                 1 |
| `22px`      |                    3 |                     16 |              0 |           0 |             0 |                19 |
| `23px`      |                    1 |                      0 |              0 |           0 |             0 |                 1 |
| `24px`      |                    1 |                      0 |              0 |           0 |             0 |                 1 |
| **Total**   |              **227** |                 **76** |          **1** |       **3** |         **3** |           **310** |

## Shorthand And Inheritance

The host rule `.workspace-dock-glyph` declares `font:700 10px ui-monospace,monospace`; its `10px` contributes one size occurrence above. Thirty host declarations use `font:inherit`; they inherit the surrounding size and do not introduce a separate numeric font-size token. No mock iframe stylesheet contains a numeric size in a `font` shorthand.

## Inline Size Locations

| Scope       | Generated UI location               | Exact declaration |
| ----------- | ----------------------------------- | ----------------- |
| Host        | Discover empty-results message      | `font-size:13px`  |
| Host        | Tool-detail review count            | `font-size:12px`  |
| Host        | Tool-detail source URL              | `font-size:11px`  |
| Mock iframe | JSON Formatter version/source label | `font-size:11px`  |
| Mock iframe | Color Picker palette caption        | `font-size:12px`  |
| Mock iframe | Password Generator options row      | `font-size:13px`  |

## Coverage And Reconciliation

- Direct CSS values were scanned from the raw host `<style>` source and generated `toolFrameDoc()` styles for each of the 13 catalogue tools. Repeated generated rules count once per tool document.
- Literal inline styles were separately scanned in generated host and iframe markup. Their six numeric font-size declarations are already included once each in the totals; they are not folded into CSS declaration counts.
- The direct CSS totals reconcile to 227 host + 76 iframe = 303. Adding one shorthand size and six inline sizes gives 310 size-bearing occurrences.
- `inherit` is a value, not a numeric size. It is not listed as a numeric token; the existing [`fonts.md`](fonts.md) inventories the broader font declarations and inherited shorthand separately.
- Refresh this source audit whenever typography in `sandbox/index.html` changes. This is not a production token definition.
