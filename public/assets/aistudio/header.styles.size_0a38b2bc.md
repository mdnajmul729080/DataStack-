# Sandbox Header Styles And Size Tokens

## Audit Scope

Source: canonical [`sandbox/index.html`](../index.html). This review-only ledger records the complete authored styling for header and title surfaces in the host workbench and its 13 generated mock-tool previews. The host scope includes titlebar/tab chrome, page and feature headings, dialog/panel heading rows, Profile and Tool Detail identity blocks, runner chrome, offline notices, and the header controls attached to those surfaces. Host sidebar headings/cards are cross-referenced to [`sidebar.styles.size.md`](sidebar.styles.size.md) and are not double-counted here.

The iframe scope includes semantic headers, tool titles/subtitles, labeled pane headings, SQL Studio's title/toolbar/tabs/editor/results headings, and their responsive overrides. The Password Generator strength meter (`.bar`) is a progress indicator, not a header, and is excluded. The titlebar navigation/search menu bodies are separate overlay surfaces; only titlebar chrome is listed.

The declarations below preserve authored values, selector text, and media context. Typography cross-references are available in [`fonts.md`](fonts.md) and [`fonts.size.md`](fonts.size.md); button and page geometry details are additionally indexed in [`buttons.size.md`](buttons.size.md) and [`Pages.size.md`](Pages.size.md). Host and iframe tokens remain separate and are not production design tokens.

## Host Header And Chrome Rules

The source scan matched 150 in-scope host rule groups containing 530 declarations. The stylesheet has separate mobile media blocks, so repeated selector/media pairs are retained as separate source rules and in source order.

