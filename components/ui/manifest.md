# UI Components Module Manifest

## Purpose
Unified, zero-pill, zero-shadow compact UI design system following the DataStack design guidelines.

## Components
- **Button.tsx**: Standardised buttons with size variants (default 32px, sm 27px, xs 24px, icon 30px), zero border-radius, outline focus.
- **Input.tsx**: Inputs, Textareas, and Selects with consistent border token and Segoe UI typography.
- **Card.tsx**: Structured data container surfaces with zero radius, 1px subtle borders, and header/content/footer partitions.
- **Modal.tsx**: Accessible dialogs with key listener (Escape), backdrop blur, and flexible action footers.
- **Table.tsx**: Compact fixed data tables for real-time streams, client listings, and export jobs.
- **Form.tsx**: Form wrappers, switch toggles, and multi-column row layouts.
- **Text.tsx**: Typography engine providing hierarchy (h1, h2, h3, body, muted, dim, label, code, badge).
- **Icon.tsx**: Lucide-react wrapper for icon rendering.
- **Toast.tsx**: Real-time notification and error/success/warning report system.

## Dependencies
- `lucide-react`
- `@/lib/utils` (clsx + tailwind-merge)
