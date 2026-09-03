# VELOOP Rewards – Banner UI

## 1. Project Overview

This project is a responsive React implementation of the promotional banner system for the **VELOOP Rewards** platform assignment. It showcases five reusable, feature-specific promotional banner components designed to promote core platform features such as user referrals, currency swapping, bonus rewards, task completions, and reward redemptions.

### Key Highlights
- **Reusable Banner Components**: Component-driven architecture using React 19 and CSS Modules.
- **Responsive Design**: Full parent-width adaptiveness with desktop heights maintained between 410–450px and clean vertical stacking on mobile devices.
- **Feature-Specific Visuals**: Tailored visual compositions for each banner to instantly communicate purpose.
- **Subtle Animations & Interactions**: Lightweight CSS/SVG keyframe animations, mouse parallax tracking, and interactive button states.
- **VELOOP Dark Visual Theme**: Built on a dark `#161827` visual foundation with purple, blue, and gold accents.

---

## 2. Banner List

### 1. Refer & Earn (`ReferEarnBanner`)
- **Purpose**: Promotes user referrals by explaining the 3-step referral mechanism (Invite Friend → They Earn → You Earn) and highlighting referral reward tokens (`VE`, `SPIN`, `GEM`, `XP`).

### 2. Swap Center (`SwapCenterBanner`)
- **Purpose**: Highlights platform currency conversion. It visualizes the bi-directional exchange relationship between `VE` (Reward Currency) and `SVE` (Supported Platform Currency) using a central rotating swap hub and animated SVG arc paths.

### 3. Bonus VEs (`BonusVEsBanner`)
- **Purpose**: Encourages engagement with campaign bonus opportunities. It displays a floating 3D-style bonus reward chest, floating VE coins, sparkles, and an animated progress fill meter to visually signal bonus value unlock.

### 4. Captcha Tasks (`CaptchaTasksBanner`)
- **Purpose**: Promotes eligible CAPTCHA-based micro-tasks. Features a simulated security verification panel with an animated mouse cursor, simulated character typing, an interactive button verification fill effect, and a reward unlock popup.

### 5. Exchange Center (`ExchangeCenterBanner`)
- **Purpose**: Represents reward redemption and payout. It communicates a one-way flow (`EARN VE → REDEEM → RECEIVE REWARD`) from a digital VE wallet across an animated path into generic redemption destination cards (`UPI`, `Gift Card`, `Reward`).

> **Key Architectural Distinction**:
> - **Swap Center**: Internal currency-to-currency conversion (`VE ⇄ SVE`).
> - **Exchange Center**: Redeeming earned `VE` tokens into supported payout/reward options (`VE Wallet → UPI / Gift Card / Reward`).

---

## 3. Features

- **Responsive Layouts**: Flexible two-column layout on desktop; auto-stacking on tablet and mobile viewports without horizontal overflow.
- **Component-Scoped Styling**: Modular CSS Modules prevent global style leaks and keep styles maintainable.
- **Interactive Mouse Parallax**: Mouse tracking (`onMouseMove`) on select banners for subtle depth effects.
- **Custom CSS & SVG Animations**: Keyframe-driven animations including rotating hubs, traveling flow particles, typing effects, and pulsing badges.
- **Accessibility & Motion Control**: Full `@media (prefers-reduced-motion: reduce)` support across all animated elements.
- **Clean Visual Hierarchy**: High-contrast typography, clear badge indicators, and interactive CTAs.

---

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI Component Library |
| **Vite 6** | Build Tool & Fast Development Server |
| **Bootstrap 5** | Base Grid & Utility Classes |
| **CSS Modules** | Component-Scoped Styling |
| **Lucide React** | Icon System |
| **Oxlint** | Linter for Code Quality |

---

## 5. Installation

```bash
# Clone the repository
git clone <Add GitHub Repository URL>

# Navigate into the project folder
cd assighement-banners

# Install dependencies
npm install
```

---

## 6. Development Commands

```bash
# Start the development server
npm run dev

# Build the production bundle
npm run build

# Preview the production build locally
npm run preview

# Run code linter
npm run lint
```

---

## 7. Folder Structure

```
src/
├── assets/
│   ├── images/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/
│   ├── BonusVEsBanner/
│   │   ├── BonusVEsBanner.jsx
│   │   └── BonusVEsBanner.module.css
│   ├── CaptchaTasksBanner/
│   │   ├── CaptchaTasksBanner.jsx
│   │   └── CaptchaTasksBanner.module.css
│   ├── ExchangeCenterBanner/
│   │   ├── ExchangeCenterBanner.jsx
│   │   └── ExchangeCenterBanner.module.css
│   ├── ReferEarnBanner/
│   │   ├── ReferEarnBanner.jsx
│   │   └── ReferEarnBanner.module.css
│   └── SwapCenterBanner/
│       ├── SwapCenterBanner.jsx
│       └── SwapCenterBanner.module.css
├── pages/
│   ├── RewardsPage.jsx
│   └── RewardsPage.module.css
├── styles/
│   └── globals.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## 8. Responsive Design

The project complies strictly with the assignment responsive constraints:
- **Full Width**: Spans 100% of the available parent container width.
- **Desktop Height**: Maintained between **410px – 450px** on viewports 900px and wider.
- **Mobile Adaptiveness**: Visual panels automatically stack below content with explicit vertical height allocation to prevent cropping or horizontal scrollbars.
- **Fluid Layout**: Scales gracefully across desktop, tablet, and mobile screen widths.

---

## 9. Animation & Interaction

| Banner | Implemented Animation / Interaction |
|---|---|
| **Refer & Earn** | Mouse position parallax tracking, step arrow highlights, CTA hover slide. |
| **Swap Center** | Mouse parallax, continuous rotating swap hub disc, animated bi-directional SVG gradient arc paths, floating coin hover. |
| **Bonus VEs** | Floating 3D-style reward box, pulsing bonus badge, floating VE coins, sparkling background stars, animated meter progress fill. |
| **Captcha Tasks** | Floating security panel, animated cursor path, simulated text typing, verify button fill transition, sliding reward pop-up. |
| **Exchange Center** | Traveling flow particle along dashed path, floating wallet node, option card hover elevation, pulsing "Reward Received" badge. |

---

## 10. Screenshots

Screenshots will be added after final UI capture.

---

## 11. Live Demo

Live Demo: <Add deployed project URL>

---

## 12. GitHub Repository

GitHub: <Add GitHub repository URL>

---

## 13. Author

**Akhilesh Mandawgane**  
Frontend Developer / B.Tech AI & ML Student  

---

## 14. Design Notes

- **Primary Background**: `#161827`
- **Theme**: Premium Dark Fintech UI
- **Accent Palette**: Deep Navy, Purple (`#7c6af7`), Blue (`#3b82f6`), Gold (`#f5c842`)
- **Visual Structure**: 2-Column Desktop layout (55% content / 45% visual)
- **Controls**: Glassmorphism surfaces, subtle borders, ambient glows, accessible motion fallbacks

---

## 15. Project Status

**Ready for Review**
