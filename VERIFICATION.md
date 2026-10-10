# Verification — 2026-10-10

- `npm run build`: passed (Vinext/React build).
- TypeScript: passed, no errors.
- ESLint: passed, no errors or warnings. The shared app layout documents its intentional Google Fonts link.
- Media tests: passed for WebP conversion, transparency, no upscaling, aspect ratios, EXIF orientation, incremental caching, and conflicting filenames.
- Content tests: passed for Bilibili URL validation, source parameters, project IDs, categories, asset references, and Next Project loops.
- All five top-level pages and ten project routes returned 200; missing project returned 404.
- Browser widths: 2560, 1920, 1440, 1280, 1024, 768, 390, and 320px. No horizontal page overflow in checked layouts.
- Browser interactions: design/video filters, empty filter state, carousel buttons, keyboard, mouse drag, mobile touch swipe, expanded artwork, Escape, Next Project, mobile navigation, and contact-form validation passed.
- PDF: download returned a valid PDF; one-page template rendered and visually reviewed.
- Phone image selection: 960px WebP at the tested mobile viewport, not the 1920px version.
- No Bilibili iframes loaded before user action. No browser runtime errors in the test run.

## Remaining content dependencies

The current artwork, biography, tools list, and resume are labelled examples/templates. Actual work history, education, portrait, real PDF resume, and Bilibili video links have not been supplied. Real Bilibili playback cannot be verified until a valid project link is added. The contact form prepares an email draft; the reserved delivery API explicitly returns 501 until a mail provider is configured.

The checks are functional and layout checks, not a production Lighthouse/Core Web Vitals score.

## Stitch revision — 2026-10-10

All seven reference PNGs (2560px wide) and HTML files downloaded and inspected. Applied the reference editorial system across all page types; see STITCH-DESIGN.md.

TypeScript, ESLint, content/media tests and Vinext build passed. Browser regression checks passed at 2560/1920/1440/1280/1024/768/390/320px, with no page overflow or runtime errors. Filters, empty state, carousel arrows/keyboard/drag/touch, expansion/Escape, next project, mobile menu, form validation and resume download passed. Fixed long project-title wrapping at 320px. Desktop and phone screenshots visually reviewed.
