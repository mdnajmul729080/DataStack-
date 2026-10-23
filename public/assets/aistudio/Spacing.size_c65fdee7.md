# Sandbox Spacing-Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This review-only ledger inventories authored spacing declarations; it does not define production tokens or authorize additional UI migration.

Tracked CSS properties are `margin*`, `padding*`, `gap`, `row-gap`, `column-gap`, `top`, `right`, `bottom`, `left`, `inset*`, `scroll-margin*`, and `scroll-padding*`. Values remain literal, including shorthands, `auto`, percentages, `calc()`, and safe-area expressions. Host CSS, all 13 generated mock-tool iframe stylesheets, literal inline attributes, and JavaScript-assigned offsets are counted separately. CSS values retain their source selectors/media context; this token table groups occurrences by exact property/value to avoid repeating multi-property rules.

The extraction found 498 host CSS declarations, 132 iframe CSS declarations, 10 spacing declarations in 32 literal `style` attributes, and 2 JavaScript-assigned offsets: 642 source declarations and 222 unique property/value pairs. Inline counts are source-literal occurrences, not repeated runtime renders.

## Exact Token Inventory

| Property          | Exact source value                                | Host CSS | Iframe CSS | Host inline | Iframe inline | JS assignment | Total |
| ----------------- | ------------------------------------------------- | -------: | ---------: | ----------: | ------------: | ------------: | ----: |
| bottom            | `0`                                               |        1 |          0 |           0 |             0 |             0 |     1 |
| bottom            | `36px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| bottom            | `calc(64px + env(safe-area-inset-bottom))`        |        1 |          0 |           0 |             0 |             0 |     1 |
| gap               | `0`                                               |        3 |          0 |           0 |             0 |             0 |     3 |
| gap               | `10px`                                            |       23 |          4 |           0 |             0 |             0 |    27 |
| gap               | `10px 14px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| gap               | `11px`                                            |        4 |          0 |           0 |             0 |             0 |     4 |
| gap               | `12px`                                            |        8 |          3 |           0 |             0 |             0 |    11 |
| gap               | `14px`                                            |        5 |          0 |           0 |             0 |             0 |     5 |
| gap               | `16px`                                            |        3 |          1 |           0 |             1 |             0 |     5 |
| gap               | `18px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| gap               | `1px`                                             |        2 |          1 |           0 |             0 |             0 |     3 |
| gap               | `20px`                                            |        4 |          0 |           0 |             0 |             0 |     4 |
| gap               | `24px`                                            |        0 |          1 |           0 |             0 |             0 |     1 |
| gap               | `2px`                                             |        5 |          0 |           0 |             0 |             0 |     5 |
| gap               | `34px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| gap               | `3px`                                             |        5 |          0 |           0 |             0 |             0 |     5 |
| gap               | `4px`                                             |        6 |          0 |           0 |             0 |             0 |     6 |
| gap               | `4px 9px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| gap               | `5px`                                             |       13 |          1 |           0 |             0 |             0 |    14 |
| gap               | `5px 12px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| gap               | `6px`                                             |       19 |          4 |           0 |             4 |             0 |    27 |
| gap               | `7px`                                             |       16 |          1 |           0 |             0 |             0 |    17 |
| gap               | `8px`                                             |       31 |          5 |           0 |             0 |             0 |    36 |
| gap               | `8px 11px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| gap               | `9px`                                             |       14 |          1 |           0 |             0 |             0 |    15 |
| inset             | `0`                                               |        3 |          0 |           0 |             0 |             0 |     3 |
| left              | `-7px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| left              | `0`                                               |        2 |          0 |           0 |             0 |             1 |     3 |
| left              | `46px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| left              | `50%`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| left              | `52px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| left              | `8px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| left              | `auto`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `-1px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `0`                                               |        4 |         16 |           0 |             0 |             0 |    20 |
| margin            | `0 0 12px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `0 0 20px`                                        |        0 |          8 |           0 |             0 |             0 |     8 |
| margin            | `0 0 4px`                                         |        0 |          1 |           0 |             0 |             0 |     1 |
| margin            | `0 0 6px`                                         |        2 |          0 |           0 |             0 |             0 |     2 |
| margin            | `0 0 8px`                                         |        2 |          8 |           0 |             0 |             0 |    10 |
| margin            | `0 10px 8px`                                      |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `0 14px 10px`                                     |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `0 2px`                                           |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `0 2px 8px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `0 auto`                                          |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `0 auto 20px`                                     |        0 |          8 |           0 |             0 |             0 |     8 |
| margin            | `12px 0`                                          |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `16px 0 9px`                                      |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `22px 0 10px`                                     |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `5px 2px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `6px 0`                                           |        1 |          0 |           0 |             0 |             0 |     1 |
| margin            | `9px 0 0 38px`                                    |        2 |          0 |           0 |             0 |             0 |     2 |
| margin            | `auto`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-bottom     | `0`                                               |        2 |          0 |           0 |             0 |             0 |     2 |
| margin-bottom     | `10px`                                            |        5 |          0 |           0 |             0 |             0 |     5 |
| margin-bottom     | `11px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-bottom     | `12px`                                            |        7 |          1 |           0 |             0 |             0 |     8 |
| margin-bottom     | `14px`                                            |        7 |          0 |           0 |             0 |             0 |     7 |
| margin-bottom     | `16px`                                            |        1 |          2 |           0 |             0 |             0 |     3 |
| margin-bottom     | `18px`                                            |        6 |          0 |           0 |             0 |             0 |     6 |
| margin-bottom     | `20px`                                            |        2 |          1 |           0 |             0 |             0 |     3 |
| margin-bottom     | `22px`                                            |        2 |          0 |           0 |             0 |             0 |     2 |
| margin-bottom     | `26px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-bottom     | `28px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-bottom     | `2px`                                             |        3 |          0 |           0 |             0 |             0 |     3 |
| margin-bottom     | `32px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-bottom     | `3px`                                             |        5 |          0 |           0 |             0 |             0 |     5 |
| margin-bottom     | `4px`                                             |        4 |          0 |           0 |             1 |             0 |     5 |
| margin-bottom     | `5px`                                             |        5 |          0 |           0 |             0 |             0 |     5 |
| margin-bottom     | `6px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-bottom     | `7px`                                             |        6 |          0 |           0 |             0 |             0 |     6 |
| margin-bottom     | `8px`                                             |        4 |          0 |           0 |             0 |             0 |     4 |
| margin-left       | `0`                                               |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-left       | `36px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-left       | `3px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-left       | `43px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-left       | `6px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-left       | `auto`                                            |        9 |          2 |           0 |             1 |             0 |    12 |
| margin-right      | `3px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-right      | `4px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-top        | `0`                                               |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-top        | `10px`                                            |        2 |          0 |           0 |             0 |             0 |     2 |
| margin-top        | `14px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-top        | `1px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| margin-top        | `24px`                                            |        0 |          8 |           0 |             0 |             0 |     8 |
| margin-top        | `2px`                                             |        4 |          0 |           0 |             0 |             0 |     4 |
| margin-top        | `3px`                                             |       12 |          0 |           0 |             0 |             0 |    12 |
| margin-top        | `4px`                                             |        3 |          0 |           0 |             0 |             0 |     3 |
| margin-top        | `6px`                                             |        2 |          0 |           1 |             0 |             0 |     3 |
| margin-top        | `8px`                                             |        5 |          1 |           0 |             0 |             0 |     6 |
| margin-top        | `9px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `0`                                               |       13 |          0 |           0 |             0 |             0 |    13 |
| padding           | `0 10px`                                          |        3 |          0 |           0 |             0 |             0 |     3 |
| padding           | `0 12px`                                          |        1 |          1 |           0 |             0 |             0 |     2 |
| padding           | `0 14px`                                          |        3 |          0 |           0 |             0 |             0 |     3 |
| padding           | `0 20px 20px`                                     |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `0 3px`                                           |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `0 6px`                                           |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `0 8px 0 12px`                                    |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `0 9px`                                           |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `10px`                                            |        5 |          0 |           0 |             0 |             0 |     5 |
| padding           | `10px 0`                                          |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `10px 10px 0`                                     |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `10px 12px`                                       |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `10px 14px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `10px 16px`                                       |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `10px 18px`                                       |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `10px 20px`                                       |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `11px 0 3px`                                      |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `11px 12px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `11px 14px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `11px 16px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `12px`                                            |        6 |          0 |           0 |             0 |             0 |     6 |
| padding           | `12px 0`                                          |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `12px 14px`                                       |        1 |          2 |           0 |             0 |             0 |     3 |
| padding           | `12px 16px`                                       |        0 |          2 |           0 |             0 |             0 |     2 |
| padding           | `13px`                                            |        3 |          0 |           0 |             0 |             0 |     3 |
| padding           | `13px 15px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `14px`                                            |        3 |          1 |           0 |             0 |             0 |     4 |
| padding           | `14px 0`                                          |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `14px 10px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `14px 14px 0`                                     |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `14px 14px 10px`                                  |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `14px 16px`                                       |        3 |          0 |           0 |             0 |             0 |     3 |
| padding           | `14px 18px`                                       |        1 |          1 |           0 |             0 |             0 |     2 |
| padding           | `14px 20px`                                       |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `15px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `15px 10px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `16px`                                            |        3 |          1 |           0 |             0 |             0 |     4 |
| padding           | `16px 0 5px`                                      |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `16px 20px`                                       |        0 |          2 |           0 |             0 |             0 |     2 |
| padding           | `18px 12px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `18px 16px 40px`                                  |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `1px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `1px 4px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `1px 5px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `1px 6px`                                         |        1 |          2 |           0 |             0 |             0 |     3 |
| padding           | `20px`                                            |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `20px 16px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `22px 24px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `24px`                                            |        0 |          2 |           0 |             0 |             0 |     2 |
| padding           | `26px 18px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `26px 30px 40px`                                  |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `2px`                                             |        1 |          1 |           0 |             0 |             0 |     2 |
| padding           | `2px 3px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `2px 4px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `2px 5px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `2px 6px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `2px 6px 6px`                                     |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `2px 7px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `2px 7px 5px`                                     |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `30px`                                            |        0 |          8 |           0 |             0 |             0 |     8 |
| padding           | `3px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `3px 4px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `3px 5px 6px`                                     |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `3px 6px`                                         |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `3px 7px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `4px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `4px 0`                                           |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `4px 6px`                                         |        4 |          0 |           0 |             0 |             0 |     4 |
| padding           | `4px 6px calc(4px + env(safe-area-inset-bottom))` |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `4px 9px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `5px 12px`                                        |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `5px 14px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `5px 7px`                                         |        4 |          0 |           0 |             0 |             0 |     4 |
| padding           | `5px 8px`                                         |        4 |          1 |           0 |             1 |             0 |     6 |
| padding           | `5px 9px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `6px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `6px 0`                                           |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `6px 0 3px`                                       |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `6px 12px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `6px 14px`                                        |        0 |          2 |           0 |             0 |             0 |     2 |
| padding           | `6px 7px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `6px 8px`                                         |        5 |          0 |           0 |             0 |             0 |     5 |
| padding           | `6px 9px`                                         |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `7px 0`                                           |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `7px 14px`                                        |        1 |          2 |           0 |             0 |             0 |     3 |
| padding           | `7px 8px`                                         |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `7px 9px`                                         |        3 |          0 |           0 |             0 |             0 |     3 |
| padding           | `8px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `8px 0`                                           |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `8px 10px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `8px 12px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `8px 12px 4px`                                    |        0 |          1 |           0 |             0 |             0 |     1 |
| padding           | `8px 14px`                                        |        0 |         13 |           0 |             0 |             0 |    13 |
| padding           | `8px 14px 5px`                                    |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `8px 6px 10px`                                    |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `8px 8px 3px`                                     |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `8px 9px`                                         |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `9px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `9px 0`                                           |        2 |          0 |           0 |             0 |             0 |     2 |
| padding           | `9px 10px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `9px 14px`                                        |        1 |          0 |           0 |             0 |             0 |     1 |
| padding-inline    | `10px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| padding-inline    | `11px`                                            |        4 |          0 |           0 |             0 |             0 |     4 |
| padding-inline    | `3px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| padding-inline    | `4px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding-inline    | `5px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| padding-inline    | `6px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding-inline    | `7px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| padding-inline    | `8px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| padding-top       | `4px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding-top       | `6px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| padding-top       | `9px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| right             | `0`                                               |        1 |          0 |           0 |             0 |             0 |     1 |
| right             | `14px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| right             | `16px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| right             | `3px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| right             | `8px`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| scroll-margin-top | `18px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| top               | `0`                                               |        4 |          1 |           0 |             0 |             1 |     6 |
| top               | `31px`                                            |        0 |          1 |           0 |             0 |             0 |     1 |
| top               | `3px`                                             |        1 |          0 |           0 |             0 |             0 |     1 |
| top               | `50%`                                             |        2 |          0 |           0 |             0 |             0 |     2 |
| top               | `50px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| top               | `52px`                                            |        1 |          0 |           0 |             0 |             0 |     1 |
| top               | `auto`                                            |        2 |          0 |           0 |             0 |             0 |     2 |
| top               | `calc(100% + 21px)`                               |        1 |          0 |           0 |             0 |             0 |     1 |
| top               | `calc(100% + 6px)`                                |        1 |          0 |           0 |             0 |             0 |     1 |
| top               | `calc(100% + 7px)`                                |        1 |          0 |           0 |             0 |             0 |     1 |
| padding           | `40px 10px`                                       |        0 |          0 |           1 |             0 |             0 |     1 |
