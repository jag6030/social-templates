# Jenn Gabel Real Estate — Brand Style Guide social_posts folder
*Reference for all social media templates and digital content*

---

## Fonts

| Role | Family | Weight |
|------|--------|--------|
| Body / UI | Inter | 100–900 |
| Headings / Accent | Playfair Display | 400 |

**Google Fonts import:**
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&display=swap");
```

---

## Colors

### Blues (Primary Brand)
| Name | Hex | Use |
|------|-----|-----|
| Primary Blue | `#1f75ff` | Buttons, CTAs, links |
| Dark Blue | `#014fca` | Text buttons, hover states |
| Blue Highlight | `#3e6bf2` | Accents, highlights |

### Gold (Luxury / Accent)
| Name | Hex | Use |
|------|-----|-----|
| Gold Primary | `#a67c00` | Luxury badge, borders |
| Gold Dark | `#6a5b16` | Text on light backgrounds |
| Gold Light | `#ffd870` | Background fills |
| Gold Lite | `#e6c352` | Testimonial stars |

### Backgrounds
| Name | Hex | Use |
|------|-----|-----|
| BG Very Light | `#f8f9fc` | Page backgrounds |
| BG Light | `#f0f4f7` | Section fills, cards |

### Text
| Name | Hex | Use |
|------|-----|-----|
| Text Dark | `#222` | Headlines, primary copy |
| Text Medium | `#444` | Body copy |
| Text Light | `#666` | Captions, labels |
| Text White | `#ffffff` | On dark/colored backgrounds |

---

## Template Color Assignments

### Just Listed / Open House / Closed Templates
These use the website brand palette — not the newspaper town colors.

| Element | Color |
|---------|-------|
| Primary CTA button | `#1f75ff` |
| Luxury badge / HOA flag | `#a67c00` |
| Card background | `#f8f9fc` |
| Headline text | `#222` |
| Body text | `#444` |
| Footer bar | `#1f75ff` or `#014fca` |

### Community Post (Newspaper Template)
Intentionally uses its own newspaper aesthetic — town colors drive the color bands. Brand fonts (Playfair Display) are already shared. This is by design — the Community Post is editorial content, not a listing flyer.

---

## Gold Stripe

Decorative divider — appears between sections on the website. Use in templates to signal luxury or separate header from body.

```css
.gold-stripe {
  background: linear-gradient(
    90deg,
    #6a5b16 0%,
    #a68a3c 25%,
    #ffd870 50%,
    #a68a3c 75%,
    #6a5b16 100%
  );
  height: 0.38rem;
}
```

---

## Buttons

### Blue Button — Primary CTA
- Font: Inter 500 | Letter spacing: 1px | Border radius: 0.5rem
- Background: `#1f75ff` → hover `#0798fd` | Text: white
- Padding: `0.875em 1.5em`

```css
.btn-blue {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  padding: .875em 1.5em;
  border-radius: 0.5rem;
  background-color: #1f75ff;
  color: #ffffff;
  border: none;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.btn-blue:hover { background-color: #0798fd; }
```

### White Button — Secondary CTA
- Font: Inter 500 | Background: white | Text: `#014fca`
- Border: `4px solid transparent` → hover `4px solid #1f75ff`
- Padding: `1em 2em`

```css
.btn-white {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  padding: 1em 2em;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #014fca;
  border: 4px solid transparent;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-white:hover {
  background-color: rgba(255,255,255,0.9);
  border: 4px solid #1f75ff;
}
```

---

## Template Usage Quick Reference

| Element | Style |
|---------|-------|
| Primary CTA ("Schedule a Tour") | Blue button |
| Secondary CTA ("Learn More") | White button |
| Section divider on listing templates | Gold stripe |
| HOA / Luxury badge | `#a67c00` text on `#ffd870` bg |
| Open House header accent | Gold stripe below title bar |

---

## Layout & Spacing
- Border radius: `8px`
- Box shadow: `0 4px 8px rgba(0,0,0,0.1)`
- Max width large: `75rem` (1200px)
- Max width medium: `50rem` (800px)
- Max width small: `40.625rem` (650px)
- Section padding: `30px`

---

## Voice & Compliance
- Always: **Jenn Gabel, REALTOR® | OFC Realty**
- Never: SOLD — always use **CLOSED**
- Never post price without confirmation
- NJ hashtags for NJ listings only — never mix with Philly

## Website

- ImageRatioRecommended pixels Max useful
- P1 Banner2:1 1200 × 600 1080 × 540
- P2 Photo A 1:1 800 × 800 600 × 600
- P2 Photo B 2:1 800 × 400 600 × 300
- P2 Photo C 2:1 800 × 400 600 × 300

- Workflow from 4000px stock photo:

- Crop to correct ratio first
- Resize width to 1200px max (1000px is fine too)
- Export as JPG, quality 80%
- File size should land around 150–300KB per image — fast to load, fast to export