| Selector | Media | Exact declarations |
| --- | --- | --- |
| `.titlebar` | base | `position:relative; height:40px; flex:0 0 40px; display:grid; grid-template-columns:minmax(0,1fr) minmax(140px,auto) minmax(0,1fr); align-items:center; gap:16px; padding:0 14px; background:var(--bg-activity); border-bottom:1px solid var(--border); user-select:none` |
| `.titlebar-brand` | base | `display:flex; align-items:center; gap:9px; min-width:0; font-size:11.5px; font-weight:700; letter-spacing:.04em; color:var(--text)` |
| `.titlebar-mark` | base | `width:20px; height:20px; display:grid; place-items:center; border-radius:5px; background:var(--accent); color:var(--text-on-accent); font-size:11px; font-weight:800` |
| `.titlebar-divider` | base | `width:1px; height:16px; background:var(--border-strong); margin:0 2px` |
| `.titlebar-workspace` | base | `position:relative; min-width:0; color:var(--text-dim); font-size:11px; font-weight:500; letter-spacing:0` |
| `.titlebar-document` | base | `min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-align:center; color:var(--text-muted); font-size:12px` |
| `.titlebar-tools` | base | `display:flex; align-items:center; justify-content:flex-end; gap:6px; min-width:0` |
| `.titlebar-theme-toggle` | base | `width:32px; height:32px; flex:none; display:grid; place-items:center; border:1px solid transparent; border-radius:6px; background:transparent; color:var(--text-muted); transition:background .16s ease,color .16s ease,border-color .16s ease` |
| `.titlebar-theme-toggle:hover` | base | `background:var(--bg-hover); color:var(--text); border-color:var(--border-strong)` |
| `.titlebar-theme-toggle:focus-visible` | base | `outline:2px solid var(--accent-hover); outline-offset:2px` |
| `.titlebar-theme-toggle svg` | base | `width:15px; height:15px; flex:none` |
| `.titlebar-search` | base | `height:32px; display:flex; align-items:center; gap:8px; border:1px solid var(--border); border-radius:6px; background:var(--bg-main); color:var(--text-muted); padding:0 10px; font-size:11.5px; transition:background .16s ease,color .16s ease,border-color .16s ease,box-shadow .16s ease` |
| `.titlebar-search:hover` | base | `background:var(--bg-hover); color:var(--text); border-color:var(--border-strong)` |
| `.titlebar-search[aria-expanded="true"]` | base | `border-color:var(--accent); color:var(--text); background:var(--bg-hover)` |
| `.titlebar-search svg` | base | `width:14px; height:14px; flex:none` |
| `.titlebar-search kbd` | base | `font:inherit; font-size:9.5px; color:var(--text-dim); border:1px solid var(--border-strong); border-radius:4px; padding:2px 4px; margin-left:3px` |
| `.titlebar-search:focus-visible,.titlebar-menu-toggle:focus-visible` | base | `outline:2px solid var(--accent-hover); outline-offset:2px` |
| `.titlebar-menu-toggle` | base | `display:none; width:32px; height:32px; place-items:center; border:0; border-radius:6px; background:transparent; color:var(--text-muted); transition:background .16s ease,color .16s ease` |
| `.titlebar-menu-toggle:hover,.titlebar-menu-toggle[aria-expanded="true"]` | base | `background:var(--bg-hover); color:var(--text)` |
| `.titlebar-menu-toggle svg` | base | `width:16px; height:16px` |
| `.tabbar` | base | `height:34px; flex:0 0 34px; display:flex; align-items:stretch; background:var(--bg-sidebar); border-bottom:1px solid var(--border); overflow-x:auto; overflow-y:hidden; scrollbar-width:none` |
| `.tabbar::-webkit-scrollbar` | base | `display:none` |
| `.tab` | base | `display:flex; align-items:center; gap:7px; padding:0 8px 0 12px; font-size:12px; color:var(--text-muted); border-right:1px solid var(--border); cursor:pointer; white-space:nowrap; position:relative; max-width:200px; transition:background .12s,color .12s` |
| `.tab:hover` | base | `background:var(--bg-hover); color:var(--text)` |
| `.tab.active` | base | `background:var(--bg-main); color:var(--text)` |
| `.tab.active::before` | base | `content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--accent)` |
| `.tab:hover .tab-close,.tab.active .tab-close` | base | `opacity:1` |
| `.page-header` | base | `display:flex; align-items:flex-start; justify-content:space-between; gap:20px; margin-bottom:26px; flex-wrap:wrap` |
| `.page-header h1` | base | `font-size:23px; font-weight:700; letter-spacing:-.02em; margin-bottom:5px` |
| `.subtitle` | base | `font-size:13.5px; color:var(--text-muted); line-height:1.5; max-width:560px` |
| `.header-actions` | base | `display:flex; gap:8px; flex-shrink:0` |
| `.workspace-hero` | base | `display:flex; align-items:flex-start; justify-content:space-between; gap:20px; padding:22px 24px; margin-bottom:18px; border:1px solid var(--border); border-radius:8px; background:var(--bg-elevated)` |
| `.workspace-hero.is-populated` | base | `padding:14px 18px; margin-bottom:12px; background:var(--bg-main)` |
| `.workspace-eyebrow` | base | `margin-bottom:7px; color:var(--accent); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.06em` |
| `.workspace-hero h1` | base | `font-size:22px; font-weight:700; margin-bottom:7px` |
| `.workspace-hero p` | base | `color:var(--text-muted); font-size:12.5px; line-height:1.6` |
| `.workspace-hero.is-populated .workspace-eyebrow` | base | `margin-bottom:4px` |
| `.workspace-hero.is-populated h1` | base | `font-size:18px; margin-bottom:4px` |
| `.workspace-hero.is-populated p` | base | `font-size:11.5px` |
| `.workspace-section-head` | base | `display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px` |
| `.workspace-section-head h2` | base | `font-size:14px; font-weight:600` |
| `.workspace-section-head span` | base | `color:var(--text-dim); font-size:10.5px` |
| `.teams-header` | base | `display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px` |
| `.teams-header h1` | base | `display:flex; align-items:center; gap:8px; font-size:21px; font-weight:700; margin-bottom:5px` |
| `.teams-header p` | base | `color:var(--text-muted); font-size:12px; line-height:1.55` |
| `.team-header-copy` | base | `min-width:0` |
| `.team-name-inline` | base | `display:inline-flex; align-items:center; gap:5px; margin:0 0 6px; padding:0; border:0; background:transparent; color:var(--text); font:inherit; font-size:12px; font-weight:600; cursor:pointer` |
| `.team-name-inline:hover` | base | `color:var(--accent-hover)` |
| `.teams-header-actions` | base | `display:flex; align-items:center; gap:7px; flex:none` |
| `.team-name-slot` | base | `min-height:28px` |
| `.team-panel-head-inset` | base | `padding:14px 14px 0` |
| `.team-panel-head` | base | `display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px` |
| `.team-panel-head h2` | base | `font-size:13px; font-weight:600` |
| `.team-panel-head span` | base | `color:var(--text-dim); font-size:10px` |
| `.section-head` | base | `display:flex; align-items:baseline; justify-content:space-between; margin-bottom:14px` |
| `.section-head h2` | base | `font-size:16.5px; font-weight:600; letter-spacing:-.01em` |
| `.section-head .muted` | base | `font-size:11.5px; color:var(--text-dim)` |
| `.prototype-modal-head` | base | `position:sticky; top:0; z-index:1; display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:14px 16px; border-bottom:1px solid var(--border); background:var(--bg-elevated)` |
| `.prototype-modal-head h2` | base | `font-size:15px; font-weight:650` |
| `.prototype-modal-head p` | base | `margin-top:3px; color:var(--text-muted); font-size:10.5px; line-height:1.45` |
| `.collection-tools-head` | base | `display:flex; align-items:center; justify-content:space-between; gap:10px; margin:16px 0 9px` |
| `.collection-tools-head h2` | base | `font-size:13px; font-weight:600` |
| `.collection-tools-head span` | base | `color:var(--text-dim); font-size:10px` |
| `.collection-add-head` | base | `display:flex; align-items:center; justify-content:space-between; gap:10px` |
| `.collection-add-head h2` | base | `font-size:12px; font-weight:600` |
| `.collection-add-head p` | base | `margin-top:3px; color:var(--text-dim); font-size:10px; line-height:1.4` |
| `.detail-hero` | base | `display:flex; gap:20px; margin-bottom:28px; flex-wrap:wrap` |
| `.detail-info` | base | `flex:1; min-width:260px` |
| `.detail-copy` | base | `min-width:0` |
| `.detail-info h1` | base | `font-size:22px; font-weight:700; letter-spacing:-.02em; margin-bottom:8px` |
| `.meta-row` | base | `display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:10px; font-size:12px` |
| `.meta-row .cat` | base | `color:var(--text-dim); text-transform:uppercase; letter-spacing:.06em; font-weight:600; font-size:11px` |
| `.meta-row .rt` | base | `display:flex; align-items:center; gap:4px; color:var(--yellow); font-weight:600` |
| `.meta-row .rt span` | base | `color:var(--text-muted); font-weight:400` |
| `.detail-info .desc` | base | `font-size:13.5px; color:var(--text-muted); line-height:1.6; margin-bottom:16px; max-width:600px` |
| `.detail-actions` | base | `display:flex; gap:8px; flex-wrap:wrap` |
| `.review-composer-head` | base | `display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px` |
| `.review-composer-head strong` | base | `font-size:12px; font-weight:600` |
| `.review-composer-head span` | base | `color:var(--text-dim); font-size:10px` |
| `.runner-top` | base | `height:46px; flex-shrink:0; display:none; align-items:center; gap:10px; padding:0 12px; background:var(--bg-sidebar); border-bottom:1px solid var(--border)` |
| `.runner-top.show` | base | `display:flex` |
| `.runner-tool` | base | `display:flex; align-items:center; gap:9px; min-width:0` |
| `.runner-title` | base | `font-size:13px; font-weight:600; line-height:1.25` |
| `.runner-url` | base | `font-size:10.5px; color:var(--text-dim); font-family:ui-monospace,monospace` |
| `.runner-actions` | base | `margin-left:auto; display:flex; align-items:center; gap:4px` |
| `.runner-actions .badge` | base | `flex-shrink:0; white-space:nowrap` |
| `.offline-banner` | base | `display:flex; align-items:center; gap:9px; background:var(--warning-soft); border:1px solid var(--warning-border); color:var(--warning-text); font-size:12.5px; padding:9px 14px; border-radius:8px; margin-bottom:20px` |
| `.profile-hero` | base | `display:grid; grid-template-columns:56px minmax(0,1fr) auto; align-items:center; gap:10px 14px; background:var(--bg-elevated); border:1px solid var(--border); border-radius:8px; padding:14px 16px; margin-bottom:14px` |
| `.profile-identity` | base | `min-width:0` |
| `.profile-identity h1` | base | `font-size:20px; font-weight:700; margin-bottom:2px` |
| `.profile-title-row` | base | `display:flex; align-items:center; gap:8px; min-width:0; flex-wrap:wrap` |
| `.profile-title-row h1` | base | `min-width:0; max-width:100%; overflow-wrap:anywhere; white-space:normal; margin-bottom:0` |
| `.profile-title-row .profile-pill` | base | `flex:none; padding:3px 7px; font-size:9.5px` |
| `.profile-panel-head` | base | `display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px` |
| `.profile-panel-head h2` | base | `margin:0` |
| `.profile-review-head` | base | `display:flex; align-items:center; gap:8px; margin-bottom:7px` |
| `.profile-review-head strong` | base | `font-size:12px` |
| `.profile-review-head span` | base | `margin-left:auto; color:var(--yellow); font-size:11px` |
| `.settings-intro` | base | `margin-bottom:18px` |
| `.settings-intro h1` | base | `font-size:22px; font-weight:700; margin-bottom:4px` |
| `.settings-intro p` | base | `font-size:12.5px; color:var(--text-muted); line-height:1.5; max-width:620px` |
| `.settings-section-head` | base | `display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:5px` |
| `.settings-section-head h2` | base | `font-size:13px; font-weight:650; color:var(--text)` |
| `.settings-section-head p` | base | `font-size:11px; color:var(--text-dim); line-height:1.45; margin-top:3px` |
| `.titlebar` | `(max-width:640px)` | `height:44px; flex-basis:44px; grid-template-columns:auto minmax(0,1fr) auto; gap:10px; padding-inline:10px` |
| `.titlebar-menu-toggle` | `(max-width:640px)` | `display:grid` |
| `.titlebar-divider,.titlebar-search kbd` | `(max-width:640px)` | `display:none` |
| `.titlebar-workspace` | `(max-width:640px)` | `display:block; min-width:0` |
| `.titlebar-document` | `(max-width:640px)` | `text-align:center; font-size:12px; padding-inline:4px` |
| `.titlebar-search` | `(max-width:640px)` | `width:34px; height:34px; justify-content:center; padding:0; border-radius:8px` |
| `.titlebar-theme-toggle` | `(max-width:640px)` | `width:34px; height:34px; border-radius:8px` |
| `.titlebar-search .titlebar-search-label` | `(max-width:640px)` | `display:none` |
| `.runner-top.show` | `(max-width:640px)` | `height:46px; min-height:46px; display:flex; gap:4px; padding:0 6px` |
| `.runner-tool` | `(max-width:640px)` | `width:auto; flex:1; gap:5px` |
| `.runner-title` | `(max-width:640px)` | `overflow:hidden; white-space:nowrap` |
| `.runner-url` | `(max-width:640px)` | `display:none` |
| `.runner-actions` | `(max-width:640px)` | `flex:none; gap:2px; margin-left:0` |
| `.runner-actions .icon-btn` | `(max-width:640px)` | `width:26px; height:30px; flex:0 0 26px` |
| `.runner-actions .badge` | `(max-width:640px)` | `font-size:9px; padding-inline:5px` |
| `.detail-hero` | `(max-width:640px)` | `display:grid; grid-template-columns:52px minmax(0,1fr); align-items:start; gap:12px; margin-bottom:22px` |
| `.detail-info` | `(max-width:640px)` | `display:contents; min-width:0` |
| `.detail-info h1` | `(max-width:640px)` | `font-size:18px; line-height:1.25; margin-bottom:6px` |
| `.meta-row` | `(max-width:640px)` | `gap:6px; margin-bottom:7px; font-size:11px` |
| `.meta-row .cat` | `(max-width:640px)` | `font-size:10px` |
| `.detail-info .desc` | `(max-width:640px)` | `font-size:12.5px; line-height:1.5; margin-bottom:0` |
| `.detail-actions` | `(max-width:640px)` | `grid-column:1/-1; display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto; gap:6px` |
| `.detail-actions .btn` | `(max-width:640px)` | `height:32px; min-width:0; justify-content:center; padding-inline:8px; font-size:11px; white-space:nowrap` |
| `.workspace-hero` | `(max-width:640px)` | `display:block; padding:16px` |
| `.workspace-hero h1` | `(max-width:640px)` | `font-size:19px` |
| `.workspace-hero.is-populated` | `(max-width:640px)` | `padding:12px 14px` |
| `.workspace-hero.is-populated h1` | `(max-width:640px)` | `font-size:17px` |
| `.teams-header` | `(max-width:640px)` | `display:grid; gap:10px` |
| `.teams-header` | `(max-width:640px)` | `align-items:flex-start` |
| `.teams-header-actions` | `(max-width:640px)` | `width:100%` |
| `.profile-hero` | `(max-width:640px)` | `grid-template-columns:48px minmax(0,1fr); align-items:start; padding:12px; gap:8px 11px` |
| `.profile-identity` | `(max-width:640px)` | `min-width:0` |
| `.profile-identity h1` | `(max-width:640px)` | `font-size:18px` |
| `.workspace-hero.is-populated` | `(max-width:640px)` | `padding:10px 12px; margin-bottom:8px` |
| `.workspace-section-head` | `(max-width:640px)` | `margin-bottom:7px` |
| `.teams-header` | `(max-width:640px)` | `gap:6px; margin-bottom:12px` |
| `.teams-header h1` | `(max-width:640px)` | `font-size:18px; margin-bottom:3px` |
| `.teams-header p` | `(max-width:640px)` | `font-size:11px; line-height:1.4` |
| `.team-panel-head-inset` | `(max-width:640px)` | `padding:10px 10px 0` |
| `.team-panel-head` | `(max-width:640px)` | `gap:8px; margin-bottom:8px` |
| `.settings-intro` | `(max-width:640px)` | `margin-bottom:12px` |
| `.settings-intro h1` | `(max-width:640px)` | `font-size:19px; margin-bottom:3px` |
| `.settings-intro p` | `(max-width:640px)` | `font-size:11px; line-height:1.4` |
| `.settings-section-head` | `(max-width:640px)` | `gap:8px; margin-bottom:3px` |
| `.settings-section-head h2` | `(max-width:640px)` | `font-size:12px` |
| `.settings-section-head p` | `(max-width:640px)` | `font-size:10px; line-height:1.4` |

