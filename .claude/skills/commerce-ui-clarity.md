# Skill: Commerce UI (Clarity & Trust)

## Goal

Build clean, intuitive commerce interfaces that maximize clarity, trust, and conversion.

## Core Principles

- Clarity > novelty. Trust > decoration. Speed > fancy motion.
- Make pages scannable: strong hierarchy, consistent spacing, predictable patterns.
- Optimize the purchase path: discover -> evaluate -> buy.

## Information Hierarchy (Product)

- Always show above the fold:
  - Product name
  - Price (and discount if any)
  - Primary CTA (Add to cart / Buy now)
  - Key fulfillment info (shipping/arrival/stock) if available
- Use consistent formatting for price, discount, and badges.

## CTA Rules

- One primary action per view (single "primary" button).
- Button labels must be explicit and action-oriented:
  - "Add to cart", "Buy now", "Proceed to checkout"
- Disable/guard CTA when invalid state (e.g., out of stock), with a clear reason.

## Forms & Errors

- Inline validation with clear, human messages.
- Never rely only on color to indicate errors.
- Always include: loading, error, empty states.
- Provide retry on recoverable errors.

## Lists (Catalog/Search)

- Support: search, sort, filter (when relevant).
- Keep filters simple; show applied filters as removable chips.
- Pagination/infinite scroll must preserve scroll position and back navigation.

## Layout & Visual Style (Tailwind)

- Minimal palette, high contrast, generous whitespace.
- Avoid heavy gradients, glassmorphism, excessive shadows, noisy backgrounds.
- Use typography scale consistently; do not overuse display fonts.

## Accessibility

- Keyboard navigable, visible focus states.
- Proper semantic HTML, aria labels for icon buttons.
- Inputs have labels; error messages are associated with fields.

## Performance & Perceived Speed

- Use skeletons matching final layout (prevent CLS).
- Avoid layout shifts; reserve space for images and async blocks.
- Defer non-critical UI and expensive components.

## Checklist

- Is the page usable in 5 seconds by a first-time user?
- Is the primary action obvious?
- Are price/shipping/stock clear?
- Are loading/error/empty states implemented?
- No gimmicky animations or visual noise?
- Keyboard + screen reader basics covered?
