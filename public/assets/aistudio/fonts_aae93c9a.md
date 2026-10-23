# Sandbox Typography Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This is a forensic inventory of typography declarations only; it does not define or modify production design tokens.

The host stylesheet and each generated mock-tool iframe are separate style scopes. The iframe scope is not merged into host tokens. The audit parsed the host `<style>` block and the generated `toolFrameDoc()` styles for all 13 catalogue tools, including nested responsive rules. It also scanned literal `style="..."` attributes in generated markup.

| Source scope              | CSS declarations | Inline declarations | Notes                                                               |
| ------------------------- | ---------------: | ------------------: | ------------------------------------------------------------------- |
| Host workbench            |              416 |                   4 | Main application shell, views, responsive overrides                 |
| Mock-tool iframe previews |              185 |                   4 | One generated document per each of 13 catalogue tools               |
| Total                     |              601 |                   8 | 609 font-related declarations in the audited rendered/source scopes |

The 601 CSS declarations reduce to 54 host and 31 mock property/value groups. Occurrence counts below count literal CSS declarations across the host stylesheet and generated preview documents; repeated values are retained as counts. Inline declarations are listed separately. CSS shorthand declarations are preserved as shorthand, not expanded into inferred longhand tokens.

## Font Families

Exact values as written in CSS. `inherit` is an inheritance instruction, not a named font family.

| Scope       | Exact `font-family` value                                          | CSS occurrences |
| ----------- | ------------------------------------------------------------------ | --------------: |
| Host        | `-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif` |               1 |
| Host        | `inherit`                                                          |               2 |
| Host        | `ui-monospace,monospace`                                           |               6 |
| Host        | `ui-monospace,'SF Mono',Menlo,monospace`                           |               1 |
| Mock iframe | `-apple-system,system-ui,sans-serif`                               |              16 |
| Mock iframe | `inherit`                                                          |               5 |
| Mock iframe | `ui-monospace,"SF Mono",Menlo,monospace`                           |               1 |
| Mock iframe | `ui-monospace,"SF Mono",monospace`                                 |               1 |
| Mock iframe | `ui-monospace,monospace`                                           |              21 |

The host base stack is the system UI stack. Monospace stacks are used for code-like labels and content. Mock-tool stacks are local to their iframe documents and do not inherit the host stack across the iframe boundary.

## Font Sizes

All sizes are CSS pixels. Counts are literal stylesheet declarations, not computed or inherited sizes.

| Exact value | Host CSS | Mock iframe CSS |
| ----------- | -------: | --------------: |
| `8px`       |        1 |               0 |
| `9px`       |       11 |               1 |
| `9.5px`     |       18 |               1 |
| `10px`      |       32 |               2 |
| `10.5px`    |       33 |               3 |
| `11px`      |       26 |               4 |
| `11.5px`    |       27 |               0 |
| `12px`      |       26 |              21 |
| `12.5px`    |       18 |               3 |
| `13px`      |        6 |              10 |
| `13.5px`    |        5 |               0 |
| `14px`      |        3 |              10 |
| `15px`      |        3 |               2 |
| `16px`      |        0 |               2 |
| `16.5px`    |        1 |               0 |
| `17px`      |        3 |               0 |
| `18px`      |        5 |               1 |
| `19px`      |        2 |               0 |
| `20px`      |        1 |               0 |
| `21px`      |        1 |               0 |
| `22px`      |        3 |              16 |
| `23px`      |        1 |               0 |
| `24px`      |        1 |               0 |

## Font Weights

| Exact value | Host CSS | Mock iframe CSS |
| ----------- | -------: | --------------: |
| `400`       |        3 |               0 |
| `500`       |       10 |               5 |
| `600`       |       36 |               6 |
| `650`       |        2 |               0 |
| `700`       |       26 |              17 |
| `800`       |        1 |               0 |

## Font Shorthand And Rendering

| Scope | Property                 | Exact value                       | Occurrences |
| ----- | ------------------------ | --------------------------------- | ----------: |
| Host  | `font`                   | `inherit`                         |          30 |
| Host  | `font`                   | `700 10px ui-monospace,monospace` |           1 |
| Host  | `-webkit-font-smoothing` | `antialiased`                     |           1 |

The shorthand values above are kept verbatim. The `700 10px ui-monospace,monospace` shorthand declares weight, size, and family together.

## Letter Spacing

| Exact value | Host CSS | Mock iframe CSS |
| ----------- | -------: | --------------: |
| `-.01em`    |        1 |               1 |
| `-.02em`    |        2 |               0 |
| `.02em`     |        2 |               0 |
| `.04em`     |        2 |               0 |
| `.05em`     |        1 |               2 |
| `.06em`     |        5 |               4 |
| `.07em`     |        2 |               1 |
| `0`         |        2 |               2 |

## Line Heights

Unitless values are preserved as written.

| Exact value | Host CSS | Mock iframe CSS |
| ----------- | -------: | --------------: |
| `1`         |        1 |               0 |
| `1.25`      |        2 |               0 |
| `1.3`       |        1 |               0 |
| `1.4`       |        8 |               0 |
| `1.45`      |        7 |               0 |
| `1.5`       |       10 |               1 |
| `1.55`      |        3 |               0 |
| `1.6`       |        7 |              17 |
| `1.65`      |        0 |               1 |
| `1.7`       |        1 |               0 |

## Text Treatment

| Property          | Exact value | Host CSS | Mock iframe CSS |
| ----------------- | ----------- | -------: | --------------: |
| `text-transform`  | `none`      |        0 |               1 |
| `text-transform`  | `uppercase` |       10 |               7 |
| `text-decoration` | `underline` |        2 |               0 |

## Literal Inline Typography

These eight declarations are in generated HTML attributes rather than stylesheet rules. Counts are source-attribute declarations; values are already represented in the stylesheet tables where applicable.

| Scope       | Generated UI location               | Exact declarations                                               |
| ----------- | ----------------------------------- | ---------------------------------------------------------------- |
| Host        | Discover empty-results message      | `font-size:13px`                                                 |
| Host        | Tool-detail review count            | `font-size:12px; font-weight:400`                                |
| Host        | Tool-detail source URL              | `font-size:11px`                                                 |
| Mock iframe | JSON Formatter version/source label | `font-size:11px; font-family:-apple-system,system-ui,sans-serif` |
| Mock iframe | Color Picker palette caption        | `font-size:12px`                                                 |
| Mock iframe | Password Generator options row      | `font-size:13px`                                                 |

## Mock Preview Ownership

The isolated preview styles are generated by `jsonToolDoc()`, `colorToolDoc()`, `passwordToolDoc()`, `textCaseToolDoc()`, `sqlStudioToolDoc()`, and `genericToolDoc()`. The generic document is used by Base64 Encoder, Image Compressor, Markdown Editor, QR Code Generator, Unit Converter, Hash Generator, SVG Optimizer, and Cron Parser. All preview typography remains iframe-local.

## Coverage Notes

- Included host CSS, media-query overrides, generated iframe styles, font shorthand, inheritance declarations, text treatment, and literal inline typography attributes.
- No font download, `@font-face`, external web-font import, or custom font asset is declared in the audited HTML; rendering relies on the listed platform/system fallback stacks.
- Color, spacing, dimensions, and other non-typographic tokens are outside this file's scope.
- Counts describe the canonical source at audit time. They are not production token names and should be regenerated if `sandbox/index.html` changes.
