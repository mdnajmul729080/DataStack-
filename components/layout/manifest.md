# Layout Components Module Manifest

## Purpose
Global layout shell, navigation, top bar, and admin sidebar complying with compact, zero-border-radius, zero-shadow design system.

## Components
- **Navbar.tsx**: Top titlebar with brand, quick links, runtime port indicator (:4000/:3000), and dark/light theme switcher.
- **Sidebar.tsx**: Dedicated `/vcon/` admin console sidebar with mobile drawer support, grouped telemetry & management links.
- **Footer.tsx**: System runtime status line with storage convention display and port allocations.
- **MainLayout.tsx**: Viewport-bounded responsive shell with mobile backdrop and scrolling main container.

## Dependencies
- `components/ui`
- `next/link`
- `next/navigation`