## Generated Mock-Tool Preview Headers

Each generated preview is an isolated CSS document. The current source scan matched 33 rule groups containing 135 declarations across 13 tool documents. Repeated generic `h1` rules remain associated with their tool; responsive iframe rules retain their own media condition.

| Preview scope | Selector | Media | Exact declarations |
| --- | --- | --- | --- |
| `iframe:json-formatter` | `header` | base | `padding:14px 18px; border-bottom:1px solid var(--frame-border); display:flex; align-items:center; gap:10px; background:var(--frame-header)` |
| `iframe:json-formatter` | `header h1` | base | `font-size:15px; margin:0; font-family:-apple-system,system-ui,sans-serif; font-weight:600` |
| `iframe:json-formatter` | `.bar` | base | `padding:10px 18px; display:flex; gap:8px; border-bottom:1px solid var(--frame-border); background:var(--frame-header)` |
| `iframe:json-formatter` | `.pane label` | base | `font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:var(--frame-muted); padding:8px 14px; background:var(--frame-header); font-family:-apple-system,system-ui,sans-serif` |
| `iframe:base64` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:color-picker` | `header` | base | `padding:16px 20px; border-bottom:1px solid var(--frame-border); background:var(--frame-surface); display:flex; align-items:center; gap:10px` |
| `iframe:color-picker` | `header h1` | base | `font-size:16px; margin:0; font-weight:700` |
| `iframe:color-picker` | `header span` | base | `font-size:12px; color:var(--frame-muted); margin-left:auto` |
| `iframe:color-picker` | `header` | `(max-width:520px)` | `padding:12px 16px` |
| `iframe:color-picker` | `header span` | `(max-width:520px)` | `display:none` |
| `iframe:image-compressor` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:markdown` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:qr-generator` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:password-generator` | `h1` | base | `margin:0 0 4px; font-size:18px` |
| `iframe:unit-converter` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:text-case` | `header` | base | `padding:16px 20px; border-bottom:1px solid var(--frame-border); display:flex; align-items:center; gap:10px` |
| `iframe:text-case` | `header h1` | base | `font-size:16px; margin:0; font-weight:700` |
| `iframe:text-case` | `header span` | base | `font-size:12px; color:var(--frame-muted); margin-left:auto` |
| `iframe:text-case` | `.pane label` | base | `font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:var(--frame-muted); padding:10px 20px; font-weight:600` |
| `iframe:hash-generator` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:svg-optimizer` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:cron-parser` | `h1` | base | `font-size:22px; margin:0 0 8px` |
| `iframe:sql-studio` | `.sb-header` | base | `padding:14px 14px 10px; border-bottom:1px solid var(--frame-border); display:flex; align-items:center; gap:9px` |
| `iframe:sql-studio` | `.sb-title` | base | `font-size:13px; font-weight:700; letter-spacing:-.01em` |
| `iframe:sql-studio` | `.toolbar` | base | `height:42px; flex-shrink:0; background:var(--frame-panel); border-bottom:1px solid var(--frame-border); display:flex; align-items:center; gap:6px; padding:0 12px` |
| `iframe:sql-studio` | `.tab-sm` | base | `padding:5px 12px; border-radius:5px; background:transparent; color:var(--frame-soft); font-size:12px; font-weight:500; display:flex; align-items:center; gap:6px; cursor:pointer; transition:background .12s` |
| `iframe:sql-studio` | `.tab-sm:hover` | base | `background:var(--frame-surface)` |
| `iframe:sql-studio` | `.tab-sm.active` | base | `background:var(--frame-accent-bg); color:var(--frame-accent-text)` |
| `iframe:sql-studio` | `.tab-sm .dot` | base | `width:6px; height:6px; border-radius:50%; background:var(--frame-muted)` |
| `iframe:sql-studio` | `.tab-sm.active .dot` | base | `background:var(--frame-accent-icon)` |
| `iframe:sql-studio` | `.editor-head` | base | `padding:7px 14px; font-size:10.5px; text-transform:uppercase; letter-spacing:.06em; color:var(--frame-muted); font-weight:700; border-bottom:1px solid var(--frame-border); display:flex; align-items:center; gap:8px; background:var(--frame-panel)` |
| `iframe:sql-studio` | `.editor-head .dot` | base | `width:6px; height:6px; border-radius:50%; background:var(--frame-success)` |
| `iframe:sql-studio` | `.res-head` | base | `padding:8px 14px; font-size:10.5px; text-transform:uppercase; letter-spacing:.06em; color:var(--frame-muted); font-weight:700; border-bottom:1px solid var(--frame-border); display:flex; align-items:center; gap:12px; position:sticky; top:0; background:var(--frame-panel); z-index:3` |

## Header-Scoped Inline Styles

The host renderer sample yielded 41 inline style attributes across the patterns below. Counts are rendered occurrences; identical source patterns are listed once. Empty `style` attributes contain no authored declarations. Dynamic tool/identity background expressions are preserved literally and not resolved to runtime colors.

| Host element/pattern | Exact inline style source | Rendered occurrences |
| --- | --- | ---: |
| `div.tabbar` | `display: flex;` | 1 |
| `div.profile-avatar` | `background:var(--avatar-indigo)` | 2 |
| `div.profile-avatar` | `background:var(--avatar-pink)` | 1 |
| `div.profile-avatar` | `background:var(--avatar-green)` | 1 |
| `div.runner-glyph` | `background:var(--tool-json-formatter)` | 1 |
| `button.icon-btn` | `color:var(--yellow)` | 3 |
| `div.detail-glyph` | `background:var(--tool-base64)` | 1 |
| `div.runner-glyph` | `background:var(--tool-base64)` | 1 |
| `button.icon-btn` | empty `style` attribute | 10 |
| `div.detail-glyph` | `background:var(--tool-color-picker)` | 1 |
| `div.runner-glyph` | `background:var(--tool-color-picker)` | 1 |
| `div.detail-glyph` | `background:var(--tool-image-compressor)` | 1 |
| `div.runner-glyph` | `background:var(--tool-image-compressor)` | 1 |
| `div.detail-glyph` | `background:var(--tool-markdown)` | 1 |
| `div.runner-glyph` | `background:var(--tool-markdown)` | 1 |
| `div.detail-glyph` | `background:var(--tool-qr-generator)` | 1 |
| `div.runner-glyph` | `background:var(--tool-qr-generator)` | 1 |
| `div.detail-glyph` | `background:var(--tool-password-generator)` | 1 |
| `div.runner-glyph` | `background:var(--tool-password-generator)` | 1 |
| `div.detail-glyph` | `background:var(--tool-unit-converter)` | 1 |
| `div.runner-glyph` | `background:var(--tool-unit-converter)` | 1 |
| `div.runner-glyph` | `background:var(--tool-text-case)` | 1 |
| `div.detail-glyph` | `background:var(--tool-hash-generator)` | 1 |
| `div.runner-glyph` | `background:var(--tool-hash-generator)` | 1 |
| `div.detail-glyph` | `background:var(--tool-svg-optimizer)` | 1 |
| `div.runner-glyph` | `background:var(--tool-svg-optimizer)` | 1 |
| `div.detail-glyph` | `background:var(--tool-cron-parser)` | 1 |
| `div.runner-glyph` | `background:var(--tool-cron-parser)` | 1 |
| `div.runner-glyph` | `background:var(--tool-sql-studio)` | 1 |

Two inline declarations were found in generated previews: `iframe:json-formatter` header source label (`margin-left:auto;font-size:11px;color:var(--frame-muted);font-family:-apple-system,system-ui,sans-serif`) and `iframe:sql-studio` tab (`padding:5px 8px;color:var(--frame-muted)`). No other header-scoped iframe inline style attributes were found.

## Coverage And Reconciliation

- The canonical host stylesheet and every generated preview stylesheet for the 13 catalogue tools were parsed separately. The in-scope CSS rows above reconcile to 150 host groups/530 declarations and 33 iframe groups/135 declarations.
- The host selector union excludes seven sidebar-only rules (`.side-title`, `.side-title .hint`, `.workspace-sidebar-card` and its descendants, `.profile-side-card`, and `.profile-side-group`); those are in [`sidebar.styles.size.md`](sidebar.styles.size.md). The Password Generator strength-meter `.bar` rules are excluded because they are not a heading or header surface.
- The 41 host inline style instances are represented by 29 source-pattern rows; two inline preview style instances are recorded separately.
- CSS declarations remain literal, including variable references, pseudo/states, and media conditions. Browser-computed values and inherited defaults are not substituted.
- This is a documentation-only source audit. No sandbox HTML or production UI/styles were changed; refresh the ledger when `sandbox/index.html` header surfaces change.
